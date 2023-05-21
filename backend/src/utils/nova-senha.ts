import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

interface MeuToken {
  usuarioId: string;
}

async function redefinirSenha(req: Request, res: Response) {
  const { token, novaSenha } = req.body;

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_RECUPERACAO_SENHA
    ) as MeuToken;
    const usuarioId = decodedToken.usuarioId;

    if (!usuarioId) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    const usuario = await prismaClient.usuario.findUnique({
      where: {
        id: usuarioId?.toString(),
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const hashNovaSenha = await bcrypt.hash(novaSenha, 8);

    await prismaClient.usuario.update({
      where: { id: usuarioId },
      data: { senha: hashNovaSenha },
    });

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao redefinir a senha." });
  }
}

export default redefinirSenha;
