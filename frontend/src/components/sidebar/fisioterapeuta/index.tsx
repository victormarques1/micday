import { ReactNode}  from 'react'

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
]

export function SidebarFisioterapeuta(){
    return(
        <Box minH="100vh" bg="pink.200">

        </Box>
    )
}

