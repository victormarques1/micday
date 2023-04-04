import prismaClient from "../../prisma";

interface DeletaOrientacaoRequest {
    orientacao_id: string;
    paciente_id: string;
}

class DeletarOrientacaoService {
    async execute({orientacao_id, paciente_id}: DeletaOrientacaoRequest){

        if(orientacao_id === '' || paciente_id === ''){
            throw new Error('Error.')
        }

        try{    
            const pertenceAoPaciente = await prismaClient.orientacao.findFirst({
                where:{
                    id: orientacao_id,
                    paciente_id: paciente_id,
                }
            })

            if(!pertenceAoPaciente){
                throw new Error("Não autorizado")
            }

            await prismaClient.orientacao.delete({
                where:{
                    id: orientacao_id
                }
            })

            return { message: "Finalizado com sucesso!"}

        } catch(err){
            throw new Error(err);
        }
    }
}

export { DeletarOrientacaoService }