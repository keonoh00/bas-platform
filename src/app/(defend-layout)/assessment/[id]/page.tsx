"use client";

import { fetchOperations, OperationResponse } from "@/api/defend/assetssment";
import AssessmentDetailsTable from "@/components/AssessmentDetailsTable/AssessmentDetailsTable";
import AssessmentTable, {
  AssessmentRunningState,
} from "@/components/AssessmentTable/AssessmentTable";
import Loading from "@/components/common/Loading/Loading";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PlayIcon } from "lucide-react";

export default function AssessmentDetail() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<OperationResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const onRun = () => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        state: AssessmentRunningState.Running,
        start: new Date().toISOString(),
      }))
    );
  };

  const onComplete = () => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        state: AssessmentRunningState.Complete,
      }))
    );
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchOperations();

      setData(
        response
          .filter((item) => item.id === params.id)
          .map((item) => ({
            ...item,
            state: AssessmentRunningState.Ready,
            start: "",
          }))
      );
    } catch (err) {
      setError((err as Error).message || "Failed to load data.");
      setData([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full bg-base-900 p-8 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="relative min-w-[340px]">
            <select
              defaultValue=""
              className="w-full bg-base-800 border border-base-700 text-neutral-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="" disabled>
                {data && data.length > 0 ? data[0].name : ""}
              </option>
            </select>

            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Scenario Button */}
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded font-bold">
            Download Report
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="p-2 bg-green-400 flex flex-row rounded-sm hover:bg-green-400"
            onClick={() => setIsButtonLoading(true)}
          >
            {isButtonLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className="spinner w-12 h-12"></div>
                </div>

                <style jsx>{`
                  .spinner {
                    border: 2px solid #3b82f6; /* blue-500 */
                    border-top: 2px solid transparent;
                    border-radius: 9999px;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                  }

                  @keyframes spin {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            ) : (
              <>
                <PlayIcon color="white" onClick={() => setIsLoading} />
                <p className="ml-1">방어 시작</p>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* Temp spacer */}
        <div>
          <div className="h-6" />
        </div>

        <div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="text-center text-red-400 py-10">{error}</div>
          ) : data.length === 0 ? (
            <div className="text-center text-neutral-400 py-10">
              No assessments found.
            </div>
          ) : (
            <>
              <AssessmentTable data={data} />
              {/* Temp spacer */}
              <div>
                <div className="h-12" />
                <div className="h-12" />
              </div>

              <AssessmentDetailsTable
                onStopButtonLoading={() => setIsButtonLoading(false)}
                operation={data[0]}
                onComplete={onComplete}
                onRun={onRun}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
