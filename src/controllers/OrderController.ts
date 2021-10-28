// Nosso arquivo de ordens
import {Request, Response} from 'express';
import knex from '../database/connection';
import * as Yup from "yup";
import {string} from "yup";

export default {

    async index(request: Request, response: Response): Promise<Response> {
        // recebendo em qual página estamos
        const {page = 1} = request.query;
        // simulando queri com range de datas
        let start_date = "2021-10-10"
        let end_date =   "2021-10-19"
        // formatando as datas
        let dateFormated = formatDate(start_date, end_date)
        // consulta na tabela order passando como where o range de datas
        const users = await knex('order')
            .whereBetween('created_at', [dateFormated[0], dateFormated[1]])
            .limit(10)
            .offset((Number(page) - 1) * 10);
        const [{count}] = await knex('order').count();
        return response.status(200).json({data: users, total: Number(count)});
    },

    async create(request: Request, response: Response): Promise<Response> {
        // recebendo json para criação de customer e order
        const {orders} = request.body;
        // schema de validação para garantir integridade dos dados
        const schemaDataUser = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
        });
        const schemaDataOrder = Yup.object().shape({
            amount: Yup.number().required(),
            created_at: Yup.string().required(),
        });
        // mapeando array para fazer inserção no banco de dados
        orders.map(async (data: {
            created_at: string;
            amount: string;
            customer: any;
        }) => {
            let dataCustomer = {
                name: data.customer.name,
                email: data.customer.email
            }
            let dataOrder = {
                amount: data.amount,
                created_at: data.created_at,
                customer_id: string()
            }
            // validando dados
            await schemaDataUser.validate(dataCustomer, {
                abortEarly: false,
            });
            await schemaDataOrder.validate(dataOrder, {
                abortEarly: false,
            });
            // inserindo na tabela customer, pegando o id de retorno gerado e inserindo junto com os dados na tabela order
            await knex('customer').insert(dataCustomer, 'id')
                .then(async res => {
                    dataOrder.customer_id = res[0]
                    await knex('order').insert(dataOrder)
                })
                .catch(error => {
                    console.log(error)
                })
        })
        return response
            .status(200)
            .json({message: "Dados criados com sucesso"});
    },
};

function formatDate(startDate: string, endDate: string) {
    // formatando data para
    let temp = [new Date(startDate), new Date(endDate)]
    temp[0].toLocaleDateString('pt-Br', {
        timeZone: "America/Sao_Paulo"
    })
    temp[1].toLocaleDateString('pt-Br', {
        timeZone: "America/Sao_Paulo"
    })
    return temp;
}
