import prismaClient from '../../prisma/index'

interface UrinaRequest {
    quantidade: string;
    perda_urina: boolean;
    paciente_id: string;
}

class CriarUrinaService {
    async execute({ quantidade, perda_urina, paciente_id}: UrinaRequest){
        const urina = await prismaClient.urina.create({
            data:{
                quantidade: quantidade,
                perda_urina: perda_urina,
                paciente_id: paciente_id
            }
        })

        return urina;
    }
}

export { CriarUrinaService }