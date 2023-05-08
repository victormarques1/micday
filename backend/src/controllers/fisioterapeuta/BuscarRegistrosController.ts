import { Request, Response } from "express";
import { BuscarRegistrosService } from "../../services/fisioterapeuta/BuscarRegistrosService";

class BuscarRegistrosController {
    async handle(req: Request, res: Response){
        const paciente_id = req.query.paciente_id as string;

        const buscarRegistros = new BuscarRegistrosService();

        const registros = await buscarRegistros.execute({
            paciente_id,
        })

        return res.json(registros);
    }
}

export { BuscarRegistrosController }