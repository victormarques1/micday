import { Request, Response } from "express";
import { BuscarPacienteService } from "../../services/fisioterapeuta/BuscarPacienteService";

class BuscarPacienteController {
    async handle(req: Request, res: Response){
        const paciente_id = req.query.paciente_id as string;

        const buscarPaciente = new BuscarPacienteService();

        const paciente = await buscarPaciente.execute({
            paciente_id,
        })

        return res.json(paciente);
    }
}

export { BuscarPacienteController }