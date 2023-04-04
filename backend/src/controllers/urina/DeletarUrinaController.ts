import { Request, Response } from "express";
import { DeletarUrinaService } from "../../services/urina/DeletarUrinaService";

class DeletarUrinaController{
    async handle(req: Request, res: Response){
        const paciente_id = req.paciente_id;
        const urina_id = req.query.urina_id as string;

        const deletaUrinaService = new DeletarUrinaService();

        const urina = await deletaUrinaService.execute({
            paciente_id,
            urina_id,
        })

        return res.json(urina)
    }
}

export { DeletarUrinaController }