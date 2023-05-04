import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { Flex, Text, Box, Heading, useMediaQuery,Button } from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { SidebarPaciente } from "../../../components/sidebar/paciente";

import { MdOutlineWaterDrop, MdWaterDrop } from "react-icons/md";
import { setupAPIClient } from "@/services/api";

import { format } from "date-fns";

interface UrinasItem {
  id: string;
  data: Date;
  perda_urina: boolean;
  quantidade: number;
  necessidade_urina: boolean;
  paciente_id: string;
  tipoList: "urina";
}

interface BebidasItem {
  id: string;
  data: Date;
  tipo: string;
  quantidade: number;
  tipoList: "bebida";
}

interface PacienteProps {
  urinas: UrinasItem[];
  bebidas: BebidasItem[];
}

export default function DashboardPaciente({ urinas, bebidas }: PacienteProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [urinasList, setUrinasList] = useState<UrinasItem[]>(urinas || []);
  const [bebidasList, setBebidasList] = useState<BebidasItem[]>(bebidas || []);

  const registros = [
    ...urinasList.map((urina) => ({ ...urina, tipoList: "urina" })),
    ...bebidasList.map((bebida) => ({ ...bebida, tipoList: "bebida" })),
  ];
  registros.sort(
    (a, b) =>
      (new Date(b.data).getTime() || 0) - (new Date(a.data).getTime() || 0)
  );

    const [filtro, setFiltro] = useState("todos");
  
    const filtrarRegistros = (tipoList) => {
      setFiltro(tipoList);
    };
  
    const registrosFiltrados =
      filtro === "todos"
        ? registros
        : registros.filter((registro) => registro.tipoList === filtro);

  return (
    <>
      <Head>
        <title>Página Inicial | mic.day </title>
      </Head>
      <SidebarPaciente>

      <Box p={4}>
      <Heading as="h1" mb={4}>
        Meus Registros
      </Heading>

      <Flex mb={4}>
        <Button
          mr={2}
          colorScheme={filtro === "todos" ? "pink" : "gray"}
          onClick={() => filtrarRegistros("todos")}
        >
          Todos
        </Button>
        <Button
          mr={2}
          colorScheme={filtro === "urina" ? "pink" : "gray"}
          onClick={() => filtrarRegistros("urina")}
        >
          Urina
        </Button>
        <Button
          colorScheme={filtro === "bebida" ? "pink" : "gray"}
          onClick={() => filtrarRegistros("bebida")}
        >
          Bebida
        </Button>
      </Flex>

      {registrosFiltrados.length > 0 ? (
        registrosFiltrados.map((registro) => (
          <Box
            key={registro.id}
            bg="pink.50"
            borderBottomWidth={2}
            borderBottomColor="pink.700"
            mb={4}
            p={4}
          >
            <Flex alignItems="center" mb={2}>
              {registro.tipoList === "urina" ? (
                <Box as={MdOutlineWaterDrop} size={24} color="#97266D" mr={2} />
              ) : (
                <Box as={MdWaterDrop} size={24} color="#97266D" mr={2} />
              )}
              <Text fontWeight="semibold">
                {registro.tipoList === "urina" ? "Urina" : "Bebida"}
              </Text>
            </Flex>
            <Text>
              Quantidade: {registro.quantidade} ml | Data:{" "}
              {format(new Date(registro.data), "dd/MM/yyyy HH:mm")}
            </Text>
          </Box>
        ))
      ) : (
        <Text>Nenhum registro encontrado.</Text>
      )}
    </Box>
        {/* <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              fontSize="2xl"
              mt={4}
              mb={6}
              mr={4}
              color="pink.700"
              pb={2}
              w="100%"
              borderBottomWidth={1}
              borderBottomColor="pink.50"
            >
              Registros de Urina
            </Heading>
          </Flex>

          {registros.map((registro) => (
            <Box w="full" key={registro.id}>
              <Link
                key={registro.id}
                href={`/${registro.tipoList}/${registro.id}`}
              >
                <Flex
                  key={registro.id}
                  cursor="pointer"
                  w="100%"
                  paddingX={3}
                  paddingY={isMobile ? 6 : 8}
                  mb={2}
                  justifyContent="space-between"
                  direction="row"
                  bg="pink.50"
                  borderBottomWidth={2}
                  borderBottomColor="pink.700"
                >
                  {registro.tipoList === "urina" ? (
                    <MdOutlineWaterDrop size={24} color="#97266D" />
                    
                  ) : (
                    <MdWaterDrop size={24} color="#97266D" />
                  )}
                  <Text ml={2} fontWeight="semibold">
                    {registro.tipoList === "urina" ? "Urina" : "Bebida"}
                  </Text>
                  <Text fontWeight="semibold">{registro.quantidade} ml</Text>
                  <Text fontWeight="semibold">
                    {format(new Date(registro.data), "dd/MM/yyyy HH:mm")}
                  </Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex> */}
      </SidebarPaciente>
    </>
  );
}


export const getServerSideProps = canSSRAuth("Paciente", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/urina/detalhes");
    const bebidasResponse = await apiClient.get("/bebida/detalhes");

    if (response.data === null || bebidasResponse.data === null) {
      return {
        redirect: {
          destination: "/dashboard/paciente",
          permanent: false,
        },
      };
    }
    return {
      props: {
        urinas: response.data,
        bebidas: bebidasResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/dashboard/paciente",
        permanent: false,
      },
    };
  }
});
