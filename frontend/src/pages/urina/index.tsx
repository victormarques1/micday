import { useState } from "react";
import Head from "next/head";
import { SidebarPaciente } from "../../components/sidebar/paciente";

import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Checkbox,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { BsDropletHalf } from "react-icons/bs";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Router from "next/router";
import moment from "moment-timezone";

export default function Urina() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [data, setData] = useState(
    moment().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm")
  );
  const [quantidade, setQuantidade] = useState("");
  const [necessidade, setNecessidade] = useState<boolean>(false);
  const [perda, setPerda] = useState<boolean>(false);

  async function handleUrina() {
    if (quantidade === "") {
      toast.warning("Dados inválidos!");
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/urina", {
        quantidade: Number(quantidade),
        data: new Date(data),
        perda_urina: perda,
        necessidade_urina: necessidade,
      });

      toast.success("Registrado com sucesso!");
      Router.push("/dashboard/paciente")

    } catch (err) {
      toast.error("Erro ao registrar urina.");
    }
  }

  return (
    <>
      <Head>
        <title>Registro de Urina | mic.day</title>
      </Head>
      <SidebarPaciente>
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
              Registro de Urina
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
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
            <Flex justifyContent="flex-start" w="85%">
              <Text fontSize="lg" mb={1}>
                Data / Hora
              </Text>
            </Flex>
            <Input
              placeholder="Data e Hora"
              size="lg"
              type="datetime-local"
              focusBorderColor="pink.700"
              borderColor={"pink.700"}
              _hover={{ borderColor: "pink.700" }}
              w="85%"
              mb={4}
              defaultValue={data}
              onChange={(e) => setData(e.target.value)}
            />

            <Flex justifyContent="flex-start" w="85%">
              <Text fontSize="lg" mb={1}>
                Quantidade (ml)
              </Text>
            </Flex>
            <Flex
              align="center"
              justifyContent="center"
              w="85%"
              flex-direction="column"
            >
              <InputGroup size="lg">
                <InputLeftElement
                  children={
                    <Icon as={BsDropletHalf} color="pink.700" w={5} h={5} />
                  }
                />
                <Input
                  placeholder="Ex: 325"
                  type="number"
                  focusBorderColor="pink.700"
                  borderColor={"pink.700"}
                  _hover={{ borderColor: "pink.700" }}
                  w="100%"
                  mb={6}
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </InputGroup>
            </Flex>

            <Flex flexDirection="column" alignItems="flex-start">
              <Checkbox
                colorScheme="pink"
                size="lg"
                mb={4}
                borderColor="pink.700"
                isChecked={necessidade}
                onChange={(e) => setNecessidade(e.target.checked)}
              >
                Necessidade urgente de urinar?
              </Checkbox>
              <Checkbox
                colorScheme="pink"
                size="lg"
                borderColor="pink.700"
                mb={6}
                isChecked={perda}
                onChange={(e) => setPerda(e.target.checked)}
              >
                Houve perda de urina?
              </Checkbox>
            </Flex>

            <Button
              w="85%"
              size="lg"
              bg="pink.600"
              _hover={{ bg: "pink.500" }}
              color="#FFF"
              mb={2}
              onClick={handleUrina}
            >
              Salvar
            </Button>
          </Flex>
        </Flex>
      </SidebarPaciente>
    </>
  );
}

export const getServerSideProps = canSSRAuth("Paciente", async (ctx) => {
  return {
    props: {},
  };
});
