import { Response, Request } from "express";
import { CriarUsuarioService } from '../../services/usuario/CriarUsuarioService'

class CriarUsuarioController {
    async handle(req: Request, res: Response){
        const { nome, email, senha, cpf, tipo } = req.body;

        const criarUsuarioService = new CriarUsuarioService();

        const usuario = await criarUsuarioService.execute({
            nome,
            email,
            senha, 
            cpf,
            tipo
        });

        return res.json(usuario);
    }
}

export { CriarUsuarioController }