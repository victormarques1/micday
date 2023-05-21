import { Request, Response } from "express";
import { AuthUsuarioService } from '../../services/usuario/AuthUsuarioService'

class AuthUsuarioController {
    async handle(req: Request, res: Response){
        const {emailOuCpf, senha} = req.body;

        const authUsuarioService = new AuthUsuarioService();

        const auth = await authUsuarioService.execute({
            emailOuCpf,
            senha
        });

        return res.json(auth);
    }
}

export { AuthUsuarioController }