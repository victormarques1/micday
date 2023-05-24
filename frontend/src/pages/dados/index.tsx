import React, { useEffect, useState } from "react";
import Head from "next/head";
import { SidebarPaciente } from "@/components/sidebar/paciente";
import { Flex, Text, Box } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import UrineChart from "@/components/graficos/ChartComponent";
import { format } from "date-fns";

export default function Dados({ urinas, bebidas }) {
  const [urineRecords, setUrineRecords] = useState(urinas);
  const [drinkRecords, setDrinkRecords] = useState(bebidas);

  useEffect(() => {
    const fetchUrineRecords = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get("/urina/detalhes");
        setUrineRecords(response.data);
      } catch (error) {
        console.error("Erro ao buscar registros de urina:", error);
      }
    };

    const fetchDrinkRecords = async () => {
      try {
        const apiClient = setupAPIClient();
        const response = await apiClient.get("/bebida/detalhes");
        setDrinkRecords(response.data);
      } catch (error) {
        console.error("Erro ao buscar registros de bebida:", error);
      }
    };

    fetchUrineRecords();
    fetchDrinkRecords();
  }, []);

  const urineDates = urineRecords.map((record) => {
    const date = new Date(record.data);
    return date;
  });
  const urineQuantities = urineRecords.map((record) => record.quantidade);

  const drinkDates = drinkRecords.map((record) => {
    const date = new Date(record.data);
    return date;
  });
  const drinkQuantities = drinkRecords.map((record) => record.quantidade);

  const combinedDates = [...urineDates, ...drinkDates];
  const combinedQuantities = [...urineQuantities, ...drinkQuantities];

  return (
    <>
      <Head>
        <title>Análise de Dados | mic.day</title>
      </Head>
      <SidebarPaciente>
  <Text>Gráfico</Text>
  <UrineChart
    urineDates={urineDates}
    urineQuantities={urineQuantities}
    drinkDates={drinkDates}
    drinkQuantities={drinkQuantities}
  />
</SidebarPaciente>

    </>
  );
}

export const getServerSideProps = canSSRAuth("Paciente", async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const urineResponse = await apiClient.get("/urina/detalhes");
    const drinkResponse = await apiClient.get("/bebida/detalhes");

    if (urineResponse.data === null || drinkResponse.data === null) {
      return {
        redirect: {
          destination: "/dashboard/paciente",
          permanent: false,
        },
      };
    }

    return {
      props: {
        urinas: urineResponse.data,
        bebidas: drinkResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/dashboard/paciente",
        permanent: false,
      },
    };
  }
});
