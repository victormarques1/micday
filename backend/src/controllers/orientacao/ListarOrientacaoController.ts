import { Request, Response } from "express";
import { ListarOrientacaoService } from "../../services/orientacao/ListarOrientacaoService";

class ListarOrientacaoController {
    async handle(req: Request, res: Response){
        const usuario_id = req.usuario_id;

        const listarOrientacaoService = new ListarOrientacaoService();

        const listaOrientacoes = await listarOrientacaoService.execute({
            usuario_id,
        });

        return res.json(listaOrientacoes);
    }
}

export { ListarOrientacaoController }