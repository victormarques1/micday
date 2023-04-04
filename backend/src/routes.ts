import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
import { DetailUsuarioController } from "./controllers/usuario/DetailUsuarioController";
import { CriarFisioterapeutaController } from "./controllers/fisioterapeuta/CriarFisioterapeutaController";
import { CriarPacienteController } from "./controllers/paciente/CriarPacienteController";
import { CriarOrientacaoController } from "./controllers/orientacao/CriarOrientacaoController";
import { CriarUrinaController } from "./controllers/urina/CriarUrinaController";
import { CriarBebidaController } from "./controllers/bebida/CriarBebidaController";
import { ListarPacienteController } from './controllers/paciente/ListarPacienteController'
import { ListarFisioterapeutaController } from "./controllers/fisioterapeuta/ListarFisioterapeutaController";
import { ListarOrientacaoController } from "./controllers/orientacao/ListarOrientacaoController";
import { ListarUrinaController } from "./controllers/urina/ListarUrinaController"
import { ListarBebidaController } from "./controllers/bebida/ListarBebidaController";
import { DeletarUrinaController } from "./controllers/urina/DeletarUrinaController";
import { DeletarBebidaController } from "./controllers/bebida/DeletarBebidaController"
import { DeletarOrientacaoController } from "./controllers/orientacao/DeletarOrientacaoController";
import { AtualizarBebidaController } from "./controllers/bebida/AtualizarBebidaController";
import { AtualizarUrinaController } from "./controllers/urina/AtualizarUrinaController";
import { AtualizarOrientacaoController } from "./controllers/orientacao/AtualizarOrientacaoController";

import { authPaciente } from "./middlewares/authPaciente";
import { authFisioterapeuta } from "./middlewares/authFisioterapeuta";

const router = Router();

// ROTAS USUARIO 
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);

// ROTAS FISIOTERAPEUTA
router.post('/fisioterapeuta', authFisioterapeuta, new CriarFisioterapeutaController().handle);
router.post('/orientacoes', authFisioterapeuta, new CriarOrientacaoController().handle);
router.get('/pacientes', authFisioterapeuta, new ListarPacienteController().handle)
router.delete('/orientacoes', authFisioterapeuta, new DeletarOrientacaoController().handle)
router.put('/orientacoes', authFisioterapeuta, new AtualizarOrientacaoController().handle)

//ROTAS NEUTRAS
router.get('/orientacoes', new ListarOrientacaoController().handle)

// ROTAS PACIENTE --
router.post('/paciente', authPaciente, new CriarPacienteController().handle)
router.post('/urinas', authPaciente, new CriarUrinaController().handle )
router.post('/bebidas', authPaciente, new CriarBebidaController().handle)
router.get('/fisioterapeutas', authPaciente, new ListarFisioterapeutaController().handle)
router.get('/paciente/urinas', authPaciente, new ListarUrinaController().handle)
router.get('/paciente/bebidas', authPaciente, new ListarBebidaController().handle)
router.delete('/paciente/urinas', authPaciente, new DeletarUrinaController().handle)
router.delete('/paciente/bebidas', authPaciente, new DeletarBebidaController().handle)
router.put('/paciente/bebidas', authPaciente, new AtualizarBebidaController().handle)
router.put('/paciente/urinas', authPaciente, new AtualizarUrinaController().handle)

export { router };