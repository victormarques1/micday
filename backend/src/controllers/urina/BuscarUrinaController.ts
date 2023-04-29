import { Request, Response } from "express";
import { BuscarUrinaService } from "../../services/urina/BuscarUrinaService";

class BuscarUrinaController {
    async handle(req: Request, res: Response){
        const urina_id = req.query.urina_id as string;

        const buscarUrina = new BuscarUrinaService();

        const urina = await buscarUrina.execute({
            urina_id,
        })

        return res.json(urina);
    }
}

export { BuscarUrinaController }