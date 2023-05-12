import { useState } from "react";
import Head from "next/head";
import { SidebarFisioterapeuta } from "@/components/sidebar/fisioterapeuta";
import {
  Text,
  Input,
  useMediaQuery,
  Button,
  Heading,
  Flex,
  Box,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { FiChevronLeft } from "react-icons/fi";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import Router from "next/router";

interface OrientacaoItem {
  id: string;
  descricao: string;
  data: Date;
  paciente: {
    id: string;
    usuario: {
      nome: string;
    };
  };
}

interface OrientacaoListProps {
  orientacoes: OrientacaoItem[];
}

export default function OrientacoesFisioterapeuta({
  orientacoes,
}: OrientacaoListProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orientacaoSelecionada, setOrientacaoSelecionada] = useState(null);

  const orientacoesOrdenadas = orientacoes.sort((a, b) => {
    const dataA = new Date(a.data).getTime();
    const dataB = new Date(b.data).getTime();
    return dataB - dataA;
  });

  const pacientes = orientacoes.map((orientacao) => orientacao.paciente);
  const pacientesUnicos = pacientes.reduce((unicos, pacienteAtual) => {
    if (unicos.findIndex((pac) => pac.id === pacienteAtual.id) === -1) {
      return [...unicos, pacienteAtual];
    }
    return unicos;
  }, []);

  const handleOpenModal = (orientacao) => {
    setOrientacaoSelecionada(orientacao);
    onOpen();
  };

  async function handleDelete(orientacao) {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete(`/orientacoes/${orientacao.id}`, {
        params: { orientacao_id: orientacao.id },
      });

      toast.success("Orientação excluída com sucesso!");
      Router.push("/orientacao/fisioterapeuta/lista");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao excluir orientação.");
    }
  }

  async function handleEdit() {
    try {
      const { id, descricao, data, paciente } = orientacaoSelecionada;
      const dataFormatada = moment(data)
        .tz("America/Sao_Paulo")
        .format("YYYY-MM-DDTHH:mm");
      // console.log(`paciente_id: ${paciente.id}, descricao: ${descricao}, data: ${data}`);
      const apiClient = setupAPIClient();
      await apiClient.put(`/orientacoes/${id}`, {
        descricao: descricao,
        data: dataFormatada,
        paciente_id: paciente.id,
      });
      toast.success("Orientação atualizada com sucesso!");
      onClose();
      Router.push("/orientacao/fisioterapeuta/lista");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao atualizar orientação.");
    }
  }

  return (
    <>
      <Head>Minhas Orientações | mic.day</Head>
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
            mb={isMobile ? 0 : 4}
          >
            <Link href="/dashboard/fisioterapeuta">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyItems="center"
                mr={4}
                bg="pink.50"
                borderColor="pink.700"
                _hover={{ bg: "pink.50" }}
              >
                <FiChevronLeft size={24} color="#B83280" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="pink.700"
              mt={4}
              mr={4}
              mb={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Minhas Orientações
            </Heading>
          </Flex>

          <VStack align="stretch" spacing={4} w="100%">
            {orientacoesOrdenadas.map((orientacao) => (
              <Box
                key={orientacao.id}
                p={4}
                shadow="md"
                bg="pink.50"
                borderBottomColor="pink.700"
                borderBottomWidth={2}
                fontSize="lg"
              >
                <Text mb={1}>
                  <strong>Paciente:</strong> {orientacao.paciente.usuario.nome}
                </Text>
                <Text mb={1}>
                  <strong>Data / Hora:</strong>{" "}
                  {format(new Date(orientacao.data), "dd/MM/yyyy HH:mm")}
                </Text>
                <Text mb={1}>
                  <strong>Descrição:</strong> {orientacao.descricao}
                </Text>
                <Box mt={4} color="white">
                  <Button
                    bg="green.500"
                    _hover={{ bg: "green.400" }}
                    size="sm"
                    mr={3}
                    leftIcon={<FaRegEdit />}
                    onClick={() => handleOpenModal(orientacao)}
                    color="white"
                  >
                    Editar
                  </Button>
                  <Button
                    bg="red.500"
                    _hover={{ bg: "red.400" }}
                    size="sm"
                    leftIcon={<FaRegTrashAlt />}
                    onClick={() => handleDelete(orientacao)}
                  >
                    Excluir
                  </Button>
                </Box>
              </Box>
            ))}
          </VStack>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar Orientação</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="paciente" mb={3}>
                  <FormLabel>Paciente</FormLabel>
                  <Select
                    size="lg"
                    focusBorderColor="pink.700"
                    borderColor={"pink.700"}
                    _hover={{ borderColor: "pink.600" }}
                    onChange={(e) =>
                      setOrientacaoSelecionada({
                        ...orientacaoSelecionada,
                        paciente: pacientesUnicos.find(
                          (pac) => pac.id === e.target.value
                        ),
                      })
                    }
                  >
                    {pacientesUnicos.map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.usuario.nome}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="dataHora" mb={3}>
                  <FormLabel>Data / Hora</FormLabel>
                  {orientacaoSelecionada && (
                    <Input
                      value={format(
                        new Date(orientacaoSelecionada.data),
                        "yyyy-MM-dd'T'HH:mm"
                      )}
                      placeholder="Data e Hora"
                      size="lg"
                      type="datetime-local"
                      focusBorderColor="pink.700"
                      borderColor={"pink.700"}
                      _hover={{ borderColor: "pink.700" }}
                      onChange={(e) =>
                        setOrientacaoSelecionada({
                          ...orientacaoSelecionada,
                          data: e.target.value,
                        })
                      }
                    />
                  )}
                </FormControl>
                <FormControl id="descricao">
                  <FormLabel>Descrição</FormLabel>
                  <Textarea
                    focusBorderColor="pink.700"
                    _hover={{ borderColor: "pink.700" }}
                    placeholder="Informe a orientação que deseja enviar ao paciente.."
                    size="lg"
                    borderColor={"pink.700"}
                    value={orientacaoSelecionada?.descricao ?? ""}
                    onChange={(e) =>
                      setOrientacaoSelecionada({
                        ...orientacaoSelecionada,
                        descricao: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={onClose}
                  _hover={{ bg: "pink.50" }}
                >
                  Cancelar
                </Button>
                <Button
                  bg="pink.600"
                  color="white"
                  _hover={{ bg: "pink.500" }}
                  onClick={() => handleEdit()}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </SidebarFisioterapeuta>
    </>
  );
}

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/orientacoes");

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard/fisioterapeuta",
          permanent: false,
        },
      };
    }
    return {
      props: {
        orientacoes: response.data,
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
