import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  tipo: string;
}

class CriarUsuarioService {
  async execute({ nome, email, senha, cpf, telefone, tipo }: UsuarioRequest) {
    if (!email) {
      throw new Error("Email incorreto");
    }

    const usuarioExiste = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (usuarioExiste) {
      throw new Error("Este email já possui um usuário");
    }

    if (tipo !== "Fisioterapeuta" && tipo !== "Paciente") {
      throw new Error("Informe um tipo de usuário válido");
    }

    const senhaHash = await hash(senha, 8);

    const usuario = await prismaClient.usuario.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaHash,
        cpf: cpf,
        telefone: telefone,
        tipo: tipo,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
    });

    return usuario;
  }
}

export { CriarUsuarioService };
