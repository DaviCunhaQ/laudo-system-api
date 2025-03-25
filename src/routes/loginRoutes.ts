import { Router, Request, Response } from "express";
import { LoginController } from "../controllers/LoginController";

const loginRoutes: Router = Router();
const controller = new LoginController();

// Rotas
loginRoutes.post("/", controller.login);

export { loginRoutes };
