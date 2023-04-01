import { Request, Response } from "express";
import { DetailUsuarioService } from '../../services/usuario/DetailUsuarioService'

class DetailUsuarioController {
    async handle(req: Request, res: Response){

        const detailUsuarioService = new DetailUsuarioService();

        const usuario = await detailUsuarioService.execute();

        return res.json(usuario);
    }
}

export { DetailUsuarioController };