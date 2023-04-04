import prismaClient from "../../prisma";

interface AtualizaOrientacaoRequest {
    orientacao_id: string;
    fisioterapeuta_id: string;
    descricao: string;
    paciente_id: string;
}

class AtualizarOrientacaoService {
    async execute({orientacao_id, fisioterapeuta_id, descricao, paciente_id}: AtualizaOrientacaoRequest){

        const atualizarOrientacao = await prismaClient.orientacao.update({
            where:{
                id: orientacao_id
            },
            data:{
                fisioterapeuta_id,
                descricao,
                paciente_id
            }
        })

        return atualizarOrientacao;
    }
}

export { AtualizarOrientacaoService }