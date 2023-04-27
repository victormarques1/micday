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
} from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

interface UrinaRequest {
  data: string;
}

interface UrinaProps {
  urina: UrinaRequest;
}

export default function Urina() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  // const [data, setData] = useState(urina && urina?.data)
  const [quantidade, setQuantidade] = useState("");
  const [necessidade, setNecessidade] = useState<boolean>(false);
  const [perda, setPerda] = useState<boolean>(false);

  async function handleUrina() {
    if (quantidade === "") {
      toast.warning("Informe a quantidade em ml. Ex: 250");
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/urina", {
        quantidade: Number(quantidade),
        perda_urina: perda,
        necessidade_urina: necessidade,
      });

      toast.success("Registro de urina criado com sucesso.");
    } catch (err) {
      console.log("Dados: ", quantidade, perda, necessidade);
      console.log(err.response.data);
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
                borderColor="pink.600"
                _hover={{bg: "pink.50"}}
              >
                <FiChevronLeft size={24} color="#B83280" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="pink.600"
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
            justify="center"
            mt={4}
            pt={8}
            pb={8}
            direction="column"
            bg="pink.50"
            borderWidth={2}
            borderColor="pink.600"
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} mb={4}>
              Registrar urina
            </Heading>

            {/* <Input
              placeholder="Data"
              size="lg"
              type="datetime-local"
              w="85%"
              mb={4}
              value={data}
              onChange={(e) => setData(e.target.value)}
            /> */}
            <Input
              placeholder="Quantidade (ml)"
              size="lg"
              type="number"
              focusBorderColor="pink.700"
              borderColor={"pink.700"}
              _hover={{ borderColor: "pink.700" }}
              w="85%"
              mb={6}
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <Flex flexDirection="column" alignItems="flex-start">
              <Checkbox
                colorScheme="pink"
                size="lg"
                mb={4}
                borderColor="pink.600"
                isChecked={necessidade}
                onChange={(e) => setNecessidade(e.target.checked)}
              >
                Necessidade urgente de urinar?
              </Checkbox>
              <Checkbox
                colorScheme="pink"
                size="lg"
                borderColor="pink.600"
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
              _hover={{bg: "pink.500"}}
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

// export const getServerSideProps = canSSRAuth("Paciente", async(ctx) => {
//   try{
//     const apiClient = setupAPIClient(ctx);

//     const response = await apiClient.get("/urina/detalhes");

//     const data = {
//       data: response.data["urina"]["data"],
//     }

//     return {
//       props:{
//         data: data
//       }
//     }

//   } catch(err){
//     console.log(err);

//     return{
//       redirect:{
//         destination: '/dashboard/paciente',
//         permanent:false,
//       }
//     }
//   }
// })
