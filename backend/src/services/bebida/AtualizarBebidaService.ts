import prismaClient from "../../prisma";

interface AtualizaBebidaRequest {
    bebida_id: string;
    paciente_id: string;
    tipo: string;
    quantidade: string;
}

class AtualizarBebidaService {
    async execute({bebida_id, tipo, quantidade, paciente_id}: AtualizaBebidaRequest){

        const atualizarBebida = await prismaClient.bebida.update({
            where:{
                id: bebida_id,
            },
            data:{
                tipo,
                quantidade,
                paciente_id
            }
        })

        return atualizarBebida;
    }
}

export { AtualizarBebidaService }