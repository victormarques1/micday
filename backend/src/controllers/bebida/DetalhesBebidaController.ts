import { Request, Response } from "express";
import { DetalhesBebidaService } from '../../services/bebida/DetalhesBebidaService'

class DetalhesBebidaController {
    async handle(req: Request, response: Response) {

        const usuario_id = req.usuario_id;

        const listarBebidaService = new DetalhesBebidaService();

        const detalhesBebida = await listarBebidaService.execute(usuario_id);

        return response.json(detalhesBebida)
    }
}

export { DetalhesBebidaController }