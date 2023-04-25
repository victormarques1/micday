import { Request, Response } from "express";
import { AtualizarFisioterapeutaService } from "../../services/fisioterapeuta/AtualizarFisioterapeutaService";

class AtualizarFisioterapeutaController {
  async handle(req: Request, res: Response) {
    const { atuacao, crefito } = req.body;
    const fisioterapeuta_id = req.fisioterapeuta_id;
    const usuario_id = req.usuario_id;

    const atualizarFisioterapeuta = new AtualizarFisioterapeutaService();

    const fisioterapeuta = await atualizarFisioterapeuta.execute({
      fisioterapeuta_id,
      usuario_id,
      atuacao,
      crefito,
    });

    return res.json(fisioterapeuta);
  }
}

export { AtualizarFisioterapeutaController };
