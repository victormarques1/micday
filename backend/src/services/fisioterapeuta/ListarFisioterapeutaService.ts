import prismaClient from "../../prisma";

class ListarFisioterapeutaService {
    async execute(){

        const listaFisioterapeutas = await prismaClient.fisioterapeuta.findMany({
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