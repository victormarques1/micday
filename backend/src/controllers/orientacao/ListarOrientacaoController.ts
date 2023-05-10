import { Request, Response } from "express";
import { ListarOrientacaoService } from "../../services/orientacao/ListarOrientacaoService";

class ListarOrientacaoController {
    async handle(req: Request, res: Response){
        const fisioterapeuta_id = req.fisioterapeuta_id;

        const listarOrientacaoService = new ListarOrientacaoService();

        const listaOrientacoes = await listarOrientacaoService.execute({
            fisioterapeuta_id,
        });

        return res.json(listaOrientacoes);
    }
}

export { ListarOrientacaoController }