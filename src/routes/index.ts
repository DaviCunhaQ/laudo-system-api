import { Router , Request , Response} from "express";
import { helloWorldRoutes } from "./helloWorldRoutes";
import { usersRoutes } from "./usersRoutes";
import { orderServiceRoutes } from "./orderServiceRoutes";

const routes: Router = Router();

// Rotas
routes.use('/' , helloWorldRoutes)
routes.use('/users' , usersRoutes)
routes.use('/order-service', orderServiceRoutes)

export { routes };