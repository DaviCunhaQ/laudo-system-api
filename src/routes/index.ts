import { Router , Request , Response} from "express";
import { helloWorldRoutes } from "./helloWorldRoutes";
import { usersRoutes } from "./usersRoutes";
import { orderServiceRoutes } from "./orderServiceRoutes";
import { loginRoutes } from "./loginRoutes";
import { citiesRoutes } from "./citiesRoutes";
import { osTypesRoutes } from "./osTypesRoutes";
import { draftRoutes } from "./draftRoutes";

const routes: Router = Router();

// Rotas
routes.use('/' , helloWorldRoutes)
routes.use('/login' , loginRoutes)
routes.use('/users' , usersRoutes)
routes.use('/service-order', orderServiceRoutes)
routes.use('/cities', citiesRoutes)
routes.use('/service-order-types', osTypesRoutes)
routes.use('/drafts', draftRoutes)


export { routes };