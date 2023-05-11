import prismaClient from "../../prisma";

class MeusPacientesService {
    async execute( usuario_id: string ){
        const paciente = await prismaClient.paciente.findMany({
            where:{
                fisioterapeuta: {
                    usuario_id: usuario_id
                }
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        cpf: true
                    }
                },
                tipo:{
                    select:{
                        nome: true
                    }
                }
            }
        })

        return paciente;
    }
}

export { MeusPacientesService }