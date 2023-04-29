import prismaClient from "../../prisma";

interface UrinaRequest{
    urina_id: string;
}

class BuscarUrinaService {
    async execute({ urina_id }: UrinaRequest){
        const urina = await prismaClient.urina.findFirst({
            where:{
                id: urina_id
            }
        })

        return urina;
    }
}

export { BuscarUrinaService }