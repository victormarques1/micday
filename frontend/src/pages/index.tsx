import  Head  from 'next/head'
import { Flex, Text} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title> TCC </title>
      </Head>
      <Flex background='blue.900' height="100vh" alignItems="center" justifyContent="center" color="#FFF">
        <Text>Página Home</Text>
      </Flex>
    </>
  )
}
