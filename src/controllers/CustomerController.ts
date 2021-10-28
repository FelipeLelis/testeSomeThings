import {Request, Response} from 'express';
import knex from '../database/connection';
import {number, string, StringSchema} from "yup";

export default {
    async index(request: Request, response: Response): Promise<Response> {
        const {page = 1} = request.query;
        // consulta na tabela customer com join na tabela order
        const customers = await knex('customer')
            .join('order', 'order.customer_id', 'customer.id')
        // agrupando order por customer
        const customersGroup = (groupBy(customers, 'email'))
        const customerGroupValues = Object.values(customersGroup)

        let array: { total_spend_amount: number; email: StringSchema<string | undefined, object>; average_ticket_amount: number; }[] = []
        // unindo agrupamentos por customer
        function logArrayElements(element: any) {
            let arr = {
                total_spend_amount : 0,
                email : string(),
                average_ticket_amount: 0,
            }
            let count = 0
            element.map((a: any, b: any, i: any) => {
                count++
                arr.email = a.email
                arr.total_spend_amount += a.amount
                arr.average_ticket_amount = (arr.total_spend_amount / count);
            })
            count = 0
            array.push(arr)
        }
        customerGroupValues.forEach(logArrayElements);
        // retornando contagem para páginação e customers com total e média gasto
        const [{count}] = await knex('customer').count();
        return response.status(200).json({customers: array, total: Number(count)});
    },
};

function groupBy(objectArray: any[], property: string) {
    // reduzindo array
    return objectArray.reduce((acc, obj) => {
        // agrupando pea propriedade 'email'
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {})
}