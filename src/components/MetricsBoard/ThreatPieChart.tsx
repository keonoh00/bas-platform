"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // import plugin
import { MetricItem } from "@/api/evaluate/types";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // register it

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        color: "#000",
        font: { size: 18 },
      },
    },
    tooltip: {
      backgroundColor: "#2d2d2d",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#333",
      borderWidth: 1,
    },
    datalabels: {
      color: "#fff",
      font: {
        size: 16,
        weight: "bold",
      },
      formatter: (value) => (value ? `${value}%` : ""),
    },
  },
};

export default function ThreatPieChart({ data }: { data: MetricItem[] }) {
  const totals = data.reduce(
    (acc, entry) => {
      acc.Blocked += entry.Block;
      acc.Alerted += entry.Alert;
      acc.Logged += entry.Logged;
      acc.None += entry.None;
      return acc;
    },
    { Blocked: 0, Alerted: 0, Logged: 0, None: 0 }
  );

  const totalSum =
    totals.Blocked + totals.Alerted + totals.Logged + totals.None;

  const toPercent = (value: number) =>
    totalSum === 0
      ? 0
      : value === 0
      ? null
      : parseFloat(((value / totalSum) * 100).toFixed(1));

  const reconstructedData = {
    labels: ["Blocked", "Alerted", "Logged", "None"],
    datasets: [
      {
        label: "Threat Ratio (%)",
        data: [
          toPercent(totals.Blocked),
          toPercent(totals.Alerted),
          toPercent(totals.Logged),
          toPercent(totals.None),
        ],
        backgroundColor: ["#4287f5", "#50c878", "#f5a142", "#f54242"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-md flex justify-center items-center">
      <div className="w-[80%] h-full">
        <Pie data={reconstructedData} options={options} />
      </div>
    </div>
  );
}
