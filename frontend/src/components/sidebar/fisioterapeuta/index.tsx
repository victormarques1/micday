import { ReactNode } from "react";
import { useContext, useState, useEffect } from "react";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
} from "@chakra-ui/react";

import Image from "next/image";
import Logo from "../../../../public/images/logo-sidebar.svg";

import { IconType } from "react-icons";
import { FiSettings, FiMenu, FiLogOut } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { RiFileSearchFill } from "react-icons/ri";
import { setupAPIClient } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
import TermsModal from "@/components/modal/TermosModal";

import Link from "next/link";
import PoliticaModal from "@/components/modal/PoliticaModal";

interface LinkItemProps {
  nome: string;
  icon: IconType;
  rota: string;
}

const LinkItems: Array<LinkItemProps> = [
  { nome: "Página Inicial", icon: HiHome, rota: "/dashboard/fisioterapeuta" },

  {
    nome: "Meus Pacientes",
    icon: MdPersonSearch,
    rota: "/fisioterapeuta/pacientes",
  },

  {
    nome: "Minhas Orientações",
    icon: RiFileSearchFill,
    rota: "/orientacao/fisioterapeuta/lista",
  },

  {
    nome: "Criar Orientações",
    icon: FaBell,
    rota: "/orientacao/fisioterapeuta/criar",
  },

  { nome: "Minha Conta", icon: FiSettings, rota: "/perfil/fisioterapeuta" },
];

export function SidebarFisioterapeuta({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deslogarUsuario } = useContext(AuthContext);

  return (
    <>
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />

        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="xs"
          onClose={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={() => onClose()} />
          </DrawerContent>
        </Drawer>

        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

        <Box ml={{ base: 0, md: 60 }} p={4}>
          {children}
        </Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface FisioterapeutaData {
  usuario: {
    cpf: string;
    email: string;
    id: string;
    nome: string;
    tipo: string;
  };
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { deslogarUsuario } = useContext(AuthContext);
  const [fisioterapeutaData, setFisioterapeutaData] =
    useState<FisioterapeutaData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function handleLogout() {
    await deslogarUsuario();
  }

  useEffect(() => {
    buscarNomes();
  }, []);

  async function buscarNomes() {
    try {
      const apiClient = setupAPIClient();
      const { data } = await apiClient.get<FisioterapeutaData>("/detalhes");
      console.log(data);
      setFisioterapeutaData({ usuario: data.usuario });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return (
    <Box
      bg="pink.700"
      borderRightWidth={"1px"}
      borderRightColor={useColorModeValue("pink.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        mx={7}
        mb={4}
      >
        <Link href="/dashboard/paciente">
          <Flex>
            <Image src={Logo} quality={100} width={110} alt="Logo mic.day" />
          </Flex>
        </Link>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem icon={link.icon} rota={link.rota} key={link.nome}>
          {link.nome}
        </NavItem>
      ))}

      <Box
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg="pink.900"
        color="pink.300"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Text fontWeight="semibold">{fisioterapeutaData?.usuario.nome}</Text>
        <Menu>
          <MenuButton
            as={Button}
            pt="1"
            size="md"
            onClick={handleMenuToggle}
            style={{
              background: isMenuOpen ? "transparent" : "transparent",
              transition: "background-color 0.2s",
            }}
            _hover={{
              background: isMenuOpen ? "transparent" : "transparent",
              color: "pink.200",
            }}
            _active={{ background: "transparent" }}
            _focus={{ outline: "none" }}
          >
            <FiLogOut size="20" />
          </MenuButton>
          <MenuList bg="pink.50" borderColor="pink.100">
            <MenuItem
              bg="pink.50"
              color="pink.600"
              fontWeight="semibold"
              onClick={handleLogout}
            >
              Sair da conta
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box pos="absolute" bottom={24} left={0} right={0}>
        <TermsModal />
        <PoliticaModal />
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  rota: string;
}

const NavItem = ({ icon, children, rota, ...rest }: NavItemProps) => {
  return (
    <Link href={rota} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        px="4"
        mx="4"
        p={3}
        borderRadius={4}
        color="white"
        role="group"
        cursor="pointer"
        fontWeight="semibold"
        _hover={{
          bg: "pink.100",
          color: "pink.600",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize="18"
            as={icon}
            _groupHover={{
              color: "pink.600",
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems={"center"}
      bg={useColorModeValue("pink.700", "pink.500")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("pink.200", "pink.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        bg="transparent"
        _hover={{ bg: "pink.800" }}
        color="white"
        variant={"outline"}
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex flexDirection={"row"} ml={8}>
        <Image src={Logo} quality={100} width={110} alt="Logo mic.day" />
      </Flex>
    </Flex>
  );
};
