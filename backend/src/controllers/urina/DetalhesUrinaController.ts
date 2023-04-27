import { Request, Response } from "express";
import { DetalhesUrinaService } from "../../services/urina/DetalhesUrinaService";

class DetalhesUrinaController {
    async handle(req: Request, response: Response) {

        const usuario_id = req.usuario_id;
        // const paciente_id = req.paciente_id;

        const listarUrinaService = new DetalhesUrinaService();

        const detalhesUrina = await listarUrinaService.execute(usuario_id);

        return response.json(detalhesUrina)
    }
}

export { DetalhesUrinaController }