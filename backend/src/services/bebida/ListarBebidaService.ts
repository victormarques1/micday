import prismaClient from "../../prisma";

interface ListaBebidasRequest {
    paciente_id: string;
}

class ListarBebidaService {
    async execute({ paciente_id }: ListaBebidasRequest){

        const listarBebidas = prismaClient.bebida.findMany({
            where:{
                paciente_id: paciente_id
            },
            select:{
                id: true,
                tipo: true,
                data: true,
                quantidade: true,
                paciente_id: true,
            }
        })

        return listarBebidas;
    }
}

export { ListarBebidaService }