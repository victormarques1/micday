import prismaClient from "../../prisma";

interface AtualizaBebidaRequest {
    bebida_id: string;
    paciente_id: string;
    tipo: string;
    data: Date;
    quantidade: number;
}

class AtualizarBebidaService {
    async execute({bebida_id, tipo, quantidade, data, paciente_id}: AtualizaBebidaRequest){

        const bebida = await prismaClient.bebida.findUnique({
            where:{
                id: bebida_id, 
            }
        })
        if (!bebida) {
            throw new Error("Registro de bebida não encontrado");
        }

        const atualizarBebida = await prismaClient.bebida.update({
            where:{
                id: bebida_id,
            },
            data:{
                tipo,
                quantidade,
                paciente_id,
                data: new Date(data),
            }
        })

        return atualizarBebida;
    }
}

export { AtualizarBebidaService }