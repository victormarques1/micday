import prismaClient from "../../prisma";

interface PacienteRequest {
  paciente_id: string;
}

class BuscarOrientacoesService {
  async execute({ paciente_id }: PacienteRequest) {
    const paciente = await prismaClient.paciente.findFirst({
      where: {
        id: paciente_id,
      },
      include: {
        usuario: {
          select: {
            nome: true,
          },
        },
        orientacoes: {
          select: {
            id: true,
            paciente_id: true,
            data: true,
            descricao: true,
          },
        },
      },
    });

    return paciente;
  }
}

export { BuscarOrientacoesService };
