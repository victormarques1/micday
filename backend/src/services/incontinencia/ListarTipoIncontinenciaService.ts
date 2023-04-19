import prismaClient from "../../prisma";

class ListarTipoIncontinenciaService {
    async execute(){

        const listaTipos= await prismaClient.tipoIncontinencia.findMany()

        return listaTipos;

    }
}

export { ListarTipoIncontinenciaService }