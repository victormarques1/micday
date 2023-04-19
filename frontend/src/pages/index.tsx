import  Head  from 'next/head'
import Image from 'next/image'

import { Flex, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title> TCC - Faça login para acessar </title>
      </Head>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text>
          Página Home
        </Text>
      </Flex>
    </>
  )
}
