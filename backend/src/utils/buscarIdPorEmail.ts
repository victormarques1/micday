import prismaClient from "../prisma";

async function obterIdUsuarioPorEmail(email: string): Promise<string | null> {
    try {
      const usuario = await prismaClient.usuario.findFirst({
        where: { email },
        select: { id: true },
      });
  
      return usuario?.id ?? null;
    } catch (error) {
      console.error('Erro ao obter ID do usuário por e-mail:', error);
      return null;
    }
  }
  
  export default obterIdUsuarioPorEmail;