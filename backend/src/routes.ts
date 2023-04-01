import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
import { DetailUsuarioController } from "./controllers/usuario/DetailUsuarioController";

import { authPaciente } from "./middlewares/authPaciente";
import { authFisioterapeuta } from "./middlewares/authFisioterapeuta";

const router = Router();

//-- ROTAS USUARIO --
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);

// ROTA TESTE
router.get('/me', authFisioterapeuta, new DetailUsuarioController().handle);

export { router };