import prismaClient from "../../prisma";

interface DeletaUrinaRequest {
    urina_id: string;
    paciente_id: string;
}

class DeletarUrinaService {
    async execute({urina_id, paciente_id}: DeletaUrinaRequest){

        if(urina_id === '' || paciente_id === ''){
            throw new Error('Error.')
        }

        try{    
            const pertenceAoPaciente = await prismaClient.urina.findFirst({
                where:{
                    id: urina_id,
                    paciente_id: paciente_id,
                }
            })

            if(!pertenceAoPaciente){
                throw new Error("Não autorizado")
            }

            await prismaClient.urina.delete({
                where:{
                    id: urina_id
                }
            })

            return { message: "Finalizado com sucesso!"}

        } catch(err){
            throw new Error(err);
        }
    }
}

export { DeletarUrinaService }