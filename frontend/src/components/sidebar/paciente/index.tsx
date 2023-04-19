import { Children, ReactNode}  from 'react'

import{
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    useColorModeValue,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps
} from '@chakra-ui/react'

import {
    FiSettings
} from 'react-icons/fi'

import { IconType } from 'react-icons'

import Link from 'next/link'

interface LinkItemProps {
    nome: string;
    icon: IconType;
    rota: string;
}

const LinkItems: Array<LinkItemProps> = [
    {nome: 'Minha conta', icon: FiSettings, rota: '/perfil'},
    {nome: 'Minha conta', icon: FiSettings, rota: '/perfil'},
    {nome: 'Minha conta', icon: FiSettings, rota: '/perfil'},
    {nome: 'Minha conta', icon: FiSettings, rota: '/perfil'},
    {nome: 'Minha conta', icon: FiSettings, rota: '/perfil'},
]

export function SidebarPaciente({ children }: {children: ReactNode}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return(
        <Box minH="100vh">
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />

            <Box>
                {children}
            </Box>  
        </Box>

        
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    return(
        <Box
            bg="pink.100"
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60}}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" justifyContent="space-between" mx={8}>
                <Link href="/dashboard/paciente">
                    <Flex cursor="pointer" userSelect="none" flexDirection="row">
                        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">Mic.day</Text>
                    </Flex>
                </Link>
                <CloseButton display={{base: 'flex', md:"none"}} onClick={onClose}/>
            </Flex>

            {LinkItems.map(link => (
                <NavItem icon={link.icon} rota={link.rota} key={link.nome}>
                    {link.nome}
                </NavItem>
            ))}

        </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
    rota: string;
}

const NavItem = ({icon, children, rota, ...rest}: NavItemProps) => {
    return(
        <Link href={rota} style={{textDecoration: 'none'}}>
        <Flex 
            align="center"
            px="4"
            mx="4"
            mb={1}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: 'barber.900',
                color: 'white'
            }}
            {...rest}
        >

            {icon && (
                <Icon   
                    mr={4}
                    fontSize="16"
                    as={icon}
                    _groupHover={{
                        color: 'white'
                    }}
                />
            )}
            {children}
        </Flex>
    </Link>
    )
}