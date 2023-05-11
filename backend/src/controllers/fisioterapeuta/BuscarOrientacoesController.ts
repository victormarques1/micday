import { Request, Response } from "express";
import { BuscarOrientacoesService } from "../../services/fisioterapeuta/BuscarOrientacoesService";

class BuscarOrientacoesController {
    async handle(req: Request, res: Response){
        const paciente_id = req.query.paciente_id as string;

        const buscarOrientacoes = new BuscarOrientacoesService();

        const orientacoes = await buscarOrientacoes.execute({
            paciente_id,
        })

        return res.json(orientacoes);
    }
}

export { BuscarOrientacoesController }