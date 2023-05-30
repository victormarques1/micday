import { Request, Response } from 'express';
import { TrocarSenhaService } from '../../services/usuario/TrocarSenhaService'

class TrocarSenhaController {
  async handle(req: Request, res: Response) {
    const usuario_id = req.usuario_id;
    const { senha_atual, nova_senha } = req.body;

    const trocarSenhaService = new TrocarSenhaService();

    try {
      const usuarioAtualizado = await trocarSenhaService.execute({
        usuario_id,
        senha_atual,
        nova_senha,
      });

      return res.json(usuarioAtualizado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { TrocarSenhaController };
