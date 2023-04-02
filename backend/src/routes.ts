import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
import { DetailUsuarioController } from "./controllers/usuario/DetailUsuarioController";
import { CriarFisioterapeutaController } from "./controllers/fisioterapeuta/CriarFisioterapeutaController";
import { CriarPacienteController } from "./controllers/paciente/CriarPacienteController";
import { CriarOrientacaoController } from "./controllers/orientacao/CriarOrientacaoController";

import { authPaciente } from "./middlewares/authPaciente";
import { authFisioterapeuta } from "./middlewares/authFisioterapeuta";

const router = Router();

// ROTAS USUARIO 
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);

// ROTAS FISIOTERAPEUTA
router.post('/fisioterapeuta', authFisioterapeuta, new CriarFisioterapeutaController().handle)
router.post('/orientacoes', authFisioterapeuta, new CriarOrientacaoController().handle) 

// ROTAS PACIENTE --
router.post('/paciente', authPaciente, new CriarPacienteController().handle)

export { router };