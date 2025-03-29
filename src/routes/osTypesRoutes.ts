import { Router } from "express";
import { OrderServiceTypesController } from "../controllers/OrderServiceTypesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const osTypesRoutes: Router = Router();
const controller = new OrderServiceTypesController();

// Rotas
osTypesRoutes.use(ensureAuthenticate)
osTypesRoutes.get("/", controller.list);

export { osTypesRoutes };
