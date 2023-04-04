import { Request, Response } from "express";
import { ListarPacienteService } from "../../services/paciente/ListarPacienteService";

class ListarPacienteController {
    async handle(req: Request, res: Response){
        const {usuario_id} = req.body;

        const listarPacienteService = new ListarPacienteService();

        const pacientes = await listarPacienteService.execute({usuario_id});

        return res.json(pacientes);
    }
}

export { ListarPacienteController }