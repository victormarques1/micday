import prismaClient from "../../prisma";

interface FisioterapeutaRequest {
    usuario_id: string;
}

class CriarFisioterapeutaService {
    async execute({ usuario_id }: FisioterapeutaRequest){
        
        const fisioterapeuta = await prismaClient.fisioterapeuta.create({
            data:{
                usuario_id: usuario_id
            }
        })

        return fisioterapeuta;
    }
}

export { CriarFisioterapeutaService }