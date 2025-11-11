"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Database,
  Server,
  ArrowRight,
  Shield,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import Loading from "~/components/common/Loading/Loading";
import { AbilitiesCharts } from "~/components/dashboard/AbilitiesCharts";
import { AgentsCharts } from "~/components/dashboard/AgentsCharts";
import trpc, { type RouterOutputs } from "~/lib/trpc";
import Link from "next/link";

type AbilitiesStatistics = RouterOutputs["abilities"]["statistics"];
type AgentsStatistics = RouterOutputs["agents"]["statistics"];

export default function Dashboard() {
  const [abilitiesStats, setAbilitiesStats] = useState<
    AbilitiesStatistics | undefined
  >();
  const [agentsStats, setAgentsStats] = useState<
    AgentsStatistics | undefined
  >();
  const [isLoadingAbilities, setIsLoadingAbilities] = useState<boolean>(true);
  const [isLoadingAgents, setIsLoadingAgents] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAbilitiesStats = async () => {
      setIsLoadingAbilities(true);
      try {
        const response = await trpc.abilities.statistics.query();
        if (!cancelled) {
          setAbilitiesStats(response);
        }
      } catch (error) {
        console.error("Failed to fetch abilities statistics:", error);
        if (!cancelled) {
          setAbilitiesStats(undefined);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAbilities(false);
        }
      }
    };

    const fetchAgentsStats = async () => {
      setIsLoadingAgents(true);
      try {
        const response = await trpc.agents.statistics.query();
        if (!cancelled) {
          setAgentsStats(response);
        }
      } catch (error) {
        console.error("Failed to fetch agents statistics:", error);
        if (!cancelled) {
          setAgentsStats(undefined);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAgents(false);
        }
      }
    };

    fetchAbilitiesStats();
    fetchAgentsStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col w-full space-y-8">
      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-base-700/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl" />
          <CardHeader className="pb-3">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 uppercase tracking-wide">
                Total Abilities
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <Database className="h-5 w-5 text-primary-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-white">
                {abilitiesStats?.totalCount.toLocaleString() ?? 0}
              </div>
              <TrendingUp className="h-4 w-4 text-primary-400" />
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Available attack techniques
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-base-700/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl" />
          <CardHeader className="pb-3">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 uppercase tracking-wide">
                Total Agents
              </CardTitle>
              <div className="p-2 rounded-lg bg-accent-500/10 border border-accent-500/20">
                <Server className="h-5 w-5 text-accent-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-white">
                {agentsStats?.totalCount.toLocaleString() ?? 0}
              </div>
              <TrendingUp className="h-4 w-4 text-accent-400" />
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Active agents in system
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-base-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
          <CardHeader className="pb-3">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 uppercase tracking-wide">
                Trusted Agents
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-white">
                {agentsStats?.trustedCount.toLocaleString() ?? 0}
              </div>
              <div className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">
                {agentsStats?.totalCount
                  ? Math.round(
                      (agentsStats.trustedCount / agentsStats.totalCount) * 100
                    )
                  : 0}
                %
              </div>
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Verified and trusted
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-base-700/50 hover:border-danger-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-danger-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-danger-500/5 rounded-full blur-3xl" />
          <CardHeader className="pb-3">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 uppercase tracking-wide">
                Untrusted Agents
              </CardTitle>
              <div className="p-2 rounded-lg bg-danger-500/10 border border-danger-500/20">
                <ShieldAlert className="h-5 w-5 text-danger-500" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-white">
                {agentsStats?.untrustedCount.toLocaleString() ?? 0}
              </div>
              <div className="text-xs font-medium text-danger-500 bg-danger-500/10 px-2 py-1 rounded">
                {agentsStats?.totalCount
                  ? Math.round(
                      (agentsStats.untrustedCount / agentsStats.totalCount) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>
            <p className="text-sm text-neutral-400 mt-2">
              Require verification
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Abilities Visualization */}
      <Card className="border-base-700/50">
        <CardHeader className="border-b border-base-700/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-white">
                Abilities Distribution
              </CardTitle>
              <CardDescription className="text-sm text-neutral-400">
                Visual breakdown of attack techniques and capabilities
              </CardDescription>
            </div>
            <Link
              href="/abilities"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 rounded-lg transition-all duration-200"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoadingAbilities ? (
            <div className="flex justify-center items-center py-16">
              <Loading />
            </div>
          ) : abilitiesStats ? (
            <AbilitiesCharts data={abilitiesStats} />
          ) : (
            <div className="text-center text-neutral-400 py-16">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No abilities available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agents Visualization */}
      <Card className="border-base-700/50">
        <CardHeader className="border-b border-base-700/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-white">
                Agents Distribution
              </CardTitle>
              <CardDescription className="text-sm text-neutral-400">
                Visual breakdown of active agents in the system
              </CardDescription>
            </div>
            <Link
              href="/agents"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/20 rounded-lg transition-all duration-200"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoadingAgents ? (
            <div className="flex justify-center items-center py-16">
              <Loading />
            </div>
          ) : agentsStats ? (
            <AgentsCharts data={agentsStats} />
          ) : (
            <div className="text-center text-neutral-400 py-16">
              <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No agents available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
