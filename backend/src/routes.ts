import { Router } from "express";

import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { AuthUsuarioController } from "./controllers/usuario/AuthUsuarioController";
import { CriarFisioterapeutaController } from "./controllers/fisioterapeuta/CriarFisioterapeutaController";
import { CriarPacienteController } from "./controllers/paciente/CriarPacienteController";
import { CriarOrientacaoController } from "./controllers/orientacao/CriarOrientacaoController";
import { CriarUrinaController } from "./controllers/urina/CriarUrinaController";
import { CriarBebidaController } from "./controllers/bebida/CriarBebidaController";
import { DetalhesPacienteController } from './controllers/paciente/DetalhesPacienteController'
import { DetalhesFisioterapeutaController } from "./controllers/fisioterapeuta/DetalhesFisioterapeutaController";
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
import { AtualizarPacienteController } from "./controllers/paciente/AtualizarPacienteController";
import { ListarUsuarioController } from "./controllers/usuario/DetalhesUsuarioController";
import { CriarTipoIncotinenciaController } from "./controllers/incontinencia/CriarTipoIncontinenciaController";
import { ListarTipoIncontinenciaController } from "./controllers/incontinencia/ListarTipoIncontinenciaController";

import { authUsuario } from "./middlewares/authUsuario";
import { protegeRotaFisioterapeuta } from "./middlewares/authUsuario";
import { protegeRotaPaciente } from "./middlewares/authUsuario";
import { AtualizarUsuarioController } from "./controllers/usuario/AtualizarUsuarioController";
import { AtualizarFisioterapeutaController } from "./controllers/fisioterapeuta/AtualizarFisioterapeutaController";
import { DetalhesUrinaController } from "./controllers/urina/DetalhesUrinaController";
import { BuscarUrinaController } from "./controllers/urina/BuscarUrinaController";

const router = Router();

//ROTAS SEM PROTEÇÃO (USUÁRIOS DESLOGADOS)
router.post('/usuarios', new CriarUsuarioController().handle);
router.post('/login', new AuthUsuarioController().handle);
router.post('/fisioterapeuta',  new CriarFisioterapeutaController().handle);
router.post('/paciente',  new CriarPacienteController().handle);
router.get('/fisioterapeutas',  new ListarFisioterapeutaController().handle)

// ROTAS FISIOTERAPEUTA
router.post('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new CriarOrientacaoController().handle);
router.delete('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new DeletarOrientacaoController().handle)
router.put('/orientacoes', authUsuario, protegeRotaFisioterapeuta, new AtualizarOrientacaoController().handle)
router.get('/fisioterapeuta/detalhes', authUsuario, protegeRotaFisioterapeuta,  new DetalhesFisioterapeutaController().handle)
router.put('/fisioterapeuta', authUsuario, protegeRotaFisioterapeuta, new AtualizarFisioterapeutaController().handle)


//ROTAS NEUTRAS
router.get('/orientacoes', authUsuario, new ListarOrientacaoController().handle)
router.get('/detalhes', authUsuario, new ListarUsuarioController().handle)
router.post('/tipo', new CriarTipoIncotinenciaController().handle);
router.get('/tipos', new ListarTipoIncontinenciaController().handle)
router.put('/usuario', authUsuario, new AtualizarUsuarioController().handle)

// ROTAS PACIENTE --
router.get('/paciente/detalhes', authUsuario, protegeRotaPaciente,  new DetalhesPacienteController().handle)
router.put('/paciente', authUsuario, protegeRotaPaciente, new AtualizarPacienteController().handle)
router.post('/urina', authUsuario, protegeRotaPaciente, new CriarUrinaController().handle )
router.post('/bebidas', authUsuario, protegeRotaPaciente,new CriarBebidaController().handle)
router.get('/urinas', authUsuario, protegeRotaPaciente, new ListarUrinaController().handle)
router.get('/urina/detalhes', authUsuario, protegeRotaPaciente, new DetalhesUrinaController().handle)
router.get('/urina/id', authUsuario, protegeRotaPaciente, new BuscarUrinaController().handle)
router.get('/paciente/bebidas', authUsuario, protegeRotaPaciente, new ListarBebidaController().handle)
router.delete('/paciente/urinas', authUsuario, protegeRotaPaciente,new DeletarUrinaController().handle)
router.delete('/paciente/bebidas', authUsuario, protegeRotaPaciente, new DeletarBebidaController().handle)
router.put('/paciente/bebidas', authUsuario, protegeRotaPaciente, new AtualizarBebidaController().handle)
router.put('/paciente/urina', authUsuario, protegeRotaPaciente, new AtualizarUrinaController().handle)



export { router };