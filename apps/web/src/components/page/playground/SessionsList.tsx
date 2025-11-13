"use client";

import { useMemo, useState, useCallback } from "react";
import { Monitor } from "lucide-react";
import SearchInput from "~/components/common/SearchInput/SearchInput";
import { Pagination } from "~/components/common/Pagination/Pagination";
import type { RouterOutputs } from "~/lib/trpc";

type SessionsListResponse = RouterOutputs["sessions"]["list"];

interface Props {
  data: SessionsListResponse | null;
  isLoading: boolean;
  error: string | null;
  selectedSessionId: number | null;
  onSelect: (id: number) => void;
}

const SESSIONS_PER_PAGE = 20;

function PlatformBadge({ platform }: { platform: string }) {
  const cls =
    platform === "linux"
      ? "bg-emerald-500/20 text-emerald-300"
      : platform === "windows"
      ? "bg-blue-500/20 text-blue-300"
      : "bg-slate-700/50 text-slate-400";
  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
      <Monitor className="h-3 w-3" />
      {platform}
    </span>
  );
}

export function SessionsList({ data, isLoading, error, selectedSessionId, onSelect }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSessions = useMemo(() => {
    if (!data?.sessions) return [];
    let filtered = data.sessions;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.id.toString().includes(query) ||
          s.info.toLowerCase().includes(query) ||
          s.platform.toLowerCase().includes(query) ||
          s.executors.some((e) => e.toLowerCase().includes(query))
      );
    }
    return filtered;
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredSessions.length / SESSIONS_PER_PAGE) || 1;
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * SESSIONS_PER_PAGE;
    const end = start + SESSIONS_PER_PAGE;
    return filteredSessions.slice(start, end);
  }, [filteredSessions, currentPage]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 shadow-sm">
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/60 backdrop-blur px-3 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Sessions</h2>
            {data && (
              <p className="mt-0.5 text-xs text-slate-400">
                {data.sessions.length} total{searchQuery && ` • ${filteredSessions.length} found`}
              </p>
            )}
          </div>
          {selectedSessionId && (
            <div className="flex items-center gap-1.5 rounded bg-blue-600/20 px-2 py-1 ring-1 ring-blue-500/30">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              <span className="text-xs font-medium text-blue-300">#{selectedSessionId}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-3">
        {isLoading ? (
          <div className="flex flex-1 flex-col gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[54px] animate-pulse rounded border border-slate-800 bg-slate-800/30" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded border border-red-500/20 bg-red-500/10 p-3">
            <p className="text-xs font-medium text-red-400">{error}</p>
          </div>
        ) : !data || data.sessions.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-slate-800/70" />
              <p className="text-xs text-slate-400">No sessions</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2">
              <SearchInput onSearch={handleSearch} placeholder="Search..." />
            </div>
            {filteredSessions.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-slate-800/70" />
                  <p className="text-xs text-slate-400">No matches</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
                  {paginatedSessions.map((s) => {
                    const isSelected = selectedSessionId === s.id;
                    const shownExecutors = s.executors.slice(0, 2);
                    const extra = Math.max(s.executors.length - shownExecutors.length, 0);
                    return (
                      <button
                        key={s.id}
                        onClick={() => onSelect(s.id)}
                        className={`w-full rounded border px-3 py-2.5 text-left text-xs transition-colors ${
                          isSelected
                            ? "border-blue-500/50 bg-blue-500/10 shadow-inner"
                            : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-medium ${isSelected ? "text-blue-300" : "text-slate-200"}`}>#{s.id}</span>
                              <PlatformBadge platform={s.platform} />
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 rounded bg-blue-600/30 px-1.5 py-0.5 text-[10px] font-medium text-blue-200">
                                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="mt-1 truncate text-slate-400">{s.info}</div>
                            {shownExecutors.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap items-center gap-1">
                                {shownExecutors.map((ex) => (
                                  <span
                                    key={ex}
                                    className="inline-flex items-center rounded bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-300 ring-1 ring-inset ring-slate-700"
                                  >
                                    {ex}
                                  </span>
                                ))}
                                {extra > 0 && (
                                  <span className="inline-flex items-center rounded bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-300 ring-1 ring-inset ring-slate-700">
                                    +{extra}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div className="mt-3 border-t border-slate-800 pt-3">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SessionsList;
