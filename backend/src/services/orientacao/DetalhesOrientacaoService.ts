import prismaClient from "../../prisma";

class DetalhesOrientacaoService {
  async execute(usuario_id: string) {
    const orientacao = await prismaClient.orientacao.findMany({
      where: {
        paciente: {
          usuario_id: usuario_id,
        },
      },
      include:{
        fisioterapeuta:{
            include:{
                 usuario:{
                     select:{ 
                         nome: true,
                     }
                 }
            }
         },
     },
    });

    return orientacao;
  }
}

export { DetalhesOrientacaoService };
