import prismaClient from "../../prisma";

class ListarUsuarioService {
    async execute(usuario_id: string){

        const usuario = await prismaClient.usuario.findFirst({
            where: {
                id: usuario_id
            },
            select:{
                id: true,
                nome: true,
                email: true,
                cpf: true,
                telefone: true,
                tipo: true,
            }
        })

        return { usuario }
    }
}

export { ListarUsuarioService }