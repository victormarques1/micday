import { Response, Request } from "express";
import { CriarUrinaService } from "../../services/urina/CriarUrinaService"

class CriarUrinaController {
    async handle(req: Request, res: Response){
        const { quantidade, perda_urina, paciente_id } = req.body;

        const criarUrinaService = new CriarUrinaService();

        const urina = await criarUrinaService.execute({
            quantidade,
            perda_urina,
            paciente_id
        });

        return res.json(urina);
    }
}

export { CriarUrinaController }