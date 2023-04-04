import { Request, Response } from "express";
import { AtualizarBebidaService } from "../../services/bebida/AtualizarBebidaService";

class AtualizarBebidaController {
    async handle(req: Request, res: Response){
        const { tipo, quantidade} = req.body;
        const bebida_id = req.query.bebida_id as string;
        const paciente_id = req.query.paciente_id as string;

        const atualizarBebidaService = new AtualizarBebidaService();

        const bebida = await atualizarBebidaService.execute({
            bebida_id,
            paciente_id,
            tipo,
            quantidade
        })

        return res.json(bebida);
    }
}

export { AtualizarBebidaController }