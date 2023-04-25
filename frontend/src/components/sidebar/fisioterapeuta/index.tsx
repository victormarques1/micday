import { Children, ReactNode } from "react";

import Head from "next/head";

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
} from "@chakra-ui/react";

import Image from "next/image";
import Logo from "../../../../public/images/logo-sidebar.svg";

import { IconType } from "react-icons";
import { FiSettings, FiMenu } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { FaToilet, FaBell } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";

import Link from "next/link";

interface LinkItemProps {
  nome: string;
  icon: IconType;
  rota: string;
}

const LinkItems: Array<LinkItemProps> = [
  { nome: "Página Inicial", icon: HiHome, rota: "/dashboard/paciente" },
  { nome: "Registrar Urina", icon: FaToilet, rota: "/" },
  { nome: "Registrar Bebida", icon: MdLocalDrink, rota: "/" },
  { nome: "Orientações", icon: FaBell, rota: "/" },
  { nome: "Minha Conta", icon: FiSettings, rota: "/perfil/fisioterapeuta"}
];

export function SidebarFisioterapeuta({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          size="full"
          onClose={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={() => onClose()} />
          </DrawerContent>
        </Drawer>

        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

        <Box ml={{base: 0, md: 60}} p={4}>{children}</Box>
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
        <CloseButton color="white" display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem icon={link.icon} rota={link.rota} key={link.nome}>
          {link.nome}
        </NavItem>
      ))}
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
        _hover={{bg: 'pink.800'}}
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
