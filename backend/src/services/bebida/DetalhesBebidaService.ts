import prismaClient from "../../prisma";

class DetalhesBebidaService {
    async execute( usuario_id: string ){

            const bebida = await prismaClient.bebida.findMany({
            where: {
                paciente: {
                    usuario_id: usuario_id
                }
            },
            select:{
                id: true,
                data: true,
                quantidade: true,
                tipo: true,
                paciente_id: true
            }
        })

        return bebida;
    }
}

export { DetalhesBebidaService }