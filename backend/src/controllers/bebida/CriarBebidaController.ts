import { Request, Response } from "express";
import { CriarBebidaService } from '../../services/bebida/CriarBebidaService'

class CriarBebidaController {
    async handle(req: Request, res: Response){
        const { tipo, quantidade, paciente_id } = req.body;

        const criarBebidaService = new CriarBebidaService();

        const bebida = await criarBebidaService.execute({
            tipo,
            quantidade,
            paciente_id
        })

        return res.json(bebida);
    }
}

export { CriarBebidaController }