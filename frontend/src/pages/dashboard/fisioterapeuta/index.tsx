import Head from "next/head";
import {Flex, Text} from '@chakra-ui/react'

import { canSSRAuth } from "@/utils/canSSRAuth";

export default function DashboardFisioterapeuta(){
    return(
        <>
            <h1> TELA FISIOTERAPEUTA </h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth('Fisioterapeuta', async (ctx) => {
    return {
        props: {
            
        }
    }
})