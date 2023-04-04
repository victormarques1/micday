import prismaClient from "../../prisma";

interface ListarPacienteRequest {
    usuario_id: string;
}

class ListarPacienteService {
    async execute({usuario_id}: ListarPacienteRequest){

        const listaPacientes = await prismaClient.paciente.findMany({
            where:{
                usuario_id: usuario_id
            },
            include:{
                usuario:{
                    select:{ 
                        nome: true
                    }
                },
            },
        })

        return listaPacientes;

    }
}

export { ListarPacienteService }