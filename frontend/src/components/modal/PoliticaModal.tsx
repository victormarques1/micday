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

const PoliticaModal = () => {
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
          Política de privacidade
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Política de Privacidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Este Contrato de Licença do Usuário Final ("EULA") e Política de
              Privacidade ("Política de Privacidade") regem o uso do sistema
              para auxilio no tratamento de pacientes com incontinência urinária
              mic.day disponibilizado aos usuários. Ao utilizar o sistema, o
              Usuário concorda em estar legalmente vinculado a este EULA e
              Política de Privacidade. Se o Usuário não concordar com os termos
              deste EULA e Política de Privacidade, não deverá usar o sistema.
              <br></br>
              <br></br>
              <strong>Licença de Uso</strong>
              <br></br>A Empresa concede ao Usuário uma licença limitada, não
              exclusiva, intransferível e revogável para usar o Sistema em um
              dispositivo móvel pessoal para uso pessoal. O Usuário não pode
              usar o sistema para fins comerciais ou de outra forma, além de sua
              finalidade prevista. O Usuário não pode copiar, modificar,
              distribuir, vender, sublicenciar ou transferir o sistema ou
              qualquer parte dele sem a permissão expressa por escrito da
              Empresa. A Empresa reserva-se o direito de atualizar, modificar,
              interromper ou descontinuar o sistema a qualquer momento, sem
              aviso prévio ou responsabilidade.<br></br>
              <strong>Coleta de Dados e Privacidade</strong>
              <br></br>A Empresa coleta informações pessoais do Usuário para
              fornecer serviços de suporte ao sistema e melhorar a experiência
              do usuário. A Empresa pode coletar informações, incluindo, mas não
              se limitando a, informações de contato, informações de registro e
              informações do dispositivo. A Empresa não venderá, alugará ou
              divulgará essas informações a terceiros sem o consentimento
              expresso do Usuário. A Empresa pode usar as informações coletadas
              para fornecer atualizações de produtos e marketing direto ao
              Usuário, mas o Usuário pode optar por não receber essas
              comunicações.
              <br></br>
              <strong>Isenção de Responsabilidade e Garantias</strong>
              <br></br>O sistema é fornecido "no estado em que se encontra" e
              "conforme disponível" sem garantias de qualquer tipo, expressas ou
              implícitas, incluindo, mas não se limitando a, garantias de
              comercialização, adequação a um propósito específico e não
              violação. A Empresa não garante que o sistema seja livre de erros,
              interrupções, vírus ou outros defeitos. O Usuário assume total
              responsabilidade pelo uso do sistema. A Empresa não será
              responsável por quaisquer danos diretos, indiretos, incidentais,
              especiais, consequentes ou punitivos resultantes do uso ou
              incapacidade de usar o sistema.
              <br></br>
              <strong>Lei Aplicável e Jurisdição</strong>
              <br></br>
              Este EULA e Política de Privacidade serão regidos pelas leis do
              país em que a Empresa está registrada. O Usuário concorda que
              qualquer ação legal ou litígio decorrente ou relacionado a este
              EULA e Política de Privacidade será resolvido exclusivamente nos
              tribunais competentes localizados no país em que a Empresa está
              registrada.
              <br></br>
              <strong>Alterações ao EULA e Política de Privacidade</strong>
              <br></br>A Empresa reserva-se o direito de modificar ou atualizar
              este EULA e Política de Privacidade a qualquer momento, a seu
              exclusivo critério. O Usuário será notificado de quaisquer
              alterações significativas através do sistema ou por e-mail. O uso
              continuado do sistema após tais alterações constituirá a aceitação
              das mesmas pelo Usuário.
              <br></br>
              <strong>Rescisão</strong>
              <br></br>
              Este EULA e Política de Privacidade podem ser rescindidos pela
              Empresa ou pelo Usuário a qualquer momento. No caso de rescisão
              pelo Usuário, o Usuário deve desinstalar o sistema e excluir todas
              as cópias do sistema em seu dispositivo móvel. A rescisão não
              afetará nenhum direito adquirido pelo Usuário antes da rescisão.
              <br></br>
              <strong>Divisibilidade</strong>
              <br></br>
              Se qualquer disposição deste EULA e Política de Privacidade for
              considerada inválida ou inexequível por um tribunal competente,
              tal disposição será alterada e interpretada para melhor cumprir
              seus objetivos originais na medida do possível e o restante deste
              EULA e Política de Privacidade permanecerá em pleno vigor e
              efeito.
              <br></br>
              <strong>Integralidade do Acordo</strong>
              <br></br>
              Este EULA e Política de Privacidade representam o acordo completo
              entre a Empresa e o Usuário em relação ao uso do sistema e
              substituem todos os acordos, entendimentos, negociações e
              discussões anteriores entre as partes. Qualquer alteração ou
              modificação deste EULA e Política de Privacidade deve ser feita
              por escrito e assinada por ambas as partes. Ao clicar em "Aceito"
              e usar o Sistema, o Usuário reconhece ter lido, compreendido e
              concordado com os termos deste EULA e Política de Privacidade.
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

export default PoliticaModal;
