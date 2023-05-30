import prismaClient from '../../prisma'
import { compare, hash } from 'bcryptjs'

interface TrocarSenhaRequest {
    usuario_id: string;
    senha_atual: string;
    nova_senha: string;
}

class TrocarSenhaService {
    async execute({ usuario_id, senha_atual, nova_senha }: TrocarSenhaRequest){
        
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: usuario_id
            }
        })

        if (!usuario) {
            throw new Error("Usuário não encontrado")
        }

        const senhaAtualCorreta = await compare(senha_atual, usuario.senha)

        if (!senhaAtualCorreta) {
            throw new Error("Senha atual incorreta")
        }

        const senhaHash = await hash(nova_senha, 8)

        const usuarioAtualizado = await prismaClient.usuario.update({
            where: {
                id: usuario_id
            },
            data: {
                senha: senhaHash
            }
        })

        return usuarioAtualizado;
    }
}

export { TrocarSenhaService }
