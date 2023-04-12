import  Head  from 'next/head'
import Image from 'next/image'
import introImg from '../../public/images/intro.svg'
import { Flex, Text, Center, Input, Button} from '@chakra-ui/react'

import  Link  from 'next/link'

export default function Login() {
  return (
    <>
      <Head>
        <title> TCC - Faça login para acessar </title>
      </Head>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4} mb={4}>
            <Image
              src={introImg}
              quality={100}
              width={260}
              objectFit="fill"
              alt="Imagem introdução"
            />
          </Center>

          <Input 
          borderColor="blue.600"
          variant={'filled'}
          size="lg"
          placeholder='exemplo@email.com'
          type="email"
          mb={3}
          />

          <Input 
          borderColor="blue.600"
          variant={'filled'}
          size="lg" 
          placeholder='Digite sua senha'
          type="password"
          mb={3}
          />

          <Center mb={6} pr={2} justifyContent="end">
            <Link href="/">
              <Text 
              cursor="pointer" 
              color="blue.600" 
              fontSize={16} 
              fontWeight={'semibold'}
              _hover={{ color: "blue.500"}}
              >
                Esqueceu sua senha?</Text>
            </Link>
          </Center>

          <Button
            background="blue.600"
            color="#FFF"
            size="lg"
            borderRadius={24}
            mb={7}
            _hover={{ bg: "blue.500"}}
          >
            Acessar
          </Button>

          <Center>
            <Link href="/registrar">
              <Text cursor="pointer">Ainda não possui conta? <strong>Cadastre-se</strong></Text>
            </Link>
          </Center>

        </Flex>

      </Flex>
    </>
  )
}
