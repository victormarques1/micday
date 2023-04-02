import prismaClient from "../../prisma";

interface OrientacaoRequest {
    descricao: string;
    fisioterapeuta_id: string;
    paciente_id: string;
}

class CriarOrientacaoService {
    async execute({descricao, fisioterapeuta_id, paciente_id}: OrientacaoRequest){

    const orientacao = await prismaClient.orientacao.create({
        data:{
            descricao: descricao,
            fisioterapeuta_id: fisioterapeuta_id,
            paciente_id: paciente_id
        }
    })
    
    return orientacao; 
        
    }
}

export { CriarOrientacaoService }