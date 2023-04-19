import { Request, Response } from "express";
import { CriarTipoIncontinenciaService } from "../../services/incontinencia/CriarTipoIncontinenciaService";

class CriarTipoIncotinenciaController {
    async handle(req: Request, res: Response){
        const {nome} = req.body;

        const criarTipoIncontinenciaService = new CriarTipoIncontinenciaService();

        const criarTipoIncontinencia = await criarTipoIncontinenciaService.execute({nome});

        return res.json(criarTipoIncontinencia);
    }   
}

export { CriarTipoIncotinenciaController };