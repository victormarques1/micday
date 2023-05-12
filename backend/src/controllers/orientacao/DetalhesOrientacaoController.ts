import { Request, Response } from "express";
import { DetalhesOrientacaoService } from "../../services/orientacao/DetalhesOrientacaoService";

class DetalhesOrientacaoController {
  async handle(req: Request, response: Response) {
    const usuario_id = req.usuario_id;

    const listarOrientacaoService = new DetalhesOrientacaoService();

    const detalhesOrientacao = await listarOrientacaoService.execute(
      usuario_id
    );

    return response.json(detalhesOrientacao);
  }
}

export { DetalhesOrientacaoController };
