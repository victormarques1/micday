import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  emailOuCpf: string;
  senha: string;
}

function checaEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

class AuthUsuarioService {
  async execute({ emailOuCpf, senha }: AuthRequest) {
    let usuario;

    if (checaEmail(emailOuCpf)) {
      usuario = await prismaClient.usuario.findFirst({
        where: {
          email: emailOuCpf,
        },
      });
    } else {
      usuario = await prismaClient.usuario.findFirst({
        where: {
          cpf: emailOuCpf,
        },
      });
    }

    if (!usuario) {
      throw new Error("Email ou CPF incorreto");
    }
    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Senha incorreta");
    }

    const token = sign(
      {
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo,
      },
      process.env.JWT_USUARIO,
      {
        subject: usuario.id,
        expiresIn: "30d",
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      tokenUsuario: token,
    };
  }
}

export { AuthUsuarioService };
