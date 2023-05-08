import prismaClient from "../../prisma";

interface PacienteRequest {
  paciente_id: string;
}

class BuscarRegistrosService {
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
        urinas: {
          select: {
            id: true,
            data: true,
            quantidade: true,
            perda_urina: true,
            necessidade_urina: true,
          },
        },
        bebidas: {
          select: {
            id: true,
            data: true,
            quantidade: true,
            tipo: true,
          },
        },
      },
    });

    return paciente;
  }
}

export { BuscarRegistrosService };
