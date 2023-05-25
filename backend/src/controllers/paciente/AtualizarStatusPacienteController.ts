import { Response, Request } from "express";
import { AtualizarStatusPacienteService } from "../../services/paciente/AtualizarStatusPacienteService";

class AtualizarStatusPacienteController {
  async handle(request: Request, response: Response) {
    const { status } = request.body;
    const { paciente_id } = request.params;

    const atualizarStatusPacienteService = new AtualizarStatusPacienteService();

    try {
      const pacienteAtualizado = await atualizarStatusPacienteService.execute({
        paciente_id,
        status,
      });

      return response.json(pacienteAtualizado);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}


export { AtualizarStatusPacienteController };
