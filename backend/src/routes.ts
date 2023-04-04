import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
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

import { authUsuario } from "./middlewares/authUsuario";
import { protegeRotaFisioterapeuta } from "./middlewares/authUsuario";
import { protegeRotaPaciente } from "./middlewares/authUsuario";

const router = Router();

// ROTAS USUARIO 
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);

// ROTAS FISIOTERAPEUTA
router.post('/fisioterapeuta', authUsuario, protegeRotaFisioterapeuta, new CriarFisioterapeutaController().handle);
router.post('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new CriarOrientacaoController().handle);
router.get('/pacientes', authUsuario, protegeRotaFisioterapeuta, new ListarPacienteController().handle)
router.delete('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new DeletarOrientacaoController().handle)
router.put('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new AtualizarOrientacaoController().handle)

//ROTAS NEUTRAS
router.get('/orientacoes', authUsuario, new ListarOrientacaoController().handle)

// ROTAS PACIENTE --
router.post('/paciente', authUsuario, protegeRotaPaciente, new CriarPacienteController().handle)
router.post('/urinas', authUsuario, protegeRotaPaciente, new CriarUrinaController().handle )
router.post('/bebidas', authUsuario, protegeRotaPaciente,new CriarBebidaController().handle)
router.get('/fisioterapeutas', authUsuario, protegeRotaPaciente, new ListarFisioterapeutaController().handle)
router.get('/paciente/urinas', authUsuario, protegeRotaPaciente, new ListarUrinaController().handle)
router.get('/paciente/bebidas', authUsuario, protegeRotaPaciente, new ListarBebidaController().handle)
router.delete('/paciente/urinas', authUsuario, protegeRotaPaciente,new DeletarUrinaController().handle)
router.delete('/paciente/bebidas', authUsuario, protegeRotaPaciente, new DeletarBebidaController().handle)
router.put('/paciente/bebidas', authUsuario, protegeRotaPaciente, new AtualizarBebidaController().handle)
router.put('/paciente/urinas', authUsuario, protegeRotaPaciente, new AtualizarUrinaController().handle)

export { router };