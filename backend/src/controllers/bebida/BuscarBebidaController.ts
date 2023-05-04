import { Request, Response } from "express";
import { BuscarBebidaService } from "../../services/bebida/BuscarBebidaService";

class BuscarBebidaController {
  async handle(req: Request, res: Response) {
    const bebida_id = req.query.bebida_id as string;

    const buscarBebida = new BuscarBebidaService();

    const bebida = await buscarBebida.execute({
      bebida_id,
    });

    return res.json(bebida);
  }
}

export { BuscarBebidaController };
