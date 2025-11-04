import { proxyFetch } from "..";

export interface OperationPlanner {
  params: {
    filtered_groups_by_ability?: Record<string, string[]>;
    [key: string]: unknown;
  };
  allow_repeatable_abilities: boolean;
  stopping_conditions: unknown[];
  plugin: string;
  name: string;
  id: string;
  ignore_enforcement_modules: unknown[];
  module: string;
  description: string;
}

export interface OperationAdversary {
  created: string;
  planner_id: string;
  objective: string;
  atomic_ordering: string[];
  name: string;
  template_type: string;
  has_repeatable_abilities: boolean;
  adversary_id: string;
  tags: string[];
  last_modified: string;
  plugin: string | null;
  description: string;
}

export interface OperationObjectiveGoal {
  count: number;
  target: string;
  operator: string;
  achieved: boolean;
  value: string;
}

export interface OperationObjective {
  percentage: number;
  name: string;
  goals: OperationObjectiveGoal[];
  id: string;
  description: string;
}

export interface OperationSource {
  relationships: unknown[];
  rules: {
    action: string;
    trait: string;
    match: string;
  }[];
  adjustments: unknown[];
  facts: {
    score: number;
    technique_id: string | null;
    source: string;
    value: string;
    relationships: unknown[];
    collected_by: unknown[];
    origin_type: string;
    name: string;
    trait: string;
    limit_count: number;
    created: string;
    links: unknown[];
    unique: string;
  }[];
  name: string;
  id: string;
  plugin: string;
}

export interface OperationAgent {
  trusted: boolean;
  exe_name: string;
  pid: number;
  proxy_receivers: Record<string, unknown>;
  proxy_chain: unknown[];
  origin_link_id: string;
  privilege: string;
  host_ip_addrs: string[];
  upstream_dest: string;
  last_seen: string;
  created: string;
  sleep_min: number;
  paw: string;
  executors: string[];
  links: unknown[];
  ppid: number;
  location: string;
  deadman_enabled: boolean;
  group: string;
  display_name: string;
  host: string;
  platform: string;
  sleep_max: number;
  architecture: string;
  username: string;
  contact: string;
  available_contacts: string[];
  pending_contact: string;
  server: string;
  watchdog: number;
}

export interface OperationChainEntry {
  id: string;
  paw: string;
  pid: string;
  collect: string;
  finish: string;
  command: string;
  plaintext_command: string;
  output: string;
  status: number;
  host: string;
  decide: string;
  agent_reported_time: string;
  cleanup: number;
  pin: number;
  score: number;
  deadman: boolean;
  used: unknown[];
  unique: string;
  relationships: unknown[];
  facts: unknown[];
  visibility: {
    score: number;
    adjustments: unknown[];
  };
  executor: {
    name: string;
    platform: string;
    timeout: number;
    command: string;
    parsers: unknown[];
    payloads: string[];
    uploads: string[];
    variations: unknown[];
    additional_info: Record<string, unknown>;
    build_target: string | null;
    language: string | null;
    code: string | null;
    cleanup: string[];
  };
  ability: {
    ability_id: string;
    name: string;
    tactic: string;
    technique_id: string;
    technique_name: string;
    description: string;
    privilege: string;
    repeatable: boolean;
    singleton: boolean;
    plugin: string;
    last_modified: string;
    access: Record<string, unknown>;
    additional_info: Record<string, unknown>;
    delete_payload: boolean;
    threat_group: string[];
    mitre_domain: string;
    cve_info: string[];
    requirements: unknown[];
    buckets: string[];
    executors: OperationChainEntry["executor"][];
  };
}

export interface OperationItem {
  planner: OperationPlanner;
  adversary: OperationAdversary;
  group: string;
  visibility: number;
  objective: OperationObjective | string;
  autonomous: number;
  use_learning_parsers: boolean;
  start: string;
  source: OperationSource;
  state: string;
  name: string;
  host_group: OperationAgent[];
  obfuscator: string;
  id: string;
  jitter: string;
  auto_close: boolean;
  chain: OperationChainEntry[];
}

export type OperationResponse = OperationItem[];

