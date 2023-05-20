import { Request, Response } from "express";
import { MarcarOrientacaoLidaService } from "../../services/orientacao/MarcarOrientacaoLidaService";

class MarcarOrientacaoLidaController {
  async handle(req: Request, res: Response) {
    const orientacaoId = req.params.orientacao_id;
    const { status } = req.body;

    const marcarOrientacaoLidaService = new MarcarOrientacaoLidaService();

    try {
      const novoStatus = await marcarOrientacaoLidaService.execute({
        orientacao_id: orientacaoId,
        status,
      });

      return res.json(novoStatus);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { MarcarOrientacaoLidaController };
