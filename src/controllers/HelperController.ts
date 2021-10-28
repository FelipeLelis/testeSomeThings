// Arquivo de importação de dados json oferecidos pelo teste
import {Request, Response} from 'express';
import knex from '../database/connection';
import dataJson from "../database/seeds/data.json";
import customer from '../models/Customer'

export default {
    async index(request: Request, response: Response): Promise<Response> {
        async function logArrayElements(element: { customer: { name: any; email: any; }; amount: any; created_at: any; }, index: any, array: any) {
            let dataUser = {
                name : element.customer.name,
                email : element.customer.email
            }
            try {
                await knex('customer').insert(dataUser, 'id')
                    .then(async res => {
                        let dataOrder = {
                            amount: element.amount,
                            created_at: element.created_at,
                            customer_id: res[0]
                        }
                        await knex('order').insert(dataOrder)
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }catch (error){
                console.log(error)
            }
        }
        dataJson.orders.forEach(logArrayElements);
        return response
            .status(201)
            .json({message: 'All data imported'});
    },
};

