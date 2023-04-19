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
import { ListarUsuarioController } from "./controllers/usuario/ListarUsuarioController";
import { CriarTipoIncotinenciaController } from "./controllers/incontinencia/CriarTipoIncontinenciaController";
import { ListarTipoIncontinenciaController } from "./controllers/incontinencia/ListarTipoIncontinenciaController";

import { authUsuario } from "./middlewares/authUsuario";
import { protegeRotaFisioterapeuta } from "./middlewares/authUsuario";
import { protegeRotaPaciente } from "./middlewares/authUsuario";

const router = Router();

//ROTAS SEM PROTEÇÃO (USUÁRIOS DESLOGADOS)
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);
router.post('/fisioterapeuta',  new CriarFisioterapeutaController().handle);
router.post('/paciente',  new CriarPacienteController().handle);
router.get('/fisioterapeutas',  new ListarFisioterapeutaController().handle)

// ROTAS FISIOTERAPEUTA
router.post('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new CriarOrientacaoController().handle);
router.get('/pacientes', authUsuario, protegeRotaFisioterapeuta, new ListarPacienteController().handle)
router.delete('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new DeletarOrientacaoController().handle)
router.put('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new AtualizarOrientacaoController().handle)

//ROTAS NEUTRAS
router.get('/orientacoes', authUsuario, new ListarOrientacaoController().handle)
router.get('/detalhes', authUsuario, new ListarUsuarioController().handle)
router.post('/tipo', new CriarTipoIncotinenciaController().handle);
router.get('/tipos', new ListarTipoIncontinenciaController().handle)

// ROTAS PACIENTE --
router.post('/urinas', authUsuario, protegeRotaPaciente, new CriarUrinaController().handle )
router.post('/bebidas', authUsuario, protegeRotaPaciente,new CriarBebidaController().handle)
router.get('/paciente/urinas', authUsuario, protegeRotaPaciente, new ListarUrinaController().handle)
router.get('/paciente/bebidas', authUsuario, protegeRotaPaciente, new ListarBebidaController().handle)
router.delete('/paciente/urinas', authUsuario, protegeRotaPaciente,new DeletarUrinaController().handle)
router.delete('/paciente/bebidas', authUsuario, protegeRotaPaciente, new DeletarBebidaController().handle)
router.put('/paciente/bebidas', authUsuario, protegeRotaPaciente, new AtualizarBebidaController().handle)
router.put('/paciente/urinas', authUsuario, protegeRotaPaciente, new AtualizarUrinaController().handle)



export { router };