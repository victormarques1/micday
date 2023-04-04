import { Request, Response } from "express";
import { AtualizarOrientacaoService } from '../../services/orientacao/AtualizarOrientacaoService'

class AtualizarOrientacaoController {
    async handle(req: Request, res: Response){
        const orientacao_id = req.query.orientacao_id as string;
        const fisioterapeuta_id = req.query.fisioterapeuta_id as string;
        const { descricao, paciente_id} = req.body;

        const atualizarOrientacaoService = new AtualizarOrientacaoService();

        const orientacao = await atualizarOrientacaoService.execute({
            orientacao_id, 
            fisioterapeuta_id, 
            descricao, 
            paciente_id
        })

        return res.json(orientacao);
    }
}

export { AtualizarOrientacaoController }