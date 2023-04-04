import { Request, Response } from "express";
import { ListarBebidaService } from "../../services/bebida/ListarBebidaService";

class ListarBebidaController {
    async handle(req: Request, res: Response){
        const { paciente_id } = req.body;

        const listarBebidaService = new ListarBebidaService();

        const bebidas = await listarBebidaService.execute({
            paciente_id
        })

        return res.json(bebidas);
    }
}

export {ListarBebidaController};