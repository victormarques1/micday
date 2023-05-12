import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Logo from "../../../../public/images/Logo.svg";
import Bg from "../../../../public/images/bg.svg";

import {
  Flex,
  Center,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { HiOfficeBuilding, HiIdentification } from "react-icons/hi";

import { toast } from "react-toastify";
import Link from "next/link";

import { useRouter } from "next/router";

import { canSSRGuest } from "@/utils/canSSRGuest";
import { setupAPIClient } from "@/services/api";

export default function CadastroFisioterapeuta() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const router = useRouter();
  const usuario_id = router.query.id;

  const [atuacao, setAtuacao] = useState("");
  const [crefito, setCrefito] = useState("");

  async function handleCadastro() {
    if (atuacao === "" || crefito === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    if (crefito.length < 5) {
      toast.warning("Informe um código CREFITO válido!");
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/fisioterapeuta", {
        usuario_id: usuario_id,
        atuacao: atuacao,
        crefito: crefito,
      });

      toast.success("Cadastrado com sucesso!");
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar.");
    }
  }

  return (
    <>
      <Head>
        <title> Cadastro Fisioterapeuta | mic.day </title>
      </Head>
      <Flex direction={["column", "row"]} height="100vh">
        <Flex
          width={["100%", "65%"]}
          flexGrow="1"
          justifyContent="center"
          alignItems="center"
        >
          <Flex width={640} direction="column" p={14} rounded={8}>
            <Flex mb={5}>
              <Image src={Logo} quality={100} width={120} alt="Logo mic.day" />
            </Flex>

            <Text mb={4} fontSize={24} fontWeight="bold">
              Dados do Fisioterapeuta
            </Text>

            <InputGroup size="lg">
              <InputLeftElement
                children={
                  <Icon as={HiIdentification} color="gray.400" w={5} h={5} />
                }
              />
              <Input
                size="lg"
                placeholder="Código CREFITO"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.600"
                type="text"
                mb={3}
                value={crefito}
                onChange={(e) => setCrefito(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="lg">
              <InputLeftElement
                children={
                  <Icon as={HiOfficeBuilding} color="gray.400" w={5} h={5} />
                }
              />
              <Input
                size="lg"
                placeholder="Local de atuação"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.600"
                type="text"
                mb={4}
                value={atuacao}
                onChange={(e) => setAtuacao(e.target.value)}
              />
            </InputGroup>

            <Center justifyContent="center">
              <Text mb={6} fontSize={16}>
                Ao se registrar, você aceita nossos
                <Link href="/cadastro/fisioterapeuta" color="blue.500">
                  <strong style={{ color: "#B83280" }}> termos de uso </strong>
                </Link>
                e a
                <Link href="/cadastro/fisioterapeuta" color="blue.500">
                  <strong style={{ color: "#B83280" }}>
                    {" "}
                    nossa política de privacidade
                  </strong>
                </Link>
                .
              </Text>
            </Center>

            <Button
              onClick={handleCadastro}
              background="pink.600"
              color="#FFF"
              size="lg"
              borderRadius={24}
              mb={7}
              _hover={{ bg: "pink.500" }}
            >
              Completar cadastro
            </Button>
          </Flex>
        </Flex>
        <Flex
          bg="pink.700"
          style={{ filter: "saturate(180%)" }}
          width={["100%", "35%"]}
          height="100%"
          flexShrink="0"
          position="relative"
          display={isMobile ? "none" : "block"}
        >
          <Image
            src={Bg}
            quality={100}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="Background image"
          />
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
