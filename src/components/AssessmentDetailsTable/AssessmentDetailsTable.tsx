"use client";

import clsx from "clsx";
import { Table, TableColumn } from "@/components/common/Table/Table";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AssessmentDetailsResultModal from "./AssessmentDetailsResultModal";
import { OperationItem } from "@/api/defend/assetssment";
import { WebSocketMessageMap, ws } from "@/lib/WebSocketService";
import { fetchAgents } from "@/api/defend/assets";
import Loading from "../common/Loading/Loading";

type ExecutionStatus = "success" | "fail";

export interface LogEntry {
  timestamp: string;
  status: ExecutionStatus;
  defend: string;
  agent: string;
  host: string;
  pid: string;
  result: string;
}

interface StatusDotProps {
  status: ExecutionStatus;
  label: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, label }) => {
  return (
    <div className="relative flex justify-center items-center h-14">
      <div className="absolute -top-3 -bottom-3 w-[2px] bg-neutral-500 z-0" />
      <div
        className={clsx(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-[1000] text-white z-10",
          status === "success" ? "border-green-500" : "border-red-500"
        )}
        style={{ backgroundColor: "#2E3641" }}
      >
        {label}
      </div>
    </div>
  );
};

interface Props {
  operation: OperationItem;
  onStopButtonLoading: () => void;
  onRun: () => void;
  onComplete: () => void;
}

export default function AssessmentDetailsTable({
  operation,
  onStopButtonLoading,
  onRun,
  onComplete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [pidHost, setPidHost] = useState<{ pid: number; host: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const pushingRef = useRef(false);
  const indexRef = useRef(0);

  const logs: LogEntry[] = useMemo(() => {
    return operation.chain.map((link) => {
      const agent = operation.host_group.find((a) => a.paw === link.paw);
      return {
        timestamp: link.collect || link.finish || "-",
        status: link.status === 0 ? "success" : "fail",
        defend: link.ability?.name ?? "Unknown Ability",
        agent: agent?.display_name ?? link.paw,
        host: pidHost?.host ?? "",
        pid: pidHost?.pid !== undefined ? String(pidHost.pid) : "",
        result: link.output ?? "No output",
      };
    });
  }, [operation.chain, operation.host_group, pidHost]);

  const columns: TableColumn<LogEntry>[] = [
    { label: "Timestamp", render: (log) => log.timestamp },
    {
      label: "Status",
      render: (log) => (
        <StatusDot
          status={log.status}
          label={log.status === "success" ? "Success" : "Fail"}
        />
      ),
    },
    { label: "Defend", render: (log) => log.defend },
    { label: "Agent", render: (log) => log.agent },
    { label: "Host", render: (log) => log.host },
    { label: "pid", render: (log) => log.pid },
    {
      label: "Result",
      render: (log) => (
        <button
          onClick={() => {
            setSelectedLog(log);
            setOpen(true);
          }}
          className="p-2 bg-base-700 rounded hover:bg-base-600"
        >
          <ExternalLink size={16} />
        </button>
      ),
    },
  ];

  useEffect(() => {
    const pidFetch = async () => {
      try {
        const data = await fetchAgents();
        if (data.length > 0) {
          setPidHost({ pid: data[0].ppid, host: data[0].host });
        }
      } catch (e) {
        console.error("Failed to fetch agent info", e);
      }
    };
    pidFetch();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLogs]);

  useEffect(() => {
    const getRandomDelay = () => Math.floor(Math.random() * 5000) + 5000; // 5-10 sec

    const startUpdate = () => {
      setVisibleLogs([]);
      onStopButtonLoading();
      onRun();
      setIsLoading(true);
      pushingRef.current = true;
      indexRef.current = 0;

      const pushNext = () => {
        if (indexRef.current >= logs.length) {
          pushingRef.current = false;
          setIsLoading(false);
          setTimeout(onComplete, 0);
          return;
        }

        const nextItem = {
          ...logs[indexRef.current],
          timestamp: new Date().toISOString(),
        };

        setVisibleLogs((prev) => [...prev, nextItem]);
        indexRef.current += 1;

        const delay = getRandomDelay(); // random delay after first item
        setTimeout(pushNext, delay);
      };

      // First item after exactly 5 sec
      setTimeout(() => {
        pushNext(); // first push
      }, 5000);
    };

    ws.on(
      "trigger",
      startUpdate as (payload: WebSocketMessageMap["trigger"]) => void
    );
    return () =>
      ws.off(
        "trigger",
        startUpdate as (payload: WebSocketMessageMap["trigger"]) => void
      );
  }, [logs, onRun, onStopButtonLoading, onComplete]);

  useEffect(() => {
    if (pushingRef.current && visibleLogs.length === logs.length) {
      pushingRef.current = false;
      setIsLoading(false);
      setTimeout(() => {
        onComplete();
      }, 0);
    }
  }, [visibleLogs, logs, onComplete]);

  return (
    <div className="w-full bg-base-800 rounded-lg max-h-[500px] overflow-y-auto">
      <Table data={visibleLogs} columns={columns} />
      {isLoading ? <Loading /> : null}
      <div ref={bottomRef} />
      {selectedLog && (
        <AssessmentDetailsResultModal
          open={open}
          onClose={() => setOpen(false)}
          log={selectedLog}
        />
      )}
    </div>
  );
}
