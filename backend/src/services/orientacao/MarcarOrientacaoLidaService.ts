import prismaClient from "../../prisma";

class MarcarOrientacaoLidaService {
  async execute({ orientacao_id, status }) {
    const orientacao = await prismaClient.orientacao.findFirst({
      where: {
        id: orientacao_id,
      },
    });

    if (!orientacao) {
      throw new Error("Orientação não encontrada.");
    }

    const novoStatus = await prismaClient.orientacao.update({
      where: {
        id: orientacao_id,
      },
      data: {
        status,
      },
    });

    return novoStatus;
  }
}

export { MarcarOrientacaoLidaService };
