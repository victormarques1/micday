import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUsuarioService {
  async execute({ email, senha }: AuthRequest) {
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      throw new Error("Email incorreto");
    }

    const senhaCorreta = await compare(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new Error("Senha incorreta");
    }
     
      const token = sign(
        {
          nome: usuario.nome,
          email: usuario.email,
          tipo_usuario: usuario.tipo
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
        tokenUsuario: token,
      };

    // if (usuario.tipo === "Fisioterapeuta") {
    //   const tokenFisioterapeuta = sign(
    //     {
    //       nome: usuario.nome,
    //       email: usuario.email,
    //     },
    //     process.env.JWT_FISIOTERAPEUTA,
    //     {
    //       subject: usuario.id,
    //       expiresIn: "30d",
    //     }
    //   );

    //   return {
    //     id: usuario.id,
    //     nome: usuario.nome,
    //     email: usuario.email,
    //     tipo: usuario.tipo,
    //     tokenUsuario: tokenFisioterapeuta,
    //   };
    // }

    // if (usuario.tipo === "Paciente") {
    //     const tokenPaciente = sign(
    //       {
    //         nome: usuario.nome,
    //         email: usuario.email,
    //       },
    //       process.env.JWT_PACIENTE,
    //       {
    //         subject: usuario.id,
    //         expiresIn: "30d",
    //       }
    //     );
  
    //     return {
    //       id: usuario.id,
    //       nome: usuario.nome,
    //       email: usuario.email,
    //       tipo: usuario.tipo,
    //       tokenUsuario: tokenPaciente,
    //     };
    //   }

  }
}

export { AuthUsuarioService };
