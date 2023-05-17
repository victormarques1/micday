import { useState } from "react";

import { SidebarFisioterapeuta } from "@/components/sidebar/fisioterapeuta";
import Head from "next/head";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import Link from "next/link";

import { Text, Flex, Heading, Button, useMediaQuery } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { Icon } from "@chakra-ui/react";

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
}

export default function PerfilPacienteId({ paciente }: PacienteIdProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [cpf, setCpf] = useState(paciente?.usuario.cpf);
  const cpfFormatado = cpf.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );

  return (
    <>
      <Head>
        <title>Perfil de Paciente | mic.day</title>
      </Head>
      <SidebarFisioterapeuta>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Flex
            maxW="1100px"
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/dashboard/paciente">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyItems="center"
                mr={4}
                bg="pink.50"
                borderColor="pink.700"
                _hover={{ bg: "pink.50" }}
              >
                <FiChevronLeft size={24} color="#B83280" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="pink.700"
              mt={4}
              mr={4}
              mb={isMobile ? 0 : 4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Perfil do paciente
            </Heading>
          </Flex>

          <Flex
            w="100%"
            maxW="1100px"
            align="flex-start"
            justifyContent="flex-start"
            p={4}
            mt={isMobile ? 0 : 4}
            shadow="md"
            bg="pink.50"
            borderBottomColor="pink.700"
            borderBottomWidth={2}
            direction="column"
          >
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
          </Flex>
        </Flex>
      </SidebarFisioterapeuta>
    </>
  );
}

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/paciente/id", {
      params: {
        paciente_id: id,
      },
    });

    return {
      props: {
        paciente: response.data,
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
