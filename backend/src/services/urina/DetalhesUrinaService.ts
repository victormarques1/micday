import prismaClient from "../../prisma";

class DetalhesUrinaService {
    async execute( usuario_id: string ){

            const urina = await prismaClient.urina.findMany({
            where: {
                paciente: {
                    usuario_id: usuario_id
                }
            },
            select:{
                id: true,
                data: true,
                perda_urina: true,
                necessidade_urina: true,
                paciente_id: true
            }
        })

        return { urina }
    }
}

export { DetalhesUrinaService }