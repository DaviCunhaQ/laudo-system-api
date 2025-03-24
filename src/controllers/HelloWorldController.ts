import { Request , Response } from "express";

export class HelloWorldController {
    public async show(_req: Request, res: Response) {
        res.status(200).json({ message: "Hello World!" });
        return;
    }
}