import prismaClient from "../../prisma";

interface OrientacaoRequest {
  descricao: string;
  paciente_id: string;
  data: Date;
  usuario_id: string;
}

class CriarOrientacaoService {
  async execute({ descricao, paciente_id, data, usuario_id }: OrientacaoRequest) {
      
    try{
        const fisioterapeuta = await prismaClient.fisioterapeuta.findFirst({
            where: {
              usuario_id,
            },
          });

          if (!fisioterapeuta) {
            throw new Error("Fisioterapeuta não encontrado.");
          }

          const orientacao = await prismaClient.orientacao.create({
            data: {
              descricao,
              data,
              fisioterapeuta:{
                  connect:{
                      id: fisioterapeuta.id
                },
              },
              paciente: {
                connect: { id: paciente_id }
              }
            },
          });
        return orientacao;

    } catch(err){
        console.error(err);
        throw new Error("Não foi possível criar a orientação.");
    }
  }
}

export { CriarOrientacaoService };
