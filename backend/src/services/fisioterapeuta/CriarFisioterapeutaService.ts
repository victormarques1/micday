import prismaClient from "../../prisma";
import { CriarUsuarioService } from "../../services/usuario/CriarUsuarioService"

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