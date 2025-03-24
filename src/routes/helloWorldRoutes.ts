import { Router , Request , Response} from "express";
import { HelloWorldController } from "../controllers/HelloWorldController";

const helloWorldRoutes: Router = Router();
const controller = new HelloWorldController();

// Rotas
helloWorldRoutes.get("/", controller.show);

export { helloWorldRoutes };