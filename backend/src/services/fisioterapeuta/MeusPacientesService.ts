import prismaClient from "../../prisma";

class MeusPacientesService {
  async execute(usuario_id: string) {
    const paciente = await prismaClient.paciente.findMany({
      where: {
        fisioterapeuta: {
          usuario_id: usuario_id,
        },
      },
      include: {
        usuario: {
          select: {
            email: true,
            nome: true,
            cpf: true,
            telefone: true,
          },
        },
        urinas: {
          select: {
            data: true,
            quantidade: true,
            perda_urina: true,
            necessidade_urina: true,
          },
        },
        bebidas: {
          select: {
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

export { MeusPacientesService };
