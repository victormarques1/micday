import { Request, Response } from "express";
import { AtualizarUrinaService } from "../../services/urina/AtualizarUrinaService";

class AtualizarUrinaController {
    async handle(req: Request, res: Response){
        const { quantidade, perda_urina, necessidade_urina, data } = req.body;
        const urina_id = req.params.urina_id;
        const paciente_id = req.paciente_id;

        const atualizarUrinaService = new AtualizarUrinaService();

        const urina = await atualizarUrinaService.execute({
            urina_id,
            paciente_id,
            quantidade,
            perda_urina,
            necessidade_urina,
            data
        })

        return res.json(urina);
    }
}

export { AtualizarUrinaController }