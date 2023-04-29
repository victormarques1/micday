import prismaClient from "../../prisma";

interface BebidaRequest {
  quantidade: number;
  tipo: string;
  data: Date;
  usuario_id: string;
}

class CriarBebidaService {
  async execute({ quantidade, data, tipo, usuario_id }: BebidaRequest) {
    try {
      const paciente = await prismaClient.paciente.findFirst({
        where: {
          usuario_id,
        },
      });

      if (!paciente) {
        throw new Error("Paciente não encontrado.");
      }

      const bebida = await prismaClient.bebida.create({
        data: {
          quantidade,
          data,
          tipo,
          paciente: {
            connect: {
              id: paciente.id,
            },
          },
        },
      });

      return bebida;

    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível criar o registro de bebida.");
    }
  }
}
export { CriarBebidaService };
