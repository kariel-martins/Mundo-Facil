import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLOR_PALETTE = [
  "#60a5fa",
  "#38bdf8",
  "#f87171",
  "#4ade80",
  "#fbbf24",
  "#a78bfa",
  "#f472b6",
  "#34d399",
  "#c084fc",
  "#facc15",
];

interface PieChartProps {
  categories: string[];
}

export const PieChartComponent: React.FC<PieChartProps> = ({ categories }) => {
  const categoryCounts: { [key: string]: number } = categories.reduce(
    (acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const labels = Object.keys(categoryCounts);
  const dataValues = Object.values(categoryCounts);

  const chartData: ChartData<"pie", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: "Produtos por Categoria",
        data: dataValues,
        backgroundColor: labels.map(
          (_, index) => COLOR_PALETTE[index % COLOR_PALETTE.length]
        ),

        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
          color: "#4b5563",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              const total = dataValues.reduce((a, b) => a + b, 0);
              const percentage =
                ((context.parsed / total) * 100).toFixed(1) + "%";
              label += context.parsed + ` (${percentage})`;
            }
            return label;
          },
        },
      },
    },
  };

  if (labels.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nenhum dado de categoria disponível.
      </div>
    );
  }

  return <Pie data={chartData} options={options} />;
};
