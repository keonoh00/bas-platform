"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Title,
  ChartOptions,
  ChartData,
  Plugin,
} from "chart.js";
import ChartDataLabels, {
  Context as DataLabelContext,
} from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getMetricData } from "@/api/evaluate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title,
  ChartDataLabels
);

interface ResilienceDataPoint {
  runTime: Date;
  score: number;
  round: string;
}
interface ResilienceDataPoint {
  runTime: Date;
  score: number;
  round: string;
}

const rounds = [
  { round: "start" },
  {
    runTime: "2025-05-13T10:25:34",
    round: "Penetration to C-ITS Center (1회차)",
  },
  {
    runTime: "2025-05-13T11:17:26",
    round: "Penetration to C-ITS Center (2회차)",
  },
  {
    runTime: "2025-05-13T13:42:32",
    round: "Penetration to C-ITS Center (3회차)",
  },
  {
    runTime: "today",
    round: "Penetration to C-ITS Center (4회차)",
  },
  { round: "end" },
];

export const resilienceData: ResilienceDataPoint[] = rounds.map(
  ({ runTime, round }) => {
    if (round === "start") {
      const firstRealTime =
        rounds.find((r) => r.runTime)?.runTime ?? new Date().toISOString();
      return {
        runTime: new Date(firstRealTime),
        score: 0,
        round: "",
      };
    }

    if (round === "end") {
      const lastRealTime =
        [...rounds].reverse().find((r) => r.runTime)?.runTime ??
        new Date().toISOString();
      return {
        runTime: new Date(lastRealTime),
        score: 62,
        round: "",
      };
    }

    const time =
      runTime === "today" ? new Date() : new Date(runTime ?? Date.now());

    const _data = getMetricData(round);

    const totals = _data.reduce(
      (acc, entry) => {
        acc.Block += entry.Block ?? 0;
        acc.Alert += entry.Alert ?? 0;
        acc.Logged += entry.Logged ?? 0;
        acc.None += entry.None ?? 0;
        return acc;
      },
      { Block: 0, Alert: 0, Logged: 0, None: 0 }
    );

    const totalSum = totals.Block + totals.Alert + totals.Logged + totals.None;
    const passed = totals.Block + totals.Alert;

    const score =
      totalSum === 0 ? 0 : parseFloat(((passed / totalSum) * 100).toFixed(1));

    return {
      runTime: time,
      score,
      round,
    };
  }
);

const visibleIndices = new Set<number>([1, 2, 3, 4]);

const ResilienceChart: React.FC = () => {
  const [height, setHeight] = useState<number>(400);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight * 0.6);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const labels = resilienceData.map((d) =>
    d.runTime.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
    })
  );

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Resilience Score",
        data: resilienceData.map((d) => d.score),
        borderColor: "#5fa8f6",
        backgroundColor: "#5fa8f6",
        borderWidth: 2,
        pointRadius: resilienceData.map((_, idx) =>
          visibleIndices.has(idx) ? 4 : 0
        ),
        pointHoverRadius: 5,
        tension: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: "center",
        labels: {
          color: "#000",
          font: { size: 18 },
        },
      },
      datalabels: {
        align: "top",
        anchor: "end",
        backgroundColor: "#1e3a8a",
        borderRadius: 4,
        color: "white",
        padding: 6,
        font: {
          size: 16,
          weight: "bold",
        },
        display: (ctx: DataLabelContext) => visibleIndices.has(ctx.dataIndex),
        formatter: (value: number, context: DataLabelContext): string[] => {
          const idx = context.dataIndex;
          const timestamp = resilienceData[idx].runTime.toLocaleString(
            "ko-KR",
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }
          );
          return [`${idx}회차 ${timestamp}`, `Score : ${value}`];
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#444", font: { size: 16, weight: 600 } },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "#444" },
        grid: { color: "#444" },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-md" style={{ height }}>
      <Line
        data={data}
        options={options}
        plugins={[ChartDataLabels as Plugin]}
      />
    </div>
  );
};

export default ResilienceChart;
