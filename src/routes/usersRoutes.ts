import { Router, Request, Response } from "express";
import { UsersController } from "../controllers/UsersController";

const usersRoutes: Router = Router();
const controller = new UsersController();

// Rotas
usersRoutes.get("/", controller.list);
usersRoutes.get("/:id", controller.show);
usersRoutes.post("/", controller.create);
usersRoutes.put("/:id", controller.update);
usersRoutes.delete("/:id", controller.delete);

export { usersRoutes };
