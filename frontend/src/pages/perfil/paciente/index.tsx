import { useContext, useState } from "react";

import Head from "next/head";

import {
  Flex,
  Text,
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from "@chakra-ui/react";

import { SidebarPaciente } from "@/components/sidebar/paciente";

import { Icon } from "@chakra-ui/react";
import { HiUser, HiClipboardList, HiIdentification } from "react-icons/hi";
import { GiBodyHeight } from "react-icons/gi";
import { BiBody } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import { toast } from "react-toastify";
import Link from "next/link";

interface UsuarioProps {
  id: string;
  nome: string;
  cpf: string;
}

interface PacienteProps {
  idade: string;
  altura: string;
  peso: string;
  etnia: string;
}

interface PerfilProps {
  usuario: UsuarioProps;
  paciente: PacienteProps;
}

export default function PerfilPaciente({ usuario, paciente }: PerfilProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [nome, setNome] = useState(usuario && usuario?.nome);
  const [cpf, setCpf] = useState(usuario && usuario?.cpf);
  const cpfFormatado = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );

  const [idade, setIdade] = useState(paciente && paciente?.idade);
  const [altura, setAltura] = useState(paciente && paciente?.altura);
  const [peso, setPeso] = useState(paciente && paciente?.peso);
  const [etnia, setEtnia] = useState(paciente && paciente?.etnia);

  async function handleEditarUsuario() {
    if (
      nome === "" ||
      cpf === "" ||
      idade === "" ||
      altura === "" ||
      peso === ""
    ) {
      toast.error("Dados incompletos.");
      return;
    }

    if (cpf.length != 11) {
      toast.warning("CPF Inválido! Informe apenas os 11 números.");
      return;
    }

    if (+idade > 110) {
      toast.warning("Informe uma idade válida.");
      return;
    }

    if (+altura > 2.3) {
      toast.warning("Informe uma altura válida. Exemplo: 1.65");
      return;
    }

    if (+peso < 10 || +peso > 180) {
      toast.warning("Informe um peso válido em kg. Exemplo: 75.5");
      return;
    }

    try {
      const apiClient = setupAPIClient();

      await apiClient.put("/usuario", {
        nome: nome,
        cpf: cpf,
      });

      await apiClient.put("/paciente", {
        altura: Number(altura),
        peso: Number(peso),
        idade: Number(idade),
        etnia: etnia,
      });

      console.log(altura, peso, idade);
      toast.success("Perfil atualizado sucesso!");
    } catch (err) {
      toast.error("Erro ao editar perfil");
    }
  }

  return (
    <>
      <Head>
        <title>Minha Conta | mic.day</title>
      </Head>
      <SidebarPaciente>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Flex
            w="100%"
            maxW="1100"
            direction={"row"}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w="85%"
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              mt={4}
            >
              <Link href="/dashboard/paciente">
                <Button
                  display="flex"
                  alignItems="center"
                  justifyItems="center"
                  mr={4}
                  mb={isMobile ? 4 : 0}
                  bg="pink.50"
                  borderColor="pink.700"
                  _hover={{ bg: "pink.50" }}
                >
                  <FiChevronLeft size={24} color="#B83280" />
                  Voltar
                </Button>
              </Link>
              <Heading fontSize={"3xl"} color="pink.700">
                Configurações do Perfil
              </Heading>
            </Box>
          </Flex>

          <Flex
            pt={isMobile ? 6 : 8}
            pb={8}
            fontSize="lg"
            w="100%"
            maxW="1100"
            direction={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Flex direction={"column"} w={"85%"}>
              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                Nome completo
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<Icon as={HiUser} color="gray.400" w={5} h={5} />}
                />
                <Input
                  w="100%"
                  placeholder="Nome do paciente"
                  focusBorderColor="pink.700"
                  size="lg"
                  type="text"
                  mb={3}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </InputGroup>

              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                CPF
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    <Icon as={HiClipboardList} color="gray.400" w={5} h={5} />
                  }
                />
                <Input
                  w="100%"
                  placeholder="CPF do paciente"
                  focusBorderColor="pink.700"
                  size="lg"
                  type="number"
                  mb={3}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </InputGroup>

              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                Idade
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    <Icon as={HiIdentification} color="gray.400" w={5} h={5} />
                  }
                />
                <Input
                  w="100%"
                  placeholder="Idade do paciente"
                  focusBorderColor="pink.700"
                  size="lg"
                  type="number"
                  mb={3}
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </InputGroup>

              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                Altura (m)
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<Icon as={GiBodyHeight} color="gray.400" />}
                />
                <Input
                  w="100%"
                  placeholder="Altura do paciente"
                  focusBorderColor="pink.700"
                  size="lg"
                  type="number"
                  mb={3}
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </InputGroup>

              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                Peso (kg):{" "}
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<Icon as={BiBody} color="gray.400" w={5} h={5} />}
                />
                <Input
                  w="100%"
                  placeholder="Peso do paciente"
                  focusBorderColor="pink.700"
                  size="lg"
                  type="number"
                  mb={3}
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </InputGroup>

              <Text
                mb={2}
                fontSize={isMobile ? "lg" : "xl"}
                fontWeight="medium"
              >
                Etnia:{" "}
              </Text>
              <Input
                w="100%"
                placeholder="Etnia do paciente"
                focusBorderColor="pink.700"
                size="lg"
                type="text"
                mb={3}
                value={etnia}
                onChange={(e) => setEtnia(e.target.value)}
                isReadOnly={true}
              />

              <Button
                w="25%"
                mt={4}
                mb={3}
                bg="pink.600"
                color="white"
                size="lg"
                _hover={{ bg: "pink.500" }}
                onClick={handleEditarUsuario}
                mr={4}
              >
                Salvar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </SidebarPaciente>
    </>
  );
}

export const getServerSideProps = canSSRAuth("Paciente", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const usuarioResponse = await apiClient.get("/detalhes");

    const usuario = {
      id: usuarioResponse.data["usuario"]["id"],
      nome: usuarioResponse.data["usuario"]["nome"],
      cpf: usuarioResponse.data["usuario"]["cpf"],
    };

    const response = await apiClient.get("/paciente/detalhes");

    const paciente = {
      id: response.data["paciente"]["id"],
      idade: response.data["paciente"]["idade"],
      altura: response.data["paciente"]["altura"],
      peso: response.data["paciente"]["peso"],
      etnia: response.data["paciente"]["etnia"],
    };

    return {
      props: {
        usuario: usuario,
        paciente: paciente,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/dashboard/paciente",
        permanent: false,
      },
    };
  }
});
