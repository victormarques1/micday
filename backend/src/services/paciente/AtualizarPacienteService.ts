import prismaClient from "../../prisma";

interface PacienteRequest {
  paciente_id: string;
  usuario_id: string;
  altura: string;
  peso: string;
  idade: number;
  status: boolean;
}

class AtualizarPacienteService {
  async execute({ paciente_id, usuario_id, altura, peso, idade, status }) {
    try {
      const pacienteExiste = await prismaClient.paciente.findFirst({
        where: {
          id: paciente_id,
          usuario_id,
        },
      });

      if (!pacienteExiste) {
        throw new Error("Usuário inexistente.");
      }

      const pacienteAtualizado = await prismaClient.paciente.update({
        where: {
          id: pacienteExiste.id,
        },
        data: {
          altura,
          peso,
          idade,
        },
        select: {
          id: true,
          altura: true,
          peso: true,
          etnia: true,
          idade: true,
        },
      });

      return pacienteAtualizado;
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao atualizar usuário.");
    }
  }
}

export { AtualizarPacienteService };
