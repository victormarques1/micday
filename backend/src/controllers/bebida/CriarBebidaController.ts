import { Request, Response } from "express";
import { CriarBebidaService } from '../../services/bebida/CriarBebidaService'

class CriarBebidaController {
    async handle(req: Request, res: Response){
        const { quantidade, data, tipo } = req.body;
        const usuario_id = req.usuario_id;

        const criarBebidaService = new CriarBebidaService();

        const bebida = await criarBebidaService.execute({
            tipo,
            quantidade,
            data,
            usuario_id
        })

        return res.json(bebida);
    }
}

export { CriarBebidaController }