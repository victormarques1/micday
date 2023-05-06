import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  useMediaQuery,
  Button,
  Select,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { SidebarFisioterapeuta } from "../../../components/sidebar/fisioterapeuta";
import { BsPerson } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import Link from "next/link";
import { ModalPaciente } from "@/components/modal/paciente";

interface PacienteItem {
  id: string;
  idade: number;
  altura: number;
  peso: number;
  etnia: string;
  usuario_id: string;
  fisioterapeuta_id: string;
  tipo_id: string;
  usuario: UsuarioProps;
}

interface UsuarioProps {
  nome: string;
  cpf: string;
}

interface FisioterapeutaProps {
  usuario: UsuarioProps;
}

interface UsuarioProps {
  pacientes: PacienteItem[];
  fisioterapeuta: FisioterapeutaProps;
}

export default function DashboardFisioterapeuta({
  pacientes,
  fisioterapeuta,
}: UsuarioProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [nomes, setNomes] = useState([]);
  const [nomeSelecionado, setNomeSelecionado] = useState(false);
  const [fisioterapeutaNome, setFisioterapeutaNome] = useState(
    fisioterapeuta?.usuario.nome
  );

  const [idade, setIdade] = useState(pacientes[0]?.idade);
  console.log(nome);

//   useEffect(() => {
//     const nomes = pacientes.map((paciente) => paciente.usuario.nome);
//     setNomes(nomes);
//   }, [pacientes]);
const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

const handleSelectChange = (event) => {
  const nomePacienteSelecionado = event.target.value;
  const paciente = pacientes.find((paciente) => paciente.usuario.nome === nomePacienteSelecionado);
  setPacienteSelecionado(paciente);
};

  const handleOpenModal = () => {
    // Aqui você pode adicionar lógica para carregar as informações do paciente que você quer exibir no modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Head>
        <title>Página Inicial | mic.day</title>
      </Head>
      <SidebarFisioterapeuta>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          p={2}
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 6}
          >
            <Heading color="pink.700" fontSize={isMobile ? "28px" : "3xl"}>
              Bem vindo, {fisioterapeutaNome}!
            </Heading>
          </Flex>
          <Flex
            maxW="900px"
            w="100%"
            align="center"
            justifyContent="center"
            pt={8}
            pb={8}
            direction="column"
            bg="pink.50"
            borderColor="transparent"
            borderBottomWidth={2}
            borderBottomColor="pink.600"
          >
            <Flex justifyContent="flex-start" w="85%" direction="column">
              <Text fontSize="lg" mb={2}>
                Buscar Paciente
              </Text>
            </Flex>
            <Select
              size="lg"
              w="85%"
              focusBorderColor="pink.700"
              borderColor={"pink.700"}
              _hover={{ borderColor: "pink.700" }}
              placeholder="Selecione o paciente"
              mb={4}
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setNomeSelecionado(Boolean(e.target.value));
              }}
            >
              {nomes.map((nome) => (
                <option key={nome} value={nome}>
                  {nome}
                </option>
              ))}
            </Select>

            
            <Flex justifyContent="flex-start" w="85%" direction="row">
            {pacientes.map((paciente) => (
              <Button
              key={paciente.id} onClick={() => handleOpenModal()}
                leftIcon={<BsPerson size={20} />}
                mt={3}
                mr={4}
                bg="pink.600"
                color="white"
                size="lg"
                _hover={{ bg: "pink.500" }}
                isDisabled={!nomeSelecionado}
              >
                Perfil
              </Button>
              ))}
              {pacienteSelecionado && (
        <ModalPaciente
          nome={pacienteSelecionado.nome}
          cpf={pacienteSelecionado.cpf}
          idade={pacienteSelecionado.idade}
          altura={pacienteSelecionado.altura}
          peso={pacienteSelecionado.peso}
          etnia={pacienteSelecionado.etnia}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
              {/* <Button
                leftIcon={<AiOutlineFileSearch size={20} />}
                mt={3}
                mr={4}
                bg="pink.600"
                color="white"
                size="lg"
                _hover={{ bg: "pink.500" }}
                isDisabled={!nomeSelecionado}
              >
                Registros
              </Button>
              <ModalPaciente
                nome={nome}
                cpf="123.456.789-10"
                idade={25}
                altura={1.75}
                peso={75}
                etnia="Branco"
              /> */}
            </Flex>
          </Flex>
        </Flex>
      </SidebarFisioterapeuta>
    </>
  );
}

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/fisioterapeuta/pacientes");
    const fisioterapeuta = await apiClient.get("/detalhes");

    if (response.data === null || fisioterapeuta.data === null) {
      return {
        redirect: {
          destination: "/dashboard/fisioterapeuta",
          permanent: false,
        },
      };
    }

    return {
      props: {
        pacientes: response.data,
        fisioterapeuta: fisioterapeuta.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/dashboard/fisioterapeuta",
        permanent: false,
      },
    };
  }
});
