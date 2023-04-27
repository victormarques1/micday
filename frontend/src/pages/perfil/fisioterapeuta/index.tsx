import { useContext, useState } from "react";

import Head from "next/head";

import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";

import { SidebarPaciente } from "@/components/sidebar/paciente";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { AuthContext } from "@/context/AuthContext";
import { setupAPIClient } from "@/services/api";

import { toast } from "react-toastify";

interface UsuarioProps {
  id: string;
  nome: string;
  cpf: string;
}

interface FisioterapeutaProps {
  id: string;
  crefito: string;
  atuacao: string;
}

interface PerfilProps {
  fisioterapeuta: FisioterapeutaProps;
  usuario: UsuarioProps;
}

export default function PerfilFisioterapeuta({
  usuario,
  fisioterapeuta,
}: PerfilProps) {
  const { deslogarUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState(usuario && usuario?.nome);
  const [cpf, setCpf] = useState(usuario && usuario?.cpf);
  const [crefito, setCrefito] = useState(
    fisioterapeuta && fisioterapeuta?.crefito
  );
  const [atuacao, setAtuacao] = useState(
    fisioterapeuta && fisioterapeuta?.atuacao
  );

  async function handleLogout() {
    await deslogarUsuario();
  }

  async function handleEditarUsuario() {
    if (
      nome === "" ||
      cpf === "" ||
      crefito === "" ||
      atuacao === "" 
    ) {
      toast.error("Dados incompletos.");
      return;
    }

    if(cpf.length != 11){
      toast.warning("CPF Inválido! Informe apenas os 11 números.")
      return;
    }

    if(crefito.length < 5){
      toast.warning("Informe um código CREFITO válido!")
      return;
    }

    try {
      const apiClient = setupAPIClient();

      await apiClient.put("/usuario", {
        nome: nome,
        cpf: cpf,
      });

      await apiClient.put("/fisioterapeuta", {
        crefito: crefito, 
        atuacao: atuacao
      });

      toast.success("Perfil atualizado sucesso!");
    } catch (err) {
      console.log(err)
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
            <Heading fontSize={"3xl"} mt={4} mb={5} mr={4} color="pink.600">
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            pt={8}
            pb={8}
            bg="pink.50"
            borderWidth={"2px"}
            borderColor="pink.600"
            borderRadius={4}
            w="100%"
            maxW="700px"
            direction={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Flex direction={"column"} w={"85%"}>
              <Text mb={2} fontSize="xl" fontWeight={"bold"}>
                Nome do Fisioterapeuta:{" "}
              </Text>
              <Input
                w="100%"
                placeholder="Nome do Fisioterapeuta"
                focusBorderColor="pink.700"
                borderColor={"pink.700"}
                _hover={{ borderColor: "pink.600" }}
                size="lg"
                type="text"
                mb={3}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight={"bold"}>
                CPF:{" "}
              </Text>
              <Input
                w="100%"
                placeholder="CPF do Fisioterapeuta"
                focusBorderColor="pink.700"
                borderColor={"pink.700"}
                _hover={{ borderColor: "pink.600" }}
                size="lg"
                type="number"
                mb={3}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight={"bold"}>
                Crefito:{" "}
              </Text>
              <Input
                w="100%"
                placeholder="Crefito do Fisioterapeuta"
                focusBorderColor="pink.700"
                borderColor={"pink.700"}
                _hover={{ borderColor: "pink.600" }}
                size="lg"
                type="text"
                mb={3}
                value={crefito}
                onChange={(e) => setCrefito(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight={"bold"}>
                Local de atuação:{" "}
              </Text>
              <Input
                w="100%"
                placeholder="Local de atuação do Fisioterapeuta"
                focusBorderColor="pink.700"
                borderColor={"pink.700"}
                _hover={{ borderColor: "pink.600" }}
                size="lg"
                type="text"
                mb={3}
                value={atuacao}
                onChange={(e) => setAtuacao(e.target.value)}
              />

              <Button
                w="100%"
                mt={3}
                mb={3}
                bg="pink.600"
                color="white"
                size="lg"
                _hover={{ bg: "pink.500" }}
                onClick={handleEditarUsuario}
              >
                Salvar
              </Button>

              <Button
                w="100%"
                mb={4}
                bg="blackAlpha.400"
                borderColor={"pink.600"}
                borderWidth={1}
                color="pink.600"
                size="lg"
                _hover={{ bg: "blackAlpha.300" }}
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

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const usuarioResponse = await apiClient.get("/detalhes");

    const usuario = {
      id: usuarioResponse.data["usuario"]["id"],
      nome: usuarioResponse.data["usuario"]["nome"],
      cpf: usuarioResponse.data["usuario"]["cpf"],
    };

    const response = await apiClient.get("/fisioterapeuta/detalhes");

    const fisioterapeuta = {
      id: response.data["fisioterapeuta"]["id"],
      crefito: response.data["fisioterapeuta"]["crefito"],
      atuacao: response.data["fisioterapeuta"]["atuacao"],
    };

    return {
      props: {
        usuario: usuario,
        fisioterapeuta: fisioterapeuta,
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
