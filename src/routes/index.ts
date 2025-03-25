import { Router , Request , Response} from "express";
import { helloWorldRoutes } from "./helloWorldRoutes";
import { usersRoutes } from "./usersRoutes";
import { orderServiceRoutes } from "./orderServiceRoutes";
import { loginRoutes } from "./loginRoutes";

const routes: Router = Router();

// Rotas
routes.use('/' , helloWorldRoutes)
routes.use('/login' , loginRoutes)
routes.use('/users' , usersRoutes)
routes.use('/order-service', orderServiceRoutes)

export { routes };