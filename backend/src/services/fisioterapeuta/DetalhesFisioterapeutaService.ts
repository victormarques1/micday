import prismaClient from "../../prisma";

class DetalhesFisioterapeutaService {
    async execute(fisioterapeuta_id: string, usuario_id: string){

        const fisioterapeuta = await prismaClient.fisioterapeuta.findFirst({
            where: {
                id: fisioterapeuta_id,
                usuario_id
            },
            select:{
                id: true,
                usuario_id: true,
                atuacao: true,
                crefito: true,
            }
        })

        return { fisioterapeuta }
    }
}

export { DetalhesFisioterapeutaService }