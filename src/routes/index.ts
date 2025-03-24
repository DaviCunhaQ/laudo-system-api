import { Router , Request , Response} from "express";
import { helloWorldRoutes } from "./helloWorldRoutes";
import { usersRoutes } from "./usersRoutes";

const routes: Router = Router();

// Rotas
routes.use('/' , helloWorldRoutes)
routes.use('/users' , usersRoutes)

export { routes };