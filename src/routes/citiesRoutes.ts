import { Router } from "express";
import { CitiesController } from "../controllers/CitiesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const citiesRoutes: Router = Router();
const controller = new CitiesController();

// Rotas
citiesRoutes.use(ensureAuthenticate)
citiesRoutes.get("/", controller.list);

export { citiesRoutes };
