import { Request, Response } from "express";
import { BuscarRegistrosParamsService } from "../../services/fisioterapeuta/BuscarRegistrosParamsService";

class BuscarRegistrosParamsController {
    async handle(req: Request, res: Response){
        const paciente_id = req.params.paciente_id as string;

        const buscarRegistros = new BuscarRegistrosParamsService();

        const registros = await buscarRegistros.execute({
            paciente_id,
        })

        return res.json(registros);
    }
}

export { BuscarRegistrosParamsController }