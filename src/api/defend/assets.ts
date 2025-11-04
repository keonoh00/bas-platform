import { proxyFetch } from "..";

export interface Agent {
  display_name: string;
  last_seen: string;
  architecture: string;
  pending_contact: string;
  host_ip_addrs: string[];
  links: unknown[]; // Replace with defined type if known
  sleep_min: number;
  executors: string[];
  paw: string;
  deadman_enabled: boolean;
  available_contacts: string[];
  pid: number;
  location: string;
  contact: string;
  trusted: boolean;
  group: string;
  server: string;
  host: string;
  watchdog: number;
  privilege: string;
  proxy_receivers: Record<string, unknown>;
  username: string;
  upstream_dest: string;
  exe_name: string;
  proxy_chain: unknown[];
  sleep_max: number;
  ppid: number;
  created: string;
  platform: string;
  origin_link_id: string;
}

export type AgentResponse = Agent[];

export async function fetchAgents(log = false): Promise<AgentResponse> {
  const path = "/api/v2/agents";

  const data = await proxyFetch({
    path,
    method: "GET",
    headers: {
      Key: "BLUEADMIN123",
    },
  });

  if (log) {
    console.log("FETCH via proxy:");
    console.log("Path:", path);
    console.log("Method: GET");
    console.log("Response Data:", data);
  }

  return data as AgentResponse;
}
