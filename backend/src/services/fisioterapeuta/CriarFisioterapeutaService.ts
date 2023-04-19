import prismaClient from "../../prisma";

interface FisioterapeutaRequest {
    usuario_id: string;
    crefito: string;
    atuacao: string;
}

class CriarFisioterapeutaService {
    async execute({ usuario_id, crefito, atuacao }: FisioterapeutaRequest){
        
        const fisioterapeuta = await prismaClient.fisioterapeuta.create({
            data:{
                usuario_id: usuario_id,
                crefito: crefito,
                atuacao: atuacao,
            }
        })

        return fisioterapeuta;
    }
}

export { CriarFisioterapeutaService }