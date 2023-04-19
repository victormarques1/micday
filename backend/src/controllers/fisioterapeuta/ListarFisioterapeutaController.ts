import { Request, Response } from "express";
import { ListarFisioterapeutaService } from '../../services/fisioterapeuta/ListarFisioterapeutaService'

class ListarFisioterapeutaController {
    async handle(req: Request, res: Response){

        const listarFisioterapeutaService = new ListarFisioterapeutaService();

        const fisioterapeutas = await listarFisioterapeutaService.execute();

        return res.json(fisioterapeutas);
    }
}

export { ListarFisioterapeutaController }