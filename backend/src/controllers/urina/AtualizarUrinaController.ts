import { Request, Response } from "express";
import { AtualizarUrinaService } from "../../services/urina/AtualizarUrinaService";

class AtualizarUrinaController {
    async handle(req: Request, res: Response){
        const { quantidade, perda_urina } = req.body;
        const urina_id = req.query.urina_id as string;
        const paciente_id = req.query.paciente_id as string;

        const atualizarUrinaService = new AtualizarUrinaService();

        const urina = await atualizarUrinaService.execute({
            urina_id,
            paciente_id,
            quantidade,
            perda_urina
        })

        return res.json(urina);
    }
}

export { AtualizarUrinaController }