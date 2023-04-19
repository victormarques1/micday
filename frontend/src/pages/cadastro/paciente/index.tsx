import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import introImg from "../../../../public/images/intro.svg";
import { Flex, Text, Center, Input, Button, Select } from "@chakra-ui/react";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

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
  const [fisioterapeutaSelecionado, setFisioterapeutaSelecionado] = useState("");

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
    if( idade === '' || altura === '' || peso === '' || etnia === '' || tipoSelecionado === '' || fisioterapeutaSelecionado === ''){
      toast.error("Preencha todos os campos.")
      return;
    }
    
    try{
      const apiClient = setupAPIClient();
      await apiClient.post('/paciente', {
        idade: Number(idade),
        altura: altura,
        peso: peso,
        etnia: etnia,
        usuario_id: usuario_id,
        fisioterapeuta_id: fisioterapeutaSelecionado,
        tipo_id: tipoSelecionado
      })

      toast.success("Cadastrado com sucesso!!")
      router.push('/login')

    }
    catch(err){
      console.log(err);
      toast.error("Erro ao cadastrar.")
    }
  }

  return (
    <>
      <Head>
        <title> Cadastro de Pacientes </title>
      </Head>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4} mb={4}>
            <Image
              src={introImg}
              quality={100}
              width={260}
              objectFit="fill"
              alt="Imagem introdução"
            />
          </Center>

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Informe sua idade"
            focusBorderColor="pink.400"
            type="text"
            mb={3}
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Informe sua altura (cm)"
            focusBorderColor="pink.400"
            type="email"
            mb={3}
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Informe seu peso (kg)"
            focusBorderColor="pink.400"
            type="email"
            mb={3}
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />

          <Select
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            focusBorderColor="pink.400"
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
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            focusBorderColor="pink.400"
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
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            focusBorderColor="pink.400"
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

          <Button
            onClick={handleCadastro}
            background="pink.500"
            color="#FFF"
            size="lg"
            borderRadius={24}
            mb={7}
            _hover={{ bg: "pink.400" }}
          >
            Completar cadastro
          </Button>

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
