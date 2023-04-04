import { Request, Response } from "express";
import { DeletarOrientacaoService } from '../../services/orientacao/DeletarOrientacaoService'

class DeletarOrientacaoController{
    async handle(req: Request, res: Response){
        const paciente_id = req.paciente_id;
        const orientacao_id = req.query.orientacao_id as string;

        const deletaOrientacaoService = new DeletarOrientacaoService();

        const orientacao = await deletaOrientacaoService.execute({
            paciente_id,
            orientacao_id,
        })

        return res.json(orientacao)
    }
}

export { DeletarOrientacaoController }