import { Request, Response } from "express";
import { DeletarBebidaService } from '../../services/bebida/DeletarBebidaService'

class DeletarBebidaController{
    async handle(req: Request, res: Response){
        const paciente_id = req.paciente_id;
        const bebida_id = req.query.bebida_id as string;

        const deletaBebidaService = new DeletarBebidaService();

        const bebida = await deletaBebidaService.execute({
            paciente_id,
            bebida_id,
        })

        return res.json(bebida)
    }
}

export { DeletarBebidaController }