import { Request, Response } from "express";
import { MeusPacientesService } from '../../services/fisioterapeuta/MeusPacientesService'

class MeusPacientesController {
    async handle(req: Request, response: Response){

        const usuario_id = req.usuario_id;

        const meusPacientesService = new MeusPacientesService();

        const meusPacientes = await meusPacientesService.execute(usuario_id);

        return response.json(meusPacientes)

    }
}

export { MeusPacientesController }