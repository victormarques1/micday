import { useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import introImg from "../../../public/images/intro.svg";
import { Flex, Text, Center, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import Link from "next/link";

import { AuthContext } from '../../context/AuthContext'

import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Login() {
  const { logarUsuario } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  async function handleLogin(){
    if(email === '' || senha === ''){
      return;
    }
    
    try{
      await logarUsuario({
        email,
        senha,
      })  
      console.log()
    } 
    catch (err){
      console.log(err);
    }


  }

  return (
    <>
      <Head>
        <title> TCC - Faça login para acessar </title>
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
            placeholder="exemplo@email.com"
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
              variant={'filled'}
              placeholder="Digite sua senha"
              focusBorderColor="pink.400"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} 
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} >
                {show ? <ViewOffIcon boxSize={6} color="pink.300"/> : <ViewIcon boxSize={6} color="pink.300"/>}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Center mb={6} pr={2} justifyContent="end">
            <Link href="/">
              <Text
                cursor="pointer"
                color="pink.500"
                fontSize={16}
                fontWeight={"semibold"}
                _hover={{ color: "pink.400" }}
              >
                Esqueceu sua senha?
              </Text>
            </Link>
          </Center>

          <Button
            background="pink.500"
            color="#FFF"
            size="lg"
            borderRadius={24}
            mb={7}
            _hover={{ bg: "pink.400" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center>
            <Link href="/cadastro">
              <Text cursor="pointer">
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
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