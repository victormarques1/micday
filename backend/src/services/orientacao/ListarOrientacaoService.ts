import prismaClient from "../../prisma";

class ListarOrientacaoService {
  async execute({ usuario_id }) {
    const listaOrientacoes = await prismaClient.orientacao.findMany({
      where: {
        fisioterapeuta: {
          usuario_id: usuario_id,
        },
      },
      include: {
        paciente: {
          include: {
            usuario: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    return listaOrientacoes;
  }
}

export { ListarOrientacaoService };
