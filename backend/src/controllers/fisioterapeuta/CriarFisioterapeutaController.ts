import { Request, Response } from "express";
import { CriarFisioterapeutaService } from "../../services/fisioterapeuta/CriarFisioterapeutaService"

class CriarFisioterapeutaController {
    async handle(req: Request, res: Response){
        const { usuario_id } = req.body;

        const criarFisioterapeutaService = new CriarFisioterapeutaService();

        const fisioterapeuta = await criarFisioterapeutaService.execute({usuario_id});

        return res.json(fisioterapeuta);
    }
}

export { CriarFisioterapeutaController };