"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import { MetricItem } from "@/api/evaluate/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS: Record<keyof Omit<MetricItem, "name">, string> = {
  Block: "#4287f5",
  Alert: "#50c878",
  Logged: "#f5a142",
  None: "#f54242",
};

const keys = ["None", "Logged", "Alert", "Block"] as const;

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#333",
        font: { size: 16, weight: 600 },
      },
    },
    tooltip: {
      backgroundColor: "#2d2d2d",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "transparent",
    },
    datalabels: {
      color: "#fff",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },

  scales: {
    x: {
      stacked: true,
      ticks: { color: "#666", font: { size: 16, weight: 800 } },
      grid: { display: false },
    },
    y: {
      stacked: true,
      ticks: {
        color: "#666",
        precision: 0,
        font: { size: 16 },
      },
      grid: {
        color: "#aaa",
      },
    },
  },
};

export default function DefenseScenarioBarChart({
  data,
}: {
  data: MetricItem[];
}) {
  const chartData: ChartData<"bar"> = {
    labels: data.map((d) => d.name),
    datasets: keys.map((key) => ({
      label: key,
      data: data.map((d) => (d[key] === 0 ? null : d[key])),
      backgroundColor: COLORS[key],
      stack: "defense",
      barThickness: 200, // ← Add this
    })),
  };
  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md">
      <Bar data={chartData} options={options} />
    </div>
  );
}
