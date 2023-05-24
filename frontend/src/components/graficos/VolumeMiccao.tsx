import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Box } from "@chakra-ui/react";

Chart.register(...registerables);

interface VolumeChartProps {
  data: {
    id: string;
    data: string;
    quantidade: number;
    perda_urina: boolean;
    necessidade_urina: boolean;
    paciente_id: string;
  }[];
}

const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartData = {
        labels: data.map((record) => record.data),
        datasets: [
          {
            label: "Volume de Micção",
            data: data.map((record) => record.quantidade),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: chartOptions,
        });
      }
    }
  }, [data]);

  return <Box as="canvas" ref={chartRef} />;
};

export default VolumeChart;
