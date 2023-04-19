import prismaClient from "../../prisma";

interface TipoIncontinenciaRequest {
    nome: string;
}

class CriarTipoIncontinenciaService {
    async execute({nome}: TipoIncontinenciaRequest){
        const tipoIncontiencia = await prismaClient.tipoIncontinencia.create({
            data:{
                nome: nome
            }
        });

        return tipoIncontiencia;
    }
}

export { CriarTipoIncontinenciaService }