import { Request, Response } from "express";
import { CriarOrientacaoService } from "../../services/orientacao/CriarOrientacaoService";

class CriarOrientacaoController {
    async handle(req: Request, res: Response){
        const { descricao, fisioterapeuta_id, paciente_id } = req.body

        const criarOrientacaoService = new CriarOrientacaoService();

        const orientacao = await criarOrientacaoService.execute({
            descricao, 
            fisioterapeuta_id,
            paciente_id
        });
        
        return res.json(orientacao);
    }
}

export { CriarOrientacaoController };