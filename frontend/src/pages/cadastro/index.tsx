import { useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import Logo from "../../../public/images/Logo.svg";
import {
  Flex,
  Stack,
  Text,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";

import { Icon } from "@chakra-ui/react";
import { HiUser, HiClipboardList } from "react-icons/hi";

import Link from "next/link";

import { AuthContext } from "../../context/AuthContext";

import { toast } from "react-toastify";

export default function Cadastro() {
  const { cadastrarUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [tipo, setTipo] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  async function handleCadastro() {
    if (
      nome === "" ||
      email === "" ||
      senha === "" ||
      cpf === "" ||
      tipo === ""
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if(senha.length < 6){
      toast.warning("Sua senha precisar ter no mínimo 6 dígitos!")
      return;
    }

    if(cpf.length != 11){
      toast.warning("CPF Inválido! Informe apenas os 11 números.")
      return;
    }

    await cadastrarUsuario({
      nome,
      email,
      senha,
      cpf,
      tipo,
    });
  }

  return (
    <>
      <Head>
        <title> Cadastro | mic.day </title>
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
              Criar uma conta
            </Text>

            <InputGroup size="lg">
              <InputLeftElement
                children={<Icon as={HiUser} color="gray.400" w={5} h={5} />}
              />
              <Input
                size="lg"
                placeholder="Nome completo"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.500"
                type="text"
                mb={3}
                isRequired
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="lg">
              <InputLeftElement children={<EmailIcon color="gray.400" />} />
              <Input
                variant={"outline"}
                size="lg"
                placeholder="E-mail"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.500"
                type="email"
                mb={3}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="lg" mb={3}>
              <InputLeftElement children={<LockIcon color="gray.400" />} />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                variant={"outline"}
                placeholder="Senha"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.500"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  bg="transparent"
                  size="sm"
                  onClick={handleClick}
                  _hover={{ bg: "transparent" }}
                >
                  {show ? (
                    <ViewOffIcon
                      boxSize={6}
                      bg=""
                      color="pink.600"
                      _hover={{ bg: "transparent" }}
                    />
                  ) : (
                    <ViewIcon
                      boxSize={6}
                      bg="transparent"
                      color="pink.600"
                      _hover={{ bg: "transparent" }}
                    />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>

            <InputGroup size="lg">
              <InputLeftElement
                children={
                  <Icon as={HiClipboardList} color="gray.400" w={5} h={5} />
                }
              />
              <Input
                size="lg"
                placeholder="CPF (apenas números)"
                _placeholder={{ color: "gray.400" }}
                focusBorderColor="pink.500"
                type="number"
                mb={3}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </InputGroup>

            <RadioGroup size="lg" p={1} mb={3} value={tipo} onChange={setTipo}>
              <Stack spacing={6} direction="row" mb={3}>
                <Radio
                  value="Paciente"
                  colorScheme="pink"
                  borderColor="pink.600"
                >
                  Paciente
                </Radio>
                <Radio
                  value="Fisioterapeuta"
                  colorScheme="pink"
                  borderColor="pink.600"
                >
                  Fisioterapeuta
                </Radio>
              </Stack>
            </RadioGroup>

            <Button
              onClick={handleCadastro}
              background="pink.600"
              color="#FFF"
              size="lg"
              borderRadius={24}
              mb={7}
              _hover={{ bg: "pink.500" }}
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

        <Flex bg="pink.700" width={["100%", "35%"]} flexShrink="0">
          
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