const DUMMY: OperationItem = {
  id: "op-cits-001",
  name: "C-ITS Blue Process",
  start: "2024-08-12T16:02:06+09:00",
  state: "running",
  group: "blue",
  visibility: 51,
  autonomous: 1,
  use_learning_parsers: true,
  jitter: "2/8",
  obfuscator: "plain-text",
  auto_close: false,
  planner: {
    id: "planner-001",
    name: "Defensive Planner",
    module: "plugins.default.defense_planner",
    plugin: "default",
    description: "Planner for executing defense sequences",
    allow_repeatable_abilities: false,
    stopping_conditions: [],
    ignore_enforcement_modules: [],
    params: {},
  },
  adversary: {
    adversary_id: "adv-cits-blue",
    name: "C-ITS Defense",
    description: "Automated response chain for C-ITS protection",
    created: "2024-08-12T15:55:00+09:00",
    last_modified: "2024-08-12T15:55:00+09:00",
    planner_id: "planner-001",
    objective: "objective-blue",
    atomic_ordering: [],
    template_type: "defense",
    has_repeatable_abilities: false,
    tags: [],
    plugin: null,
  },
  objective: {
    id: "objective-blue",
    name: "Prevent and Respond",
    description: "Immediate response to suspicious activities",
    percentage: 100,
    goals: [],
  },
  source: {
    id: "src-blue",
    name: "sensor",
    plugin: "stockpile",
    relationships: [],
    rules: [],
    adjustments: [],
    facts: [],
  },
  host_group: [
    {
      paw: "pc-employee-001",
      trusted: true,
      exe_name: "defender.exe",
      pid: 204,
      ppid: 100,
      proxy_receivers: {},
      proxy_chain: [],
      origin_link_id: "",
      privilege: "User",
      host_ip_addrs: ["192.168.0.5"],
      upstream_dest: "http://192.168.0.1",
      last_seen: "2024-08-12T16:09:38+09:00",
      created: "2024-08-12T15:50:00+09:00",
      sleep_min: 2,
      sleep_max: 5,
      executors: ["cmd"],
      links: [],
      location: "C:\\Program Files\\Defender",
      deadman_enabled: false,
      group: "C-ITS",
      display_name: "Employee PC",
      host: "Desktop-KER6",
      platform: "windows",
      architecture: "x64",
      username: "user01",
      contact: "tcp",
      available_contacts: ["tcp"],
      pending_contact: "tcp",
      server: "http://192.168.0.1",
      watchdog: 60,
    },
  ],
  chain: [
    "NDR 이벤트(의심 IP) 수신",
    "비인가 프로세스 검색",
    "연결된 프로세스 검색",
    "비표준 포트 검색",
    "의심스런 파일정보 획득",
    "의심스런 파일 존재 여부 탐색",
    "비인가 프로세스 종료",
    "방화벽에 블랙리스트 인바운드 IP 추가",
    "방화벽에 블랙리스트 아웃바운드 IP 추가",
    "의심스런 파일 삭제",
  ].map((defendName, i) => {
    const base = new Date("2024-08-12T16:02:06+09:00").getTime();
    const timestamp = new Date(base + i * 71000).toISOString();
    return {
      id: `link-${i + 1}`,
      paw: "pc-employee-001",
      pid: "204",
      collect: timestamp,
      finish: timestamp,
      command: `echo "${defendName}"`,
      plaintext_command: `echo "${defendName}"`,
      output: "OK",
      status: 0,
      host: "Desktop-KER6",
      decide: timestamp,
      agent_reported_time: timestamp,
      cleanup: 0,
      pin: 0,
      score: 0,
      deadman: false,
      used: [],
      unique: `unique-${i}`,
      facts: [],
      relationships: [],
      visibility: { score: 50, adjustments: [] },
      executor: {
        name: "cmd",
        platform: "windows",
        timeout: 60,
        command: `echo "${defendName}"`,
        parsers: [],
        payloads: [],
        uploads: [],
        variations: [],
        additional_info: {},
        build_target: null,
        language: null,
        code: null,
        cleanup: [],
      },
      ability: {
        ability_id: `defense-${i}`,
        name: defendName,
        tactic: "response",
        technique_id: "-",
        technique_name: "-",
        description: defendName,
        privilege: "User",
        repeatable: false,
        singleton: false,
        plugin: "default",
        last_modified: timestamp,
        access: {},
        additional_info: {},
        delete_payload: false,
        threat_group: [],
        mitre_domain: "enterprise-attack",
        cve_info: [],
        requirements: [],
        buckets: ["defense"],
        executors: [],
      },
    };
  }),
};

export async function fetchOperations(log = false): Promise<OperationResponse> {
  const path = "/api/v2/operations";
  const headers = {
    Key: "BLUEADMIN123",
  };

  const data = await proxyFetch({
    path,
    method: "GET",
    headers,
    body: { name: "" },
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("Path:", path);
    console.log("Method: GET");
    console.log("Headers:", headers);
    console.log("Response Data:", data);
  }

  const parsed = Array.isArray(data) ? (data as OperationResponse) : [];

  return parsed.length > 0 ? [DUMMY, ...parsed] : [DUMMY];
}
