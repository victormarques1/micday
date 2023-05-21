import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Text, Input, Button, useToast, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Logo from "../../../public/images/Logo.svg";
import { setupAPIClient } from "@/services/api";

const RedefinirSenha = () => {
  const router = useRouter();
  const toast = useToast();
  const { token } = router.query;
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRedefinirSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não correspondem",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/nova-senha", {
        token,
        novaSenha,
      });

      toast({
        title: "Senha alterada",
        description: "Sua senha foi redefinida com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/login");
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao redefinir a senha",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Redefinir senha | mic.day</title>
      </Head>

      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex mb={8} justifyContent="center">
          <Image src={Logo} width={180} alt="Logo mic.day" />
        </Flex>
        <Text mb={6} fontSize={28} fontWeight="bold">
          Redefinir senha
        </Text>
        <Input
          variant={"outline"}
          _placeholder={{ color: "gray.400" }}
          focusBorderColor="pink.500"
          type="password"
          placeholder="Nova Senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          mb={4}
        />
        <Input
          variant={"outline"}
          _placeholder={{ color: "gray.400" }}
          focusBorderColor="pink.500"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          mb={8}
        />
        <Button onClick={handleRedefinirSenha} colorScheme="pink">
          Redefinir Senha
        </Button>
      </Box>
    </>
  );
};

export default RedefinirSenha;
