import prismaClient from "../../prisma";

interface PacienteRequest {
  idade: number;
  altura: number;
  peso: number;
  etnia: string;
  usuario_id: string;
  fisioterapeuta_id: string;
  tipo_incontinencia: string;
}

class CriarPacienteService {
  async execute({
    idade,
    altura,
    peso,
    etnia,
    usuario_id,
    fisioterapeuta_id,
    tipo_incontinencia,
  }: PacienteRequest) {
    const paciente = await prismaClient.paciente.create({
      data: {
        idade: idade,
        altura: altura,
        peso: peso,
        etnia: etnia,
        usuario_id: usuario_id,
        fisioterapeuta_id: fisioterapeuta_id,
        tipo_incontinencia: tipo_incontinencia,
      },
    });

    return paciente;
  }
}

export { CriarPacienteService };
