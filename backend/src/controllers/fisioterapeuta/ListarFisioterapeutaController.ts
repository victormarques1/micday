import { Request, Response } from "express";
import { ListarFisioterapeutaService } from '../../services/fisioterapeuta/ListarFisioterapeutaService'

class ListarFisioterapeutaController {
    async handle(req: Request, res: Response){
        const {usuario_id} = req.body;

        const listarFisioterapeutaService = new ListarFisioterapeutaService();

        const fisioterapeutas = await listarFisioterapeutaService.execute({usuario_id});

        return res.json(fisioterapeutas);
    }
}

export { ListarFisioterapeutaController }