import { Request, Response } from "express";
import { AtualizarPacienteService } from "../../services/paciente/AtualizarPacienteService";

class AtualizarPacienteController {
    async handle(req: Request, res: Response){
        const { altura, peso, idade, tipo_incontinencia, etnia } = req.body;
        const paciente_id = req.paciente_id;
        const usuario_id = req.usuario_id;

        const atualizarPaciente = new AtualizarPacienteService();

        const paciente = await atualizarPaciente.execute({
            paciente_id,
            usuario_id,
            altura,
            peso,
            idade,
            etnia,
            tipo_incontinencia,
        })

        return res.json(paciente);
    }
}

export { AtualizarPacienteController }