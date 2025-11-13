"use client";

import type { ConnectionState } from "~/components/page/playground/Terminal";
import ConnectionPill from "./ConnectionPill";
import { cn } from "~/lib/utils";

interface Props {
  connectionState: ConnectionState;
  selectedSessionId: number | null;
  onRefreshAll: () => void;
  onRefreshSessions: () => void;
  onRefreshSocket: () => void;
  sessionsLoading?: boolean;
}

export function PageHeader({
  connectionState,
  selectedSessionId,
  onRefreshAll,
  onRefreshSessions,
  onRefreshSocket,
  sessionsLoading,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-slate-800 px-4 py-3",
        "bg-linear-to-r from-slate-900/70 to-slate-900/40"
      )}
    >
      <div>
        <h1 className="text-sm font-semibold tracking-wide text-white">
          Playground
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Browse active sessions and interact with a live terminal.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ConnectionPill state={connectionState} />
        {selectedSessionId && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/20 px-2.5 py-1 text-[10px] font-medium text-blue-300 ring-1 ring-inset ring-blue-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Session #{selectedSessionId}
          </span>
        )}
        <div className="ml-2 flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "rounded bg-blue-600/90 px-2.5 py-1 text-xs font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50",
              "bg-blue-600/90 hover:bg-blue-600 focus:ring-blue-400 disabled:opacity-50"
            )}
            onClick={onRefreshAll}
            disabled={sessionsLoading}
          >
            Refresh All
          </button>
          <button
            type="button"
            className="rounded bg-violet-700/80 px-2.5 py-1 text-xs font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring-1 focus:ring-violet-400"
            onClick={onRefreshSocket}
            title="Reconnect socket"
          >
            Socket
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
