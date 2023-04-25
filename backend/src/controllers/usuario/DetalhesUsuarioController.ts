import { Request, Response } from "express";
import { ListarUsuarioService } from "../../services/usuario/DetalhesUsuarioService";

class ListarUsuarioController { 
    async handle(req: Request, response: Response) {

        const usuario_id = req.usuario_id;

        const listarUsuarioService = new ListarUsuarioService();

        const detalhesUsuario = await listarUsuarioService.execute(usuario_id);

        return response.json(detalhesUsuario)
    }
}

export { ListarUsuarioController }