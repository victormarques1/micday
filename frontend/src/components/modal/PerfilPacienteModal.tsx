import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { PacienteItem } from "../../pages/fisioterapeuta/pacientes/index"

interface PacienteProps {
  id: string;
  idade: number;
  altura: number;
  peso: number;
  etnia: string;
  fisioterapeuta_id: string;
  usuario_id: string;
  tipo_id: string;
  usuario: UsuarioProps;
  tipo: TipoProps;
}

interface TipoProps {
  nome: string;
}

interface UsuarioProps {
  nome: string;
  cpf: string;
}

interface PacienteIdProps {
  paciente: PacienteProps;
  isOpen: boolean;
  onClose: () => void;
}

export default function PerfilPacienteModal({ paciente }: PacienteIdProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [cpf, setCpf] = useState(paciente?.usuario.cpf);
  const cpfFormatado = cpf.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Perfil do Paciente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Nome: </strong>
        {paciente?.usuario.nome}
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>CPF: </strong>
        {cpfFormatado}
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Idade: </strong>
        {paciente.idade} anos
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Altura: </strong>
        {paciente.altura}m
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Peso: </strong>
        {paciente.peso}kg
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Etnia: </strong>
        {paciente.etnia}
      </Text>
      <Text mb={2} fontSize={isMobile ? "md" : "lg"}>
        <strong>Tipo de IU: </strong>
        {paciente.tipo.nome}
      </Text>
      </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
}