import { Request, Response } from "express";
import { ListarTipoIncontinenciaService } from "../../services/incontinencia/ListarTipoIncontinenciaService";

class ListarTipoIncontinenciaController {
    async handle(req: Request, res: Response){

        const listarTiposService = new ListarTipoIncontinenciaService();

        const tipos = await listarTiposService.execute();

        return res.json(tipos);
    }
}

export { ListarTipoIncontinenciaController }