import { Router } from "express";
import { OrderServiceController } from "../controllers/OrderServiceController";

const orderServiceRoutes: Router = Router();
const controller = new OrderServiceController();

// Rotas
orderServiceRoutes.get("/", controller.list);
orderServiceRoutes.get("/:id", controller.show);
orderServiceRoutes.post("/", controller.create);
orderServiceRoutes.put("/:id", controller.update);
orderServiceRoutes.delete("/:id", controller.delete);

export { orderServiceRoutes };
