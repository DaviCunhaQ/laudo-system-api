import { Router, Request, Response } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes: Router = Router();
const controller = new UsersController();

// Rotas Autenticadas
usersRoutes.use(ensureAuthenticate)
usersRoutes.get("/", controller.list);
usersRoutes.get("/:id", controller.show);
usersRoutes.post("/", controller.create);
usersRoutes.put("/:id", controller.update);
usersRoutes.delete("/:id", controller.delete);

export { usersRoutes };
