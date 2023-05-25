import prismaClient from "../../prisma";

class AtualizarStatusPacienteService {
    async execute({ paciente_id, status }) {
      try {
        const pacienteExiste = await prismaClient.paciente.findFirst({
          where: {
            id: paciente_id,
          },
        });
  
        if (!pacienteExiste) {
          throw new Error("Paciente inexistente.");
        }
  
        const pacienteAtualizado = await prismaClient.paciente.update({
          where: {
            id: pacienteExiste.id,
          },
          data: {
            status,
          },
        });
  
        return pacienteAtualizado;
      } catch (err) {
        console.log(err);
        throw new Error("Erro ao atualizar paciente.");
      }
    }
  }
  
  export { AtualizarStatusPacienteService };
