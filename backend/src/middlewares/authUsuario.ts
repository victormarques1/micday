import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
  tipo_usuario: string;
}

export function authUsuario(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub, tipo_usuario } = verify(
      token,
      process.env.JWT_USUARIO
    ) as Payload;

    req.usuario_id = sub;
    req.tipo_usuario = tipo_usuario;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

export function protegeRotaFisioterapeuta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.tipo_usuario !== "Fisioterapeuta") {
    return res.status(403).json({ mensagem: "Usuário não autorizado" });
  }
  next();
}

export function protegeRotaPaciente(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.tipo_usuario !== "Paciente") {
    return res.status(403).json({ mensagem: "Usuário não autorizado" });
  }
  next();
}

export function authRecuperacaoSenha(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_RECUPERACAO_SENHA) as Payload;

    req.usuario_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
