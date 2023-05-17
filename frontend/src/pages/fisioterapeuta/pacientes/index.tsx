import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  useMediaQuery,
  Button,
  Input,
  Box,
  VStack,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { SidebarFisioterapeuta } from "../../../components/sidebar/fisioterapeuta";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { format } from "date-fns";

interface PacienteItem {
  id: string;
  idade: number;
  created_at: string;
  usuario_id: string;
  fisioterapeuta_id: string;
  usuario: UsuarioProps;
  tipo: TipoProps;
}

interface UsuarioProps {
  nome: string;
  cpf: string;
}

interface TipoProps {
  nome: string;
}

interface PacienteProps {
  pacientes: PacienteItem[];
}

export default function MeusPacientes({ pacientes }: PacienteProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [nome, setNome] = useState("");

  const pacientesOrdenados = pacientes.sort((a, b) => {
    const dataA = new Date(a.created_at).getTime();
    const dataB = new Date(b.created_at).getTime();
    return dataB - dataA;
  });

  return (
    <>
      <Head>
        <title>Meus Pacientes | mic.day</title>
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
              Meus pacientes
            </Heading>
          </Flex>

          <VStack align="stretch" spacing={4} w="100%" maxW="1100px">
            {pacientesOrdenados.map((paciente) => (
              <Box
                key={paciente.id}
                mt={isMobile ? 0 : 4}
                p={4}
                shadow="md"
                bg="pink.50"
                borderBottomColor="pink.700"
                borderBottomWidth={2}
                fontSize="lg"
              >
                <Text fontSize="lg" mb={2}>
                  <strong>Nome:</strong> {paciente.usuario.nome}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Idade:</strong> {paciente.idade}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Tipo de IU:</strong> {paciente.tipo?.nome}
                </Text>
                <Text fontSize="lg" mb={2}>
                  <strong>Usuário desde:</strong>{" "}
                  {format(new Date(paciente.created_at), "dd/MM/yyyy")}
                </Text>
                <Flex direction={isMobile ? "column" : "row"}>
                  <Link href={`/perfil/paciente/${paciente.id}`}>
                    <Button
                      leftIcon={<BsPerson size={16} />}
                      mt={3}
                      mr={4}
                      bg="pink.600"
                      color="white"
                      size="md"
                      _hover={{ bg: "pink.500" }}
                    >
                      Perfil
                    </Button>
                  </Link>

                  <Link href={`/registros/paciente/${paciente.id}`}>
                    <Button
                      leftIcon={<AiOutlineFileSearch size={16} />}
                      mt={3}
                      mr={4}
                      bg="pink.600"
                      color="white"
                      size="md"
                      _hover={{ bg: "pink.500" }}
                    >
                      Registros
                    </Button>
                  </Link>
                  <Link
                    href={`/orientacao/fisioterapeuta/paciente/${paciente.id}`}
                  >
                    <Button
                      leftIcon={<FaRegBell size={16} />}
                      mt={3}
                      mr={4}
                      bg="pink.600"
                      color="white"
                      size="md"
                      _hover={{ bg: "pink.500" }}
                    >
                      Orientações
                    </Button>
                  </Link>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Flex>
      </SidebarFisioterapeuta>
    </>
  );
}

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
