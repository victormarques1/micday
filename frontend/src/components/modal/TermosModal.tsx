import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const TermosModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box pl={4}>
        <Button
          bg="transparent"
          color="pink.300"
          _hover={{ bg: "transparent", color: "pink.200" }}
          onClick={handleOpen}
        >
          Termos de uso
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Termos de Uso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Bem-vindo ao mic.day, este sistema é desenvolvido para ajudar
              pessoas com incontinência urinária a gerenciar seus sintomas. Os
              seguintes termos e condições (o Termos de Uso) governam o uso do
              sistema. Ao usar o sistema, você concorda com estes{" "}
              <strong>Termos de Uso e com a Política de Privacidade</strong> do
              sistema.
              <br></br>
              <br></br>
              <strong>1. Uso do sistema</strong>
              <br></br>O mic.day destina-se a ajudar as pessoas que sofrem de
              incontinência urinária a gerenciar seus sintomas. Ao usar o
              mic.day, você concorda em não fazer nada que possa danificar ou
              sobrecarregar os sistemas de infraestrutura do sistema ou
              interferir no uso do sistema por outros usuários. Você concorda em
              usar o sistema apenas para os fins pretendidos e de acordo com
              todas as leis e regulamentos aplicáveis.
              <br></br>
              <strong>2. Registro e Conta do Usuário</strong>
              <br></br> Para usar o sistema, você deve se registrar e criar uma
              conta de usuário. Você concorda em fornecer informações precisas,
              atualizadas e completas ao se registrar e criar uma conta de
              usuário. Você é responsável por manter a confidencialidade de sua
              senha e por todas as atividades que ocorrem em sua conta.
              <br></br>
              <strong>3. Propriedade Intelectual</strong>
              <br></br>Todo o conteúdo e funcionalidade do sistema, incluindo,
              mas não se limitando a, gráficos, imagens, texto, vídeo, áudio e
              código de computador (o "Conteúdo"), é protegido por leis de
              propriedade intelectual, incluindo leis de direitos autorais,
              patentes, marcas registradas e outras leis de propriedade
              intelectual. Você reconhece que todo o Conteúdo é propriedade
              exclusiva da Empresa ou de seus licenciadores. Você não pode
              copiar, reproduzir, modificar, criar trabalhos derivados,
              distribuir, transmitir, exibir ou usar o Conteúdo de qualquer
              forma sem a autorização prévia por escrito da Empresa. Isenção de
              Garantias O sistema é fornecido "como está" e sem garantias de
              qualquer tipo, expressas ou implícitas, incluindo, mas não se
              limitando a, garantias implícitas de comercialização, adequação a
              uma finalidade específica, não violação ou desempenho.
              <br></br>
              <strong>4. Limitação de Responsabilidade</strong>
              <br></br>
              Em nenhuma circunstância a Empresa será responsável por quaisquer
              danos, incluindo, mas não se limitando a, danos diretos,
              indiretos, incidentais, especiais, punitivos ou consequentes
              decorrentes ou relacionados ao uso ou incapacidade de uso do
              sistema ou do Conteúdo, mesmo que a Empresa tenha sido informada
              da possibilidade de tais danos.
              <br></br>
              <strong>5. Indenização</strong>
              <br></br> Você concorda em defender, indenizar e isentar a Empresa
              e seus funcionários, diretores, agentes, afiliados e licenciadores
              de e contra quaisquer reivindicações, ações, demandas, danos,
              custos ou despesas, incluindo honorários advocatícios razoáveis,
              resultantes de ou relacionados ao seu uso do sistema, seu
              Conteúdo, sua violação destes Termos de Uso ou qualquer atividade
              relacionada à sua conta de usuário. ,<br></br>
              <strong>6. Rescisão</strong>
              <br></br> A Empresa pode rescindir estes Termos de Uso e o seu
              acesso ao sistema a qualquer momento, por qualquer motivo ou sem
              motivo. Você pode rescindir estes Termos de Uso e seu acesso ao
              ssitema excluindo sua conta de usuário. Alterações nos Termos de
              Uso A Empresa pode alterar estes Termos de Uso a qualquer momento,
              a seu exclusivo critério. A Empresa notificará você de qualquer
              alteração enviando um aviso por e-mail ou publicando um aviso no
              sistema. O uso continuado do sistema após a notificação de uma
              alteração nos Termos de Uso será considerado como sua aceitação da
              alteração.
              <br></br>
              <strong>Disposições Gerais</strong>
              <br></br> Estes Termos de Uso constituem o acordo completo entre
              você e a Empresa com relação ao uso do sistema e substituem todos
              os acordos anteriores e contemporâneos e comunicações orais ou
              escritas com relação ao assunto aqui tratado. Se qualquer
              disposição destes Termos de Uso for considerada inválida ou
              inexequível, tal disposição será anulada ou limitada na medida
              mínima necessária, e as disposições restantes continuarão em pleno
              vigor e efeito. A falha da Empresa em exercer ou fazer cumprir
              qualquer direito ou disposição destes Termos de Uso não
              constituirá uma renúncia a tal direito ou disposição. Estes Termos
              de Uso são regidos pelas leis do Rio Grande do Sul/Brasil e
              quaisquer disputas decorrentes ou relacionadas a estes Termos de
              Uso serão resolvidas exclusivamente nos tribunais do Rio Grande do
              Sul/Brasil.
              <br></br>
              Ao usar o sistema, você concorda com estes Termos de Uso e com a
              Política de Privacidade do sistema. Se você tiver alguma dúvida ou
              preocupação sobre estes Termos de Uso ou o sistema, entre em
              contato conosco em victor.marques@ufn.edu.br.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TermosModal;
