import { Request, Response } from "express";
import { ListarUrinaService } from "../../services/urina/ListarUrinaService";

class ListarUrinaController {
    async handle(req: Request, res: Response) {
        const  paciente_id  = req.paciente_id;

        const listarUrinaService = new ListarUrinaService();

        const urinas = await listarUrinaService.execute({
            paciente_id
        })

        return res.json(urinas);
    }
}

export { ListarUrinaController }