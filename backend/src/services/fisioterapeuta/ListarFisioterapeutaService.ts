import prismaClient from "../../prisma";

interface ListarFisioterapeutaRequest {
    usuario_id: string;
}

class ListarFisioterapeutaService {
    async execute({usuario_id}: ListarFisioterapeutaRequest){

        const listaFisioterapeutas = await prismaClient.fisioterapeuta.findMany({
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

        return listaFisioterapeutas;

    }
}

export { ListarFisioterapeutaService }