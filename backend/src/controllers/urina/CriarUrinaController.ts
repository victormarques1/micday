import { Response, Request } from "express";
import { CriarUrinaService } from "../../services/urina/CriarUrinaService"

class CriarUrinaController {
    async handle(req: Request, res: Response){
        const { quantidade, data, perda_urina, necessidade_urina } = req.body;
        const usuario_id = req.usuario_id;

        const criarUrinaService = new CriarUrinaService();
        
        const urina = await criarUrinaService.execute({
            quantidade,
            data,
            perda_urina,
            necessidade_urina,
            usuario_id
        });

        return res.json(urina);
    }
}

export { CriarUrinaController }