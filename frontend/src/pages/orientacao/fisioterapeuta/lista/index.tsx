import Head from "next/head";
import { SidebarFisioterapeuta } from "@/components/sidebar/fisioterapeuta";
import { Text } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

interface OrientacaoItem {
    id: string;
    descricao: string;
    data: Date;
    usuario: UsuarioProps;
}

interface UsuarioProps {
    nome: string;
}

interface OrientacaoProps {
    orientacoes: OrientacaoItem[];
}

export default function OrientacoesFisioterapeuta(){
    return(
        <>
            <Head>Minhas Orientações | mic.day</Head>
            <SidebarFisioterapeuta>
                <Text>Oi</Text>
            </SidebarFisioterapeuta>
        </>
    )
}

export const getServerSideProps = canSSRAuth("Fisioterapeuta", async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get("/orientacoes");
  
      if (response.data === null) {
        return {
          redirect: {
            destination: "/dashboard/fisioterapeuta",
            permanent: false,
          },
        };
      }
      return {
        props: {
          orientacoes: response.data,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        redirect: {
          destination: "/dashboard/fisioterapeuta",
          permanent: false,
        },
      };
    }
  });