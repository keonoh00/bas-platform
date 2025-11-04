import { proxyFetch } from "..";

const API_KEY = "BLUEADMIN123";

const headers = {
  Key: API_KEY,
};

const logInfo = (label: string, payload: unknown, enabled = false) => {
  if (enabled) console.log(`[INFO] ${label}:`, payload);
};

const logError = (label: string, err: unknown, enabled = false) => {
  if (enabled) console.error(`[ERROR] ${label}:`, err);
};

// Types
export interface Adversary {
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
  plugin: "";
  description: string;
}

export interface AbilityExecutor {
  code: string | null;
  parsers: unknown[];
  timeout: number;
  build_target: string | null;
  language: string | null;
  platform: string;
  additional_info: Record<string, unknown>;
  name: string;
  uploads: string[];
  variations: unknown[];
  command: string;
  payloads: string[];
  cleanup: string[];
}

export interface AbilityDetail {
  tactic: string;
  cve_info: string[];
  privilege: string;
  singleton: boolean;
  access: Record<string, unknown>;
  plugin: string;
  last_modified: string;
  executors: AbilityExecutor[];
  name: string;
  additional_info: Record<string, unknown>;
  delete_payload: boolean;
  ability_id: string;
  technique_name: string;
  threat_group: string[];
  description: string;
  requirements: unknown[];
  repeatable: boolean;
  buckets: string[];
  mitre_domain: string;
  technique_id: string;
}

export type EnrichedAdversary = Omit<Adversary, "atomic_ordering"> & {
  atomic_ordering: AbilityDetail[];
};

export type EnrichedAdversaryResponse = EnrichedAdversary[];

const DUMMY: EnrichedAdversary[] = [
  {
    adversary_id: "CITS-DEFENSE-001",
    name: "C-ITS Defense",
    description:
      "Composite defense strategy using detection, hunting, and response actions in C-ITS.",
    planner_id: "planner-cits-defense",
    objective:
      "Detect, analyze, and respond to potential threats within cooperative ITS environments.",
    tags: ["C-ITS", "automotive", "defense"],
    plugin: "",
    created: new Date().toISOString(),
    last_modified: new Date().toISOString(),
    template_type: "defense",
    has_repeatable_abilities: false,
    atomic_ordering: [
      {
        ability_id: "CITS-ABILITY-001",
        name: "NDR 이벤트(의심 IP) 수신",
        description:
          "Receive and process suspicious IP alerts from NDR systems.",
        tactic: "hunt",
        technique_id: "T1046",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-002",
        name: "비인가 프로세스 검색",
        description:
          "Scan and identify processes that are not part of approved lists.",
        tactic: "detection",
        technique_id: "T1057",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-003",
        name: "연결된 프로세스 검색",
        description:
          "Analyze process trees to find relationships among suspicious processes.",
        tactic: "detection",
        technique_id: "T1057",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-004",
        name: "비표준 포트 검색",
        description:
          "Identify uncommon port usage that may indicate lateral movement or evasion.",
        tactic: "detection",
        technique_id: "T1049",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-005",
        name: "의심스런 파일정보 획득",
        description:
          "Collect metadata of suspicious files for further analysis.",
        tactic: "response",
        technique_id: "T1005",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-006",
        name: "의심스런 파일 존재 여부 탐색",
        description:
          "Search for indicators of compromise based on known suspicious file hashes or names.",
        tactic: "response",
        technique_id: "T1083",
        technique_name: "-",
        plugin: "true",
        last_modified: new Date().toISOString(),
        privilege: "User",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: [],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-007",
        name: "비인가 프로세스 종료",
        description: "Terminate unauthorized processes detected during scans.",
        tactic: "response",
        technique_id: "T1561",
        technique_name: "-",
        plugin: "",
        last_modified: new Date().toISOString(),
        privilege: "Administrator",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: ["true"],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-008",
        name: "방화벽에 블랙리스트 인바운드 IP 추가",
        description:
          "Add inbound IPs to firewall blacklist based on threat detection.",
        tactic: "response",
        technique_id: "T1016",
        technique_name: "Uncommonly Used Port",
        plugin: "",
        last_modified: new Date().toISOString(),
        privilege: "Administrator",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: ["true"],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-009",
        name: "방화벽에 블랙리스트 아웃바운드 IP 추가",
        description:
          "Block outbound traffic to suspicious IPs using firewall rules.",
        tactic: "response",
        technique_id: "T1016",
        technique_name: "Uncommonly Used Port",
        plugin: "",
        last_modified: new Date().toISOString(),
        privilege: "Administrator",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: ["true"],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
      {
        ability_id: "CITS-ABILITY-010",
        name: "의심스런 파일 삭제",
        description:
          "Remove identified malicious or suspicious files from the system.",
        tactic: "response",
        technique_id: "T1070",
        technique_name: "-",
        plugin: "",
        last_modified: new Date().toISOString(),
        privilege: "Administrator",
        singleton: false,
        access: {},
        executors: [],
        cve_info: [],
        additional_info: {},
        delete_payload: false,
        repeatable: false,
        buckets: [],
        requirements: ["true"],
        threat_group: [],
        mitre_domain: "enterprise-attack",
      },
    ],
  },
];

// Functions
export async function fetchAdversaries(log = false): Promise<Adversary[]> {
  const path = "/api/v2/adversaries";
  try {
    const data = await proxyFetch({ path, method: "GET", headers });
    logInfo("Fetched Adversaries", data, log);
    return data as Adversary[];
  } catch (err) {
    logError("fetchAdversaries failed", err, log);
    return [];
  }
}

export async function fetchAbilityDetail(
  abilityId: string,
  log = false
): Promise<AbilityDetail | null> {
  const path = `/api/v2/abilities/${abilityId}`;
  try {
    const data = await proxyFetch({ path, method: "GET", headers });
    logInfo(`Fetched Ability [${abilityId}]`, data, log);
    return data as AbilityDetail;
  } catch (err) {
    logError(`fetchAbilityDetail failed [${abilityId}]`, err, log);
    return null;
  }
}

export async function fetchAdversariesWithAbilities(
  log = false
): Promise<EnrichedAdversary[]> {
  const prefilled = DUMMY;
  const adversaries = await fetchAdversaries(log);
  if (!adversaries.length) return DUMMY;

  const uniqueAbilityIds = [
    ...new Set(adversaries.flatMap((a) => a.atomic_ordering)),
  ].filter(Boolean) as string[];

  const abilityDetailMap = new Map<string, AbilityDetail>();

  await Promise.all(
    uniqueAbilityIds.map(async (id) => {
      const detail = await fetchAbilityDetail(id, log);
      if (detail) abilityDetailMap.set(id, detail);
    })
  );

  const enriched = adversaries.map((adv) => ({
    ...adv,
    atomic_ordering: (adv.atomic_ordering || [])
      .map((id) => abilityDetailMap.get(id))
      .filter((d): d is AbilityDetail => Boolean(d)),
  }));

  logInfo("Enriched Adversaries", enriched, log);
  return [...prefilled, ...enriched]; // Always return DUMMY prepended
}
