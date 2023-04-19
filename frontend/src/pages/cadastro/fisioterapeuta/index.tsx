import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import introImg from "../../../../public/images/intro.svg";
import {
  Flex,
  Text,
  Center,
  Input,
  Button,
} from "@chakra-ui/react";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

import { canSSRGuest } from "@/utils/canSSRGuest";
import { setupAPIClient } from "@/services/api";

export default function CadastroFisioterapeuta() {
  
  const router = useRouter();
  const usuario_id = router.query.id;

  const [atuacao, setAtuacao] = useState("");
  const [crefito, setCrefito] = useState("");

  async function handleCadastro() {
    if( atuacao === '' || crefito === ''){
      toast.error("Preencha todos os campos")
      return;
    }

    try{
      const apiClient = setupAPIClient();
      await apiClient.post('/fisioterapeuta', {
        usuario_id: usuario_id,
        atuacao: atuacao,
        crefito: crefito,
      })

      toast.success("Cadastrado com sucesso!")
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
            placeholder="Informe o seu CREFITO"
            focusBorderColor="pink.400"
            type="text"
            mb={3}
            value={crefito}
            onChange={(e) => setCrefito(e.target.value)}
          />

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Informe o seu local de atuação"
            focusBorderColor="pink.400"
            type="email"
            mb={6}
            value={atuacao}
            onChange={(e) => setAtuacao(e.target.value)}
          />

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
  return{
    props:{}
  }
})
