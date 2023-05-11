import { Request, Response } from "express";
import { AtualizarOrientacaoService } from '../../services/orientacao/AtualizarOrientacaoService'

class AtualizarOrientacaoController {
    async handle(req: Request, res: Response){
        const orientacao_id = req.params.orientacao_id;
        const { descricao, paciente_id, data} = req.body;

        const atualizarOrientacaoService = new AtualizarOrientacaoService();

        const orientacao = await atualizarOrientacaoService.execute({
            orientacao_id, 
            descricao, 
            paciente_id, 
            data
        })

        return res.json(orientacao);
    }
}

export { AtualizarOrientacaoController }