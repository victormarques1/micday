import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  useMediaQuery,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { SidebarFisioterapeuta } from "../../../../components/sidebar/fisioterapeuta";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

interface PacienteItem {
  id: string;
  idade: number;
  altura: number;
  peso: number;
  etnia: string;
  usuario_id: string;
  fisioterapeuta_id: string;
  tipo_id: string;
  usuario: UsuarioProps;
}

interface UsuarioProps {
  nome: string;
  cpf: string;
}

interface PacienteProps {
  pacientes: PacienteItem[];
}

export default function MeusPacientes({ pacientes }: PacienteProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [nome, setNome] = useState("");
  const [nomes, setNomes] = useState([]);

  const [idade, setIdade] = useState(pacientes[0]?.idade);
  console.log(nome);

  useEffect(() => {
    const nomes = pacientes.map((paciente) => paciente.usuario.nome);
    setNomes(nomes);
  }, [pacientes]);

  return (
    <>
      <Head>
        <title>Meus Pacientes | mic.day</title>
      </Head>
      <SidebarFisioterapeuta>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
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
              mb={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Meus Pacientes
            </Heading>
          </Flex>

          <Flex
            maxW="900px"
            w="100%"
            align="center"
            justifyContent="center"
            mt={4}
            pt={8}
            pb={8}
            direction="column"
            bg="pink.50"
            borderColor="transparent"
            borderBottomWidth={2}
            borderBottomColor="pink.600"
          >
            <Flex justifyContent="flex-start" w="85%" direction="column">
              <Text fontSize="lg" mb={2}>
                Buscar Paciente
              </Text>
            </Flex>
            <Select
              size="lg"
              w="85%"
              focusBorderColor="pink.700"
              borderColor={"pink.700"}
              _hover={{ borderColor: "pink.700" }}
              placeholder="Selecione o paciente"
              mb={4}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            >
              {nomes.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </Select>
          </Flex>
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
