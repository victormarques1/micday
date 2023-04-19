import { useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import introImg from "../../../public/images/intro.svg";
import {
  Flex,
  Stack,
  Text,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Radio,
  RadioGroup
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Link from "next/link";

import { AuthContext } from '../../context/AuthContext'

import { toast } from "react-toastify";

export default function Cadastro() {
  const { cadastrarUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [tipo, setTipo] = useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  async function handleCadastro(){
    if(nome === '' || email === '' || senha === '' || cpf === '' || tipo === ''){
      toast.error("Preencha todos os campos.")
      return;
    }

    await cadastrarUsuario({
      nome,
      email,
      senha,
      cpf,
      tipo
    })
  }

  return (
    <>
      <Head>
        <title> TCC - Crie sua conta </title>
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
            placeholder="Digite seu nome completo"
            focusBorderColor="pink.400"
            type="text"
            mb={3}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Digite seu email"
            focusBorderColor="pink.400"
            type="email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputGroup size="lg" mb={3}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              borderColor="pink.500"
              variant={"filled"}
              placeholder="Digite sua senha"
              focusBorderColor="pink.400"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? (
                  <ViewOffIcon boxSize={6} color="pink.300" />
                ) : (
                  <ViewIcon boxSize={6} color="pink.300" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Input
            borderColor="pink.500"
            variant={"filled"}
            size="lg"
            placeholder="Digite seu CPF (apenas números)"
            focusBorderColor="pink.400"
            type="number"
            mb={3}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          
          <RadioGroup size="lg" p={1} mb={3} value={tipo} onChange={setTipo}>
            <Stack spacing={6} direction="row" mb={3}>
              <Radio value="Paciente" colorScheme='pink' borderColor="pink.500">Paciente</Radio>
              <Radio value="Fisioterapeuta" colorScheme='pink' borderColor="pink.500">Fisioterapeuta</Radio>
            </Stack>
          </RadioGroup>

          <Button
            onClick={handleCadastro}
            background="pink.500"
            color="#FFF"
            size="lg"
            borderRadius={24}
            mb={7}
            _hover={{ bg: "pink.400" }}
          >
            Criar conta
          </Button>

          <Center>
            <Link href="/login">
              <Text cursor="pointer">
                Já possui conta? <strong>Faça login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

// export const getServerSideProps = canSSRGuest(async (ctx) => {
//   return{
//     props:{}
//   }
// })