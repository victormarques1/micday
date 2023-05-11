import prismaClient from "../../prisma";

interface AtualizaOrientacaoRequest {
    orientacao_id: string;
    descricao: string;
    paciente_id: string;
    data: Date;
}

class AtualizarOrientacaoService {
    async execute({orientacao_id,  descricao, paciente_id, data}: AtualizaOrientacaoRequest){

        const atualizarOrientacao = await prismaClient.orientacao.update({
            where:{
                id: orientacao_id
            },
            data:{
                descricao,
                paciente_id,
                data
            }
        })

        return atualizarOrientacao;
    }
}

export { AtualizarOrientacaoService }