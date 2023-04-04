import prismaClient from "../../prisma";

interface BebidaRequest {
   tipo: string;
   quantidade: string;
   paciente_id: string; 
}

class CriarBebidaService {
    async execute({ tipo, quantidade, paciente_id }: BebidaRequest){
        
        const bebida = await prismaClient.bebida.create({
            data: {
                tipo: tipo,
                quantidade: quantidade,
                paciente_id: paciente_id
            }
        })

        return bebida;
    }
}

export { CriarBebidaService }