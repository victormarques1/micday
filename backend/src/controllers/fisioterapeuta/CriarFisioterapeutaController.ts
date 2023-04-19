import { Request, Response } from "express";
import { CriarFisioterapeutaService } from "../../services/fisioterapeuta/CriarFisioterapeutaService"

class CriarFisioterapeutaController {
    async handle(req: Request, res: Response){
        const { usuario_id, crefito, atuacao } = req.body;

        const criarFisioterapeutaService = new CriarFisioterapeutaService();

        const fisioterapeuta = await criarFisioterapeutaService.execute({usuario_id, crefito, atuacao});

        return res.json(fisioterapeuta);
    }
}

export { CriarFisioterapeutaController };