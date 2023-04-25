import prismaClient from "../../prisma";

interface FisioterapeutaRequest {
  fisioterapeuta_id: string;
  usuario_id: string;
  atuacao: string;
  crefito: string;
}

class AtualizarFisioterapeutaService {
  async execute({ fisioterapeuta_id, usuario_id, atuacao, crefito }) {
    try {
      const fisioterapeutaExiste = await prismaClient.fisioterapeuta.findFirst({
        where: {
          id: fisioterapeuta_id,
          usuario_id,
        },
      });

      if (!fisioterapeutaExiste) {
        throw new Error("Fisioterapeuta não existe.");
      }

      const fisioterapeutaAtualizado = await prismaClient.fisioterapeuta.update(
        {
          where: {
            id: fisioterapeutaExiste.id,
          },
          data: {
            atuacao,
            crefito,
          },
          select: {
            id: true,
            atuacao: true,
            crefito: true,
          },
        }
      );

      return fisioterapeutaAtualizado;
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao atualizar fisioterapeuta.");
    }
  }
}

export { AtualizarFisioterapeutaService };
