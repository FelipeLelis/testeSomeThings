// Arquivo de rotas.
import { Router } from 'express';
import OrderController from "./controllers/OrderController";
import HelperController from "./controllers/HelperController"
import CustomerController from "./controllers/CustomerController";
import dataJson from './database/seeds/data.json'
const routes = Router();

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.index);
routes.get('/customers', CustomerController.index);

// usa essa rota para importar os dados do json para o banco de dados.
routes.get('/savejsondata', HelperController.index)

export default routes;
