import Head from "next/head";
import {Flex, Text} from '@chakra-ui/react'

import { canSSRAuth } from "@/utils/canSSRAuth";
import { SidebarPaciente } from '../../../components/sidebar/paciente'

export default function DashboardPaciente(){
    return(
        <>
            <Head>
                <title>Página Inicial | mic.day </title>
            </Head>
            <SidebarPaciente>
                <Flex>
                    <Text>Dashboard Paciente</Text>
                </Flex>
            </SidebarPaciente>
        </>
    )
}


export const getServerSideProps = canSSRAuth('Paciente', async (ctx) => {
    return {
        props: {
            
        }
    }
})