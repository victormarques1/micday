import prismaClient from "../../prisma";

interface ListaOrientacaoRequest {
  fisioterapeuta_id: string;
}

class ListarOrientacaoService {
  async execute({ fisioterapeuta_id}: ListaOrientacaoRequest) {
    const listaOrientacoes = await prismaClient.orientacao.findMany({
        include:{
           paciente:{
               include:{
                    usuario:{
                        select:{ 
                            nome: true
                        }
                    }
               }
            },
        },
    })

    return listaOrientacoes;
  }
}

export { ListarOrientacaoService };
