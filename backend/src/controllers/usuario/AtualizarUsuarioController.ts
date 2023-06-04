import { Request, Response } from "express";
import { AtualizarUsuarioService } from "../../services/usuario/AtualizarUsuarioService";

class AtualizarUsuarioController {
  async handle(req: Request, res: Response) {
    const { nome, cpf, telefone } = req.body;
    const usuario_id = req.usuario_id;

    const atualizarUsuario = new AtualizarUsuarioService();

    const usuario = await atualizarUsuario.execute({
      usuario_id,
      nome,
      cpf,
      telefone,
    });

    return res.json(usuario);
  }
}

export { AtualizarUsuarioController };
