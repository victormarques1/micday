import { Request, Response } from "express";
import { AtualizarBebidaService } from "../../services/bebida/AtualizarBebidaService";

class AtualizarBebidaController {
    async handle(req: Request, res: Response){
        const { tipo, quantidade, data} = req.body;
        const bebida_id = req.params.bebida_id;
        const paciente_id = req.paciente_id;

        const atualizarBebidaService = new AtualizarBebidaService();

        const bebida = await atualizarBebidaService.execute({
            bebida_id,
            paciente_id,
            tipo,
            quantidade,
            data
        })

        return res.json(bebida);
    }
}

export { AtualizarBebidaController }