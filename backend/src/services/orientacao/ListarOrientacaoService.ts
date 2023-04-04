import prismaClient from "../../prisma";

interface ListaOrientacaoRequest {
    fisioterapeuta_id: string;
    paciente_id: string;
}

class ListarOrientacaoService {
    async execute({fisioterapeuta_id, paciente_id}: ListaOrientacaoRequest){
        const listaOrientacoes = await prismaClient.orientacao.findMany({
            where:{
                fisioterapeuta_id: fisioterapeuta_id,
                paciente_id: paciente_id
            },
            select:{
                id: true,
                fisioterapeuta_id: true,
                paciente_id: true,
                descricao: true,
                created_at: true,
            }
        })
        
        return listaOrientacoes;

    }
}

export { ListarOrientacaoService }