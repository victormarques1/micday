import { useState } from "react";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

type ModalPacienteProps = {
    nome: string;
    cpf: string;
    idade: number;
    altura: number;
    peso: number;
    etnia: string;
    isOpen: boolean; 
    onClose: () => void;
  };

export function ModalPaciente({ nome, cpf, idade, altura, peso, etnia }: ModalPacienteProps){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{nome}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center" p={4}>
              <Text fontSize="lg" mb={2}>
                CPF: {cpf}
              </Text>
              <Text fontSize="lg" mb={2}>
                Idade: {idade}
              </Text>
              <Text fontSize="lg" mb={2}>
                Altura: {altura}
              </Text>
              <Text fontSize="lg" mb={2}>
                Peso: {peso}
              </Text>
              <Text fontSize="lg" mb={2}>
                Etnia: {etnia}
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get("/fisioterapeuta/pacientes");
  
      if (response.data === null) {
        return {
          redirect: {
            destination: "/dashboard/fisioterapeuta",
            permanent: false,
          },
        };
      }
  
      return {
        props: {
          pacientes: response.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        redirect: {
          destination: "/dashboard/fisioterapeuta",
          permanent: false,
        },
      };
    }
  });
  

