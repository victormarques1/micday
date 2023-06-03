import prismaClient from "../../prisma";

class DetalhesPacienteService {
    async execute(paciente_id: string, usuario_id: string){

        const paciente = await prismaClient.paciente.findFirst({
            where: {
                id: paciente_id,
                usuario_id
            },
            select:{
                id: true,
                altura: true,
                peso: true,
                etnia: true,
                usuario_id: true,
                fisioterapeuta_id: true,
                tipo_incontinencia: true,
                idade: true,
            }
        })

        return { paciente }
    }
}

export { DetalhesPacienteService }