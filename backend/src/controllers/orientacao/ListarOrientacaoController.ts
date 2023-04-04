import { Request, Response } from "express";
import { ListarOrientacaoService } from "../../services/orientacao/ListarOrientacaoService";

class ListarOrientacaoController {
    async handle(req: Request, res: Response){
        const { fisioterapeuta_id, paciente_id } = req.body;

        const listarOrientacaoService = new ListarOrientacaoService();

        const listaOrientacoes = await listarOrientacaoService.execute({
            fisioterapeuta_id,
            paciente_id
        });

        return res.json(listaOrientacoes);
    }
}

export { ListarOrientacaoController }