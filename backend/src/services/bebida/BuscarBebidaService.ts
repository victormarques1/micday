import prismaClient from "../../prisma";

interface BebidaRequest{
    bebida_id: string;
}

class BuscarBebidaService {
    async execute({ bebida_id }: BebidaRequest){
        const bebida = await prismaClient.bebida.findFirst({
            where:{
                id: bebida_id
            }
        })

        return bebida;
    }
}

export { BuscarBebidaService }