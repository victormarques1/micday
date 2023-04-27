import prismaClient from "../../prisma";

interface ListaUrinaRequest {
    paciente_id: string;
}

class ListarUrinaService {
    async execute({ paciente_id }: ListaUrinaRequest){

        const listaUrinas = await prismaClient.urina.findMany({
            where:{
                paciente_id: paciente_id
            },
            select:{
                id: true,
                data: true,
                perda_urina: true,
                necessidade_urina: true,
                paciente_id: true
            }
        }) 

        return listaUrinas;

    }
}

export { ListarUrinaService }