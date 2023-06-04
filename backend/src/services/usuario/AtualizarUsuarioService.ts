import prismaClient from "../../prisma";

interface UsuarioRequest {
  user_id: string;
  nome: string;
  cpf: string;
  telefone: string;
}

class AtualizarUsuarioService {
  async execute({ usuario_id, nome, cpf, telefone }) {
    try {
      const usuarioExiste = await prismaClient.usuario.findFirst({
        where: {
          id: usuario_id,
        },
      });

      if (!usuarioExiste) {
        throw new Error("Usuario não existe.");
      }

      const usuarioAtualizado = await prismaClient.usuario.update({
        where: {
          id: usuario_id,
        },
        data: {
          nome,
          cpf,
          telefone,
        },
        select: {
          nome: true,
          cpf: true,
          telefone: true,
        },
      });

      return usuarioAtualizado;
    } catch (err) {
      console.log(err);
      throw new Error("Erro ao atualizar usuario.");
    }
  }
}

export { AtualizarUsuarioService };
