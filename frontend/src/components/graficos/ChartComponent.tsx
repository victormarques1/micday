import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { format, parse, isAfter, addDays } from "date-fns";

import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(BarController, CategoryScale, LinearScale, Title, Tooltip);

interface UrineChartProps {
  urineDates: Date[];
  urineQuantities: number[];
  drinkDates: Date[];
  drinkQuantities: number[];
}

const UrineChart: React.FC<UrineChartProps> = ({
  urineDates,
  urineQuantities,
  drinkDates,
  drinkQuantities,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const MAX_RANGE_DAYS = 10; // Número máximo de dias permitidos no intervalo

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Filtrar as datas e quantidades de urina com base nas datas selecionadas
        let filteredUrineQuantities = urineQuantities.slice();
        let filteredUrineData = urineDates.map((date, index) => ({
          date,
          quantity: urineQuantities[index],
        }));

        if (startDate && endDate && endDate >= startDate) {
          filteredUrineData = filteredUrineData
            .filter((data) => data.date >= startDate && data.date <= endDate)
            .sort((a, b) => a.date.getTime() - b.date.getTime());

          // Verificar se a data inicial está faltando no array de dados filtrados de urina
          const hasUrineStartDate = filteredUrineData.some(
            (data) => data.date.getTime() === startDate.getTime()
          );

          // Verificar se a data inicial está ausente e adicioná-la no início do array de dados filtrados de urina
          if (!hasUrineStartDate) {
            const startQuantity = filteredUrineQuantities[0]; // Valor da primeira quantidade disponível
            filteredUrineData.unshift({ date: startDate, quantity: startQuantity });
          }

          // Verificar se a data final está presente nos dados filtrados de urina
          const hasUrineEndDate = filteredUrineData.some(
            (data) => data.date.getTime() === endDate.getTime()
          );

          // Verificar se a data final está faltando no array de dados filtrados de urina
          if (!hasUrineEndDate) {
            const endQuantity =
              filteredUrineQuantities[filteredUrineQuantities.length - 1]; // Valor da última quantidade disponível
            filteredUrineData.push({ date: endDate, quantity: endQuantity });
          }

          urineDates = filteredUrineData.map((data) => data.date);
          filteredUrineQuantities = filteredUrineData.map((data) => data.quantity);
        }

        // Filtrar as datas e quantidades de bebida com base nas datas selecionadas
        let filteredDrinkQuantities = drinkQuantities.slice();

        if (startDate && endDate && endDate >= startDate) {
          const filteredDrinkData = drinkDates
            .map((date, index) => ({ date, quantity: drinkQuantities[index] }))
            .filter((data) => data.date >= startDate && data.date <= endDate)
            .sort((a, b) => a.date.getTime() - b.date.getTime());

          // Verificar se a data final está presente nos dados filtrados de bebida
          const hasDrinkEndDate = filteredDrinkData.some(
            (data) => data.date.getTime() === endDate.getTime()
          );

          // Verificar se a data final está faltando no array de dados filtrados de bebida
          if (!hasDrinkEndDate) {
            const endQuantity =
              filteredDrinkQuantities[filteredDrinkQuantities.length - 1]; // Valor da última quantidade disponível
            filteredDrinkData.push({ date: endDate, quantity: endQuantity });
          }

          drinkDates = filteredDrinkData.map((data) => new Date(data.date));
          filteredDrinkQuantities = filteredDrinkData.map((data) => data.quantity);
        }

        const chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: urineDates,
            datasets: [
              {
                label: "Quantidade de Urina",
                data: filteredUrineQuantities,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "Quantidade de Bebida",
                data: filteredDrinkQuantities,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  tooltipFormat: 'dd/MM/yyyy',
                  displayFormats: {
                    day: 'dd/MM/yyyy',
                  },
                },
                title: {
                  display: true,
                  text: 'Data',
                },
              },
            },
          },
        });

        chartInstanceRef.current = chartInstance;
      }
    }
  }, [
    urineDates,
    urineQuantities,
    drinkDates,
    drinkQuantities,
    startDate,
    endDate,
  ]);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedStartDate = parse(
      event.target.value,
      "yyyy-MM-dd",
      new Date()
    );
    if (isAfter(selectedStartDate, endDate)) {
      setEndDate(null);
    }
    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = parse(event.target.value, "yyyy-MM-dd", new Date());
    if (isAfter(startDate, selectedEndDate)) {
      setStartDate(null);
    }
    setEndDate(selectedEndDate);
  };

  return (
    <Box>
      <Flex alignItems="center" marginBottom={4}>
        <FormControl marginRight={4}>
          <FormLabel htmlFor="start-date">Data Inicial:</FormLabel>
          <Input
            id="start-date"
            type="date"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={handleStartDateChange}
          />
          <FormHelperText>Selecione a data inicial.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="end-date">Data Final:</FormLabel>
          <Input
            id="end-date"
            type="date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={handleEndDateChange}
          />
          <FormHelperText>Selecione a data final.</FormHelperText>
        </FormControl>
      </Flex>
      <div style={{ height: "400px" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </Box>
  );
};

export default UrineChart;
