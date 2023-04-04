import prismaClient from "../../prisma";

interface DeletaBebidaRequest {
    bebida_id: string;
    paciente_id: string;
}

class DeletarBebidaService {
    async execute({bebida_id, paciente_id}: DeletaBebidaRequest){

        if(bebida_id === '' || paciente_id === ''){
            throw new Error('Error.')
        }

        try{    
            const pertenceAoPaciente = await prismaClient.bebida.findFirst({
                where:{
                    id: bebida_id,
                    paciente_id: paciente_id,
                }
            })

            if(!pertenceAoPaciente){
                throw new Error("Não autorizado")
            }

            await prismaClient.bebida.delete({
                where:{
                    id: bebida_id
                }
            })

            return { message: "Finalizado com sucesso!"}

        } catch(err){
            throw new Error(err);
        }
    }
}

export { DeletarBebidaService }