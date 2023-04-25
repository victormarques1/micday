import { Request, Response } from "express";
import { DetalhesPacienteService } from "../../services/paciente/DetalhesPacienteService";

class DetalhesPacienteController {
    async handle(req: Request, response: Response) {

        const paciente_id = req.paciente_id;
        const usuario_id = req.usuario_id;

        const listarPacienteService = new DetalhesPacienteService();

        const detalhesPaciente = await listarPacienteService.execute(paciente_id, usuario_id);

        return response.json(detalhesPaciente)
    }
}

export { DetalhesPacienteController }