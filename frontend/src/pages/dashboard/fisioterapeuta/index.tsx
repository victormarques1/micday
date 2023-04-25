import Head from "next/head";
import {Flex, Text} from '@chakra-ui/react'

import { canSSRAuth } from "@/utils/canSSRAuth";
import { SidebarFisioterapeuta } from '../../../components/sidebar/fisioterapeuta'


export default function DashboardFisioterapeuta(){
    return(
        <>
            <Head>
                <title>Página Inicial | mic.day</title>
            </Head>
            <SidebarFisioterapeuta>
            <Flex>
                    <Text>Dashboard Fisioterapeuta</Text>
                </Flex>
            </SidebarFisioterapeuta>
        </>
    )
}

export const getServerSideProps = canSSRAuth('Fisioterapeuta', async (ctx) => {
    return {
        props: {
            
        }
    }
})