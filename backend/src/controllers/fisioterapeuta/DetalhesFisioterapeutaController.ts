import { Request, Response } from "express";
import { DetalhesFisioterapeutaService } from "../../services/fisioterapeuta/DetalhesFisioterapeutaService";

class DetalhesFisioterapeutaController {
    async handle(req: Request, response: Response) {

        const fisioterapeuta_id = req.fisioterapeuta_id;
        const usuario_id = req.usuario_id;

        const detalhesFisioterapeutaService = new DetalhesFisioterapeutaService();

        const detalhesFisioterapeuta = await detalhesFisioterapeutaService.execute(fisioterapeuta_id, usuario_id);

        return response.json(detalhesFisioterapeuta)
    }
}

export { DetalhesFisioterapeutaController }