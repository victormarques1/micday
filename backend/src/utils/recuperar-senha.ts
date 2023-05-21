import { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import obterIdUsuarioPorEmail from "./buscarIdPorEmail";

import { SMTP_CONFIG } from "./smtp";

async function enviarEmailRecuperacaoSenha(req: Request, res: Response) {
  const { email } = req.body;

  const usuarioId = await obterIdUsuarioPorEmail(email);
  
  if (!usuarioId) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }
  
  const token = jwt.sign({ usuarioId: usuarioId.toString() }, process.env.JWT_RECUPERACAO_SENHA, { expiresIn: '3h' });

  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const resetPasswordLink = `http://localhost:3000/nova-senha?token=${token}`;

  const mailOptions = {
    from: "email.micday@gmail.com",
    to: email,
    subject: "Recuperação de Senha - mic.day",
    text: `Olá! Aqui está o seu link de recuperação de senha: ${resetPasswordLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Email de recuperação de senha enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    res
      .status(500)
      .json({
        error: "Ocorreu um erro ao enviar o email de recuperação de senha.",
      });
  }
}

export default enviarEmailRecuperacaoSenha;
