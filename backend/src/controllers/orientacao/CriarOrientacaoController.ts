import { Request, Response } from "express";
import { CriarOrientacaoService } from "../../services/orientacao/CriarOrientacaoService";

class CriarOrientacaoController {
    async handle(req: Request, res: Response){
        const { descricao, data, paciente_id } = req.body
        const usuario_id = req.usuario_id;

        const criarOrientacaoService = new CriarOrientacaoService();

        const orientacao = await criarOrientacaoService.execute({
            descricao, 
            usuario_id,
            paciente_id, 
            data
        });
        
        return res.json(orientacao);
    }
}

export { CriarOrientacaoController };