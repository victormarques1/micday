import prismaClient from "../../prisma";

class DetailUsuarioService {
    async execute(){
        return { ok: true }
    }
}

export { DetailUsuarioService }