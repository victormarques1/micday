import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  useMediaQuery,
  Button,
  Select,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { SidebarFisioterapeuta } from "../../../components/sidebar/fisioterapeuta";
import { BsPerson } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";

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

interface FisioterapeutaProps {
  usuario: UsuarioProps;
}

interface UsuarioProps {
  pacientes: PacienteItem[];
  fisioterapeuta: FisioterapeutaProps;
}

export default function DashboardFisioterapeuta({
  pacientes,
  fisioterapeuta,
}: UsuarioProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [nome, setNome] = useState("");
  const [nomes, setNomes] = useState([]);
  const [nomeSelecionado, setNomeSelecionado] = useState(false);
  const [fisioterapeutaNome, setFisioterapeutaNome] = useState(
    fisioterapeuta?.usuario.nome
  );
  const [pacienteId, setPacienteId] = useState(pacientes[0]?.id);

  useEffect(() => {
    const nomes = pacientes.map((paciente) => paciente.usuario.nome);
    setNomes(nomes);
  }, [pacientes]);

  useEffect(() => {
    const pacienteSelecionado = pacientes.find(
      (paciente) => paciente.usuario.nome === nome
    );
    if (pacienteSelecionado) {
      setPacienteId(pacienteSelecionado.id);
    }
  }, [nome, pacientes]);

  return (
    <>
      <Head>
        <title>Página Inicial | mic.day</title>
      </Head>
      <SidebarFisioterapeuta>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          p={2}
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 6}
          >
            <Heading color="pink.700" fontSize={isMobile ? "28px" : "3xl"}>
              Bem vindo, {fisioterapeutaNome}!
            </Heading>
          </Flex>
          <Flex
            w="100%"
            align="center"
            justifyContent="center"
            pt={8}
            pb={8}
            direction="column"
            shadow="md"
            bg="pink.50"
            borderBottomColor="pink.700"
            borderBottomWidth={2}
          >
            <Flex justifyContent="flex-start" w="85%" direction="column">
              <Text fontSize="lg" mb={2} fontWeight="medium">
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
              onChange={(e) => {
                const pacienteSelecionado = pacientes.find(
                  (paciente) => paciente.usuario.nome === e.target.value
                );
                setNome(e.target.value);
                setNomeSelecionado(Boolean(e.target.value));
                setPacienteId(pacienteSelecionado?.id);
              }}
            >
              {nomes.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </Select>
            <Flex justifyContent="flex-start" w="85%" direction="row">
              <Link href={`/perfil/paciente/${pacienteId}`}>
                <Button
                  leftIcon={<BsPerson size={20} />}
                  mt={3}
                  mr={4}
                  bg="pink.600"
                  color="white"
                  size="lg"
                  _hover={{ bg: "pink.500" }}
                  isDisabled={!nomeSelecionado}
                >
                  Perfil
                </Button>
              </Link>

              <Link href={`/registros/paciente/${pacienteId}`}>
                <Button
                  leftIcon={<AiOutlineFileSearch size={20} />}
                  mt={3}
                  mr={4}
                  bg="pink.600"
                  color="white"
                  size="lg"
                  _hover={{ bg: "pink.500" }}
                  isDisabled={!nomeSelecionado}
                >
                  Registros
                </Button>
              </Link>
              <Link href={`/orientacao/fisioterapeuta/paciente/${pacienteId}`}>
                <Button
                  leftIcon={<FaRegBell size={20} />}
                  mt={3}
                  mr={4}
                  bg="pink.600"
                  color="white"
                  size="lg"
                  _hover={{ bg: "pink.500" }}
                  isDisabled={!nomeSelecionado}
                >
                  Orientações
                </Button>
              </Link>
            </Flex>
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
    const fisioterapeuta = await apiClient.get("/detalhes");

    if (response.data === null || fisioterapeuta.data === null) {
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
        fisioterapeuta: fisioterapeuta.data,
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
