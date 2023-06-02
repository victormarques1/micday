import prismaClient from "../../prisma";

interface PacienteRequest{
    paciente_id: string;
}

class BuscarPacienteService {
    async execute({ paciente_id }: PacienteRequest){
        const paciente = await prismaClient.paciente.findFirst({
            where:{
                id: paciente_id
            },
            include: {
                usuario: {
                    select: {
                        nome: true,
                        cpf: true
                    }
                },
            }
        })

        return paciente;
    }
}

export { BuscarPacienteService }