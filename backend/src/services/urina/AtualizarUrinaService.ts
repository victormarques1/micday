import prismaClient from "../../prisma";

interface AtualizaUrinaRequest {
    urina_id: string;
    paciente_id: string;
    quantidade: string;
    perda_urina: boolean;
}

class AtualizarUrinaService {
    async execute({urina_id, quantidade, perda_urina, paciente_id}: AtualizaUrinaRequest){

        const atualizaUrina = await prismaClient.urina.update({
            where:{
                id: urina_id, 
            },
            data:{
                quantidade,
                perda_urina,
                paciente_id
            }
        })

        return atualizaUrina;
    }
}

export { AtualizarUrinaService }