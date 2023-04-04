import { FormEvent, useContext } from 'react'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { Input } from '../components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email: 'victor@email.com',
      password: "123321",
    }

    await signIn(data)
  }

  return (
    <>
      <div className='login'>
        <form onSubmit={handleLogin}>
          <Input placeholder='digite seu email' type="text"/>
          <Input placeholder='digite sua senha' type="password"/>
          <Button type="submit" loading={false}>
            Acessar
          </Button>
        </form>

        <a className="criar-conta"> Não possui uma conta? Cadastre-se </a>
      </div>
    </>
  )
}
