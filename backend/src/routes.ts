import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
import { DetailUsuarioController } from "./controllers/usuario/DetailUsuarioController";
import { CriarFisioterapeutaController } from "./controllers/fisioterapeuta/CriarFisioterapeutaController";

import { authPaciente } from "./middlewares/authPaciente";
import { authFisioterapeuta } from "./middlewares/authFisioterapeuta";

const router = Router();

// ROTAS USUARIO 
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);

// ROTAS FISIOTERAPEUTA
router.post('/fisioterapeuta', authFisioterapeuta, new CriarFisioterapeutaController().handle)
//router.get('/me', authFisioterapeuta , new DetailUsuarioController().handle);

// ROTAS PACIENTE --
//router.get('/me', authPaciente , new DetailUsuarioController().handle);

export { router };