import { useContext, useState } from "react";

import Head from "next/head";

import {
  Flex,
  Text,
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
import { CgLogOut } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { AuthContext } from "@/context/AuthContext";
import { setupAPIClient } from "@/services/api";

import { toast } from "react-toastify";

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
  const { deslogarUsuario } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [nome, setNome] = useState(usuario && usuario?.nome);
  const [cpf, setCpf] = useState(usuario && usuario?.cpf);
  const [idade, setIdade] = useState(paciente && paciente?.idade);
  const [altura, setAltura] = useState(paciente && paciente?.altura);
  const [peso, setPeso] = useState(paciente && paciente?.peso);
  const [etnia, setEtnia] = useState(paciente && paciente?.etnia);

  async function handleLogout() {
    await deslogarUsuario();
  }

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
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent={"flex-start"}
          px={4}
        >
          <Flex
            w="100%"
            direction={"row"}
            alignItems="flex-start"
            justifyContent={"flex-start"}
          >
            <Heading fontSize={"3xl"} mt={4} mb={5} mr={4} color="pink.700">
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            pt={8}
            pb={8}
            shadow="md"
            bg="pink.50"
            borderBottomColor="pink.700"
            borderBottomWidth={2}
            fontSize="lg"
            w="100%"
            maxW="1100px"
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
                Nome do paciente:{" "}
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<Icon as={HiUser} color="pink.600" w={5} h={5} />}
                />
                <Input
                  w="100%"
                  placeholder="Nome do paciente"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.600" }}
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
                CPF:{" "}
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    <Icon as={HiClipboardList} color="pink.600" w={5} h={5} />
                  }
                />
                <Input
                  w="100%"
                  placeholder="CPF do paciente"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.600" }}
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
                Idade:{" "}
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    <Icon as={HiIdentification} color="pink.600" w={5} h={5} />
                  }
                />
                <Input
                  w="100%"
                  placeholder="Idade do paciente"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.600" }}
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
                Altura (metros):{" "}
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<Icon as={GiBodyHeight} color="pink.600" />}
                />
                <Input
                  w="100%"
                  placeholder="Altura do paciente"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.600" }}
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
                  children={<Icon as={BiBody} color="pink.600" w={5} h={5} />}
                />
                <Input
                  w="100%"
                  placeholder="Peso do paciente"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.600" }}
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
                borderColor={"pink.700"}
                _hover={{ borderColor: "pink.700" }}
                size="lg"
                type="text"
                mb={3}
                value={etnia}
                onChange={(e) => setEtnia(e.target.value)}
                isReadOnly={true}
              />

              <Button
                w="100%"
                mt={3}
                mb={3}
                bg="pink.600"
                color="white"
                size="lg"
                leftIcon={<AiOutlineEdit size={22} />}
                _hover={{ bg: "pink.500" }}
                onClick={handleEditarUsuario}
              >
                Salvar dados
              </Button>

              <Button
                w="100%"
                mb={4}
                bg="gray.50"
                borderColor={"pink.600"}
                borderWidth={1}
                color="pink.500"
                leftIcon={<CgLogOut size={22} />}
                size="lg"
                _hover={{ bg: "white" }}
                onClick={handleLogout}
              >
                Sair da conta
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
