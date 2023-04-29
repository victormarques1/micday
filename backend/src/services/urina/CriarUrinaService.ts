import prismaClient from '../../prisma'

interface UrinaRequest {
    quantidade: number;
    perda_urina: boolean;
    necessidade_urina: boolean;
    usuario_id: string;
    data: Date;
}

class CriarUrinaService {
    async execute({ quantidade, data, perda_urina, necessidade_urina, usuario_id }: UrinaRequest) {
      try {
        const paciente = await prismaClient.paciente.findFirst({
          where: {
            usuario_id
          },
        });
  
        if (!paciente) {
          throw new Error("Paciente não encontrado.");
        }
  
        const urina = await prismaClient.urina.create({
          data: {
            quantidade,
            data,
            perda_urina,
            necessidade_urina,
            paciente: {
              connect: {
                id: paciente.id,
              },
            },
          },
        });
  
        return urina;
      } catch (error) {
        console.error(error);
        throw new Error("Não foi possível criar o registro de urina.");
      }
    }
  }
export { CriarUrinaService }