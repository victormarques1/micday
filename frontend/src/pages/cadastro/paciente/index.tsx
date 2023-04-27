import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Logo from "../../../../public/images/logo.svg";
import {
  Flex,
  Text,
  Center,
  Input,
  Button,
  Select,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { HiIdentification } from "react-icons/hi";
import { GiBodyHeight } from "react-icons/gi";
import { BiBody } from "react-icons/bi";

import { toast } from "react-toastify";

import { useRouter } from "next/router";
import Link from "next/link";

import { canSSRGuest } from "@/utils/canSSRGuest";
import { setupAPIClient } from "@/services/api";

export default function CadastroPaciente() {
  const router = useRouter();
  const usuario_id = router.query.id;

  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [etnia, setEtnia] = useState("");
  const [tiposIncontinencia, setTipoIncontinencia] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [fisioterapeutas, setFisioterapeutas] = useState([]);
  const [fisioterapeutaSelecionado, setFisioterapeutaSelecionado] =
    useState("");

  useEffect(() => {
    async function fetchTipos() {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/tipos");
      setTipoIncontinencia(response.data);
    }
    fetchTipos();
  }, []);

  useEffect(() => {
    async function fetchFisioterapeutas() {
      const apiClient = setupAPIClient();
      const response = await apiClient.get("/fisioterapeutas");
      setFisioterapeutas(response.data);
    }
    fetchFisioterapeutas();
  }, []);

  async function handleCadastro() {
    if (
      idade === "" ||
      altura === "" ||
      peso === "" ||
      etnia === "" ||
      tipoSelecionado === "" ||
      fisioterapeutaSelecionado === ""
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if(+idade > 110 ){
      toast.warning("Informe uma idade válida.")
      return;
    }

    if(+altura > 2.3){
      toast.warning("Informe uma altura válida. Exemplo: 1.65")
      return;
    }

    if(+peso < 10 || +peso > 180){
      toast.warning("Informe um peso válido em kg. Exemplo: 75.5")
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/paciente", {
        idade: Number(idade),
        altura: Number(altura),
        peso: Number(peso),
        etnia: etnia,
        usuario_id: usuario_id,
        fisioterapeuta_id: fisioterapeutaSelecionado,
        tipo_id: tipoSelecionado,
      });

      toast.success("Cadastrado com sucesso!!");
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar.");
    }
  }

  return (
    <>
      <Head>
        <title> Cadastro Paciente | mic.day </title>
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
              Dados do Paciente
            </Text>

            <InputGroup size="lg">
              <InputLeftElement
                children={
                  <Icon as={HiIdentification} color="gray.400" w={5} h={5} />
                }
              />
              <Input
                size="lg"
                placeholder="Idade"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.600"
                type="number"
                mb={3}
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="lg">
              <InputLeftElement
                children={<Icon as={GiBodyHeight} color="gray.400" />}
              />
              <Input
                size="lg"
                placeholder="Altura (m)"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.600"
                type="number"
                mb={3}
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="lg">
              <InputLeftElement
                children={<Icon as={BiBody} color="gray.400" w={5} h={5} />}
              />
              <Input
                size="lg"
                placeholder="Peso (kg)"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.600"
                type="number"
                mb={3}
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
            </InputGroup>

            <Select
              size="lg"
              focusBorderColor="pink.600"
              placeholder="Etnia"
              mb={3}
              value={etnia}
              onChange={(e) => setEtnia(e.target.value)}
            >
              <option value="Branca">Branca</option>
              <option value="Preta">Preta</option>
              <option value="Parda">Parda</option>
            </Select>

            <Select
              size="lg"
              focusBorderColor="pink.600"
              placeholder="Tipo de incontinência urinária"
              mb={3}
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              {tiposIncontinencia.map((tipoIncontinencia) => (
                <option key={tipoIncontinencia.id} value={tipoIncontinencia.id}>
                  {tipoIncontinencia.nome}
                </option>
              ))}
            </Select>

            <Select
              size="lg"
              focusBorderColor="pink.600"
              placeholder="Fisioterapeuta Responsável"
              mb={6}
              value={fisioterapeutaSelecionado}
              onChange={(e) => setFisioterapeutaSelecionado(e.target.value)}
            >
              {fisioterapeutas.map((fisioterapeuta) => (
                <option key={fisioterapeuta.id} value={fisioterapeuta.id}>
                  {fisioterapeuta.usuario.nome}
                </option>
              ))}
            </Select>

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

        <Flex bg="pink.700" width={["100%", "35%"]} flexShrink="0">
          
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
