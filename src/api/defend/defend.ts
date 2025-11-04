import { proxyFetch } from "..";

export interface AttackPagination {
  page: number;
  items_per_page: number;
  total_items: number;
}

export interface AttackVariation {
  description: string;
  command: string;
}

export interface AttackExecutor {
  timeout: number;
  name: string;
  payloads: string[];
  command: string;
  build_target: string | null;
  additional_info: Record<string, unknown>;
  code: string | null;
  cleanup: string[];
  uploads: string[];
  platform: string;
  parsers: AttackParser[];
  language: string | null;
  variations: AttackVariation[];
}

export interface AttackParserConfig {
  source: string;
  custom_parser_vals: Record<string, unknown>;
  target: string;
  edge: string;
}

export interface AttackParser {
  parserconfigs: AttackParserConfig[];
  module: string;
}

export interface AttackDataItem {
  plugin: string;
  buckets: string[];
  additional_info: Record<string, unknown>;
  mitre_domain: string;
  requirements: unknown[];
  technique_id: string;
  name: string;
  last_modified: string;
  description: string;
  executors: AttackExecutor[];
  ability_id: string;
  technique_name: string;
  tactic: string;
  repeatable: boolean;
  threat_group: string | string[];
  cve_info: string | string[];
  singleton: boolean;
  delete_payload: boolean;
  privilege: string;
  access: Record<string, unknown>;
}

export interface AttackSearchKeyword {
  name: string;
  platform: string;
  mitre_domain: string;
  tactic: string;
  threat_group: string;
}

export interface AttackFilterCount {
  platform: {
    total: number;
    darwin: number;
    linux: number;
    windows: number;
    unknown: number;
  };
  mitre_domain: {
    total: number;
    Enterprise: number;
  };
  tactic: Record<string, number>;
  threat_group: {
    total: number;
    undefined: number;
  };
}

export interface AttackResponse {
  pagenation?: AttackPagination;
  data?: AttackDataItem[];
  search_keyword?: AttackSearchKeyword;
  filter_count?: AttackFilterCount;
}

export interface AttackRequest {
  query?: string;
  page?: number;
  itemsPerPage?: number;
  log?: boolean;
}

const DUMMY: AttackDataItem[] = [
  {
    mitre_domain: "Enterprise",
    description:
      "Checks sensitive file hashes against previously stored hashes to determine if the file has been modified",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [
      {
        relationship_match: [
          {
            source: "file.sensitive.path",
            edge: "has_hash",
            target: "file.sensitive.hash",
          },
        ],
        module: "plugins.stockpile.app.requirements.basic",
      },
      {
        relationship_match: [
          {
            source: "file.sensitive.hash",
          },
        ],
        module: "plugins.stockpile.app.requirements.paw_provenance",
      },
    ],
    repeatable: true,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "linux",
        command:
          'filepath="#{file.sensitive.path}";\nif [ ! -f $filepath ] || [ "$(sha256sum $filepath | cut -d\' \' -f1)" != "#{file.sensitive.hash}" ];\n  then echo $filepath;\nfi',
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.stockpile.app.parsers.basic",
            parserconfigs: [
              {
                target: "has_been_modified",
                custom_parser_vals: {},
                edge: "has_property",
                source: "file.sensitive.path",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "darwin",
        command:
          'filepath="#{file.sensitive.path}";\nif [ ! -f $filepath ] || [ "$(shasum -a 256 $filepath | cut -d\' \' -f1)" != "#{file.sensitive.hash}" ];\n  then echo $filepath;\nfi',
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.stockpile.app.parsers.basic",
            parserconfigs: [
              {
                target: "has_been_modified",
                custom_parser_vals: {},
                edge: "has_property",
                source: "file.sensitive.path",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'if (-not (Test-Path -PathType Leaf #{file.sensitive.path}) -or (Get-FileHash #{file.sensitive.path}).Hash -ne "#{file.sensitive.hash}") { echo #{file.sensitive.path} }',
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.stockpile.app.parsers.basic",
            parserconfigs: [
              {
                target: "has_been_modified",
                custom_parser_vals: {},
                edge: "has_property",
                source: "file.sensitive.path",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:17:03",
    singleton: false,
    buckets: ["detection"],
    tactic: "detection",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "930236c2-5397-4868-8c7b-72e294a5a376",
    name: "NDR 이벤트(의심 IP) 수신",
    technique_name: "x",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description: "Search for processes which should not be on the host",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [],
    repeatable: true,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "darwin",
        command:
          "ps aux | grep -v grep | grep #{remote.port.unauthorized} | awk '{print $2}'",
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.process",
            parserconfigs: [
              {
                target: "host.pid.unauthorized",
                custom_parser_vals: {},
                edge: "has_pid",
                source: "remote.port.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "linux",
        command:
          "ps aux | grep -v grep | grep #{remote.port.unauthorized} | awk '{print $2}'",
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.process",
            parserconfigs: [
              {
                target: "host.pid.unauthorized",
                custom_parser_vals: {},
                edge: "has_pid",
                source: "remote.port.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'Get-NetTCPConnection -RemotePort "#{remote.port.unauthorized}" -EA silentlycontinue | where-object { write-host $_.OwningProcess }',
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.process",
            parserconfigs: [
              {
                target: "host.pid.unauthorized",
                custom_parser_vals: {},
                edge: "has_pid",
                source: "remote.port.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'Get-NetTCPConnection -RemotePort "#{remote.port.unauthorized}" -EA silentlycontinue | where-object { write-host $_.OwningProcess }',
        language: null,
        name: "pwsh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.process",
            parserconfigs: [
              {
                target: "host.pid.unauthorized",
                custom_parser_vals: {},
                edge: "has_pid",
                source: "remote.port.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:17:03",
    singleton: false,
    buckets: ["detection"],
    tactic: "detection",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "3b4640bc-eacb-407a-a997-105e39788781",
    name: "비인가 프로세스 검색",
    technique_name: "x",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description:
      "Collect all process creation events with the given parent process GUID",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          "$time_range = (Get-Date) - (New-TimeSpan -Seconds $(#{sysmon.time.range}/1000));\nGet-WinEvent -FilterHashTable @{ Logname='Microsoft-Windows-Sysmon/Operational'; StartTime=$time_range; Id=1 } | where -Property Message -Match \"\\bParentProcessGuid: {#{host.process.parentguid}}\" | Format-List;",
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 300,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          "wevtutil qe Microsoft-Windows-Sysmon/Operational /q:\"*/System/TimeCreated[timediff(@SystemTime) <= #{sysmon.time.range}] and */System/EventID=1 and */EventData/Data[@Name='ParentProcessGuid']='#{host.process.parentguid}'\" /f:text",
        language: null,
        name: "cmd",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 300,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:34",
    singleton: false,
    buckets: ["response"],
    tactic: "response",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "2331077e-7be9-4e89-b2bb-32e8d7f6a708",
    name: "연결된 프로세스 검색",
    technique_name: "Query Event Logs",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description: "Compare open ports against a known baseline",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [],
    repeatable: true,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          'function getFullList($portList){\n    $final = @();\n    foreach ($p in $portList) {\n        if ($p -like "*-*") {\n            $minmax = $p.Split("-");\n            for ($i = ($minmax[0] -as [int]); $i -lt ($minmax[1] -as [int]); $i++) {\n                $final += ($i -as [string]);\n            };\n        } else {\n            $final += $p;\n        };\n    };\n    return $final;\n};\n$basePorts = @("135","139","389","445","636","1000-5000","9389","49152-65535");\n$allPorts = getFullList $basePorts;\n$pidToPort = @();\nforeach ($port in (Get-NetTCPConnection -RemoteAddress 0.0.0.0 -state Listen)){\n    if ($allPorts -notcontains $port.LocalPort){\n        $pidToPort += , @{pid=$port.OwningProcess;port=$port.LocalPort};\n    }\n};\n$pidToPort | ConvertTo-Json;',
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.ports",
            parserconfigs: [
              {
                target: "host.port.unauthorized",
                custom_parser_vals: {},
                edge: "has_port",
                source: "host.pid.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'function getFullList($portList){\n    $final = @();\n    foreach ($p in $portList) {\n        if ($p -like "*-*") {\n            $minmax = $p.Split("-");\n            for ($i = ($minmax[0] -as [int]); $i -lt ($minmax[1] -as [int]); $i++) {\n                $final += ($i -as [string]);\n            };\n        } else {\n            $final += $p;\n        };\n    };\n    return $final;\n};\n$basePorts = @("135","139","389","445","636","1000-5000","9389","49152-65535");\n$allPorts = getFullList $basePorts;\n$pidToPort = @();\nforeach ($port in (Get-NetTCPConnection -RemoteAddress 0.0.0.0 -state Listen)){\n    if ($allPorts -notcontains $port.LocalPort){\n        $pidToPort += , @{pid=$port.OwningProcess;port=$port.LocalPort};\n    }\n};\n$pidToPort | ConvertTo-Json;',
        language: null,
        name: " pwsh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.ports",
            parserconfigs: [
              {
                target: "host.port.unauthorized",
                custom_parser_vals: {},
                edge: "has_port",
                source: "host.pid.unauthorized",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:17:03",
    singleton: false,
    buckets: ["detection"],
    tactic: "detection",
    access: {},
    delete_payload: true,
    technique_id: "T1065",
    ability_id: "1b4aa8d5-ba97-4b9b-92a3-eaaaffbfdf0a",
    name: "비표준 포트 검색",
    technique_name: "Uncommonly Used Port",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description: "Get information from AV about suspicious files",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [],
    repeatable: true,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          "if (Test-Path C:\\Users\\Public\\malicious_files.txt -PathType Leaf) {\n  $hashes = Get-Content C:\\Users\\Public\\malicious_files.txt -Raw;\n  Remove-Item C:\\Users\\Public\\malicious_files.txt;\n  $hashes;\n}",
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.basic_strip",
            parserconfigs: [
              {
                target: "",
                custom_parser_vals: {},
                edge: "",
                source: "file.malicious.hash",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:17:03",
    singleton: false,
    buckets: ["detection"],
    tactic: "detection",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "77272c88-ccf5-4225-a3d9-f9e171d1ca5b",
    name: "의심스런 파일정보 획득",
    technique_name: "x",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description:
      "Use hash of known suspicious file to find instances of said file on hosts",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          "$paths = (Get-ChildItem #{file.search.directory} -Recurse -EA:SilentlyContinue | Get-FileHash -EA:SilentlyContinue |\nWhere-Object hash -eq #{file.malicious.hash} | foreach { $_.Path });\n$paths;",
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [
          {
            module: "plugins.response.app.parsers.basic_strip",
            parserconfigs: [
              {
                target: "",
                custom_parser_vals: {},
                edge: "",
                source: "host.malicious.file",
              },
            ],
          },
        ],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:59",
    singleton: false,
    buckets: ["hunt"],
    tactic: "hunt",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "f9b3eff0-e11c-48de-9338-1578b351b14b",
    name: "의심스런 파일 존재 여부 탐색",
    technique_name: "x",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description: "Force kill any unauthorized processes",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [
      {
        relationship_match: [
          {
            source: "host.pid.unauthorized",
          },
        ],
        module: "plugins.stockpile.app.requirements.paw_provenance",
      },
    ],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "linux",
        command: "kill -9 #{host.pid.unauthorized}",
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "darwin",
        command: "kill -9 #{host.pid.unauthorized}",
        language: null,
        name: "sh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command: "Stop-Process -Id #{host.pid.unauthorized} -Force",
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command: "Stop-Process -Id #{host.pid.unauthorized} -Force",
        language: null,
        name: "pwsh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command: "taskkill /pid #{host.pid.unauthorized} /f",
        language: null,
        name: "cmd",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:34",
    singleton: false,
    buckets: ["response"],
    tactic: "response",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "02fb7fa9-8886-4330-9e65-fa7bb1bc5271",
    name: "비인가 프로세스 종료",
    technique_name: "x",
    privilege: "",
  },
  {
    mitre_domain: "Enterprise",
    description: "Blocks inbound TCP and UDP traffic on a specific port",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [
      {
        relationship_match: [
          {
            source: "host.port.unauthorized",
            edge: "has_pid",
            target: "host.pid.unauthorized",
          },
        ],
        module: "plugins.response.app.requirements.basic",
      },
    ],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          'New-NetFirewallRule -DisplayName "Block in-bound UDP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Inbound -Protocol UDP -Action Block -LocalPort #{host.port.unauthorized};\nNew-NetFirewallRule -DisplayName "Block in-bound TCP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Inbound -Protocol TCP -Action Block -LocalPort #{host.port.unauthorized};',
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [
          'Remove-NetFirewallRule -DisplayName "Block in-bound UDP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}";\nRemove-NetFirewallRule -DisplayName "Block in-bound TCP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}";',
        ],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'New-NetFirewallRule -DisplayName "Block in-bound UDP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Inbound -Protocol UDP -Action Block -LocalPort #{host.port.unauthorized};\nNew-NetFirewallRule -DisplayName "Block in-bound TCP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Inbound -Protocol TCP -Action Block -LocalPort #{host.port.unauthorized};',
        language: null,
        name: " pwsh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [
          'Remove-NetFirewallRule -DisplayName "Block in-bound UDP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}";\nRemove-NetFirewallRule -DisplayName "Block in-bound TCP traffic to port #{host.port.unauthorized} from PID #{host.pid.unauthorized}";',
        ],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:34",
    singleton: false,
    buckets: ["response"],
    tactic: "response",
    access: {},
    delete_payload: true,
    technique_id: "T1065",
    ability_id: "debd322d-2100-45f7-8832-29ef7c56786d",
    name: "방화벽에 블랙리스트 인바운드 IP 추가",
    technique_name: "Uncommonly Used Port",
    privilege: "Elevated",
  },
  {
    mitre_domain: "Enterprise",
    description: "Blocks outbound TCP and UDP traffic on a specific port",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [
      {
        relationship_match: [
          {
            source: "remote.port.unauthorized",
            edge: "has_pid",
            target: "host.pid.unauthorized",
          },
        ],
        module: "plugins.response.app.requirements.basic",
      },
    ],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command:
          'New-NetFirewallRule -DisplayName "Block out-bound UDP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Outbound -Protocol UDP -Action Block -RemotePort #{remote.port.unauthorized};\nNew-NetFirewallRule -DisplayName "Block out-bound TCP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Outbound -Protocol TCP -Action Block -RemotePort #{remote.port.unauthorized};',
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [
          'Remove-NetFirewallRule -DisplayName "Block out-bound UDP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}";\nRemove-NetFirewallRule -DisplayName "Block out-bound TCP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}";',
        ],
        additional_info: {},
        timeout: 60,
        code: null,
      },
      {
        payloads: [],
        platform: "windows",
        command:
          'New-NetFirewallRule -DisplayName "Block out-bound UDP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Outbound -Protocol UDP -Action Block -RemotePort #{remote.port.unauthorized};\nNew-NetFirewallRule -DisplayName "Block out-bound TCP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}" -Group "Caldira" -Direction Outbound -Protocol TCP -Action Block -RemotePort #{remote.port.unauthorized};',
        language: null,
        name: " pwsh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [
          'Remove-NetFirewallRule -DisplayName "Block out-bound UDP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}";\nRemove-NetFirewallRule -DisplayName "Block out-bound TCP traffic to port #{remote.port.unauthorized} from PID #{host.pid.unauthorized}";',
        ],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:34",
    singleton: false,
    buckets: ["response"],
    tactic: "response",
    access: {},
    delete_payload: true,
    technique_id: "T1065",
    ability_id: "cb85039a-6196-4262-883b-0beeb804b83d",
    name: "방화벽에 블랙리스트 아웃바운드 IP 추가",
    technique_name: "Uncommonly Used Port",
    privilege: "Elevated",
  },
  {
    mitre_domain: "Enterprise",
    description:
      "Use hash of known suspicious file to find instances of said file, and delete instances",
    cve_info: ["undefined"],
    plugin: "",
    requirements: [
      {
        relationship_match: [
          {
            source: "host.malicious.file",
          },
        ],
        module: "plugins.stockpile.app.requirements.paw_provenance",
      },
    ],
    repeatable: false,
    additional_info: {},
    executors: [
      {
        payloads: [],
        platform: "windows",
        command: "Remove-Item -Path #{host.malicious.file} -Force;",
        language: null,
        name: "psh",
        build_target: null,
        uploads: [],
        parsers: [],
        variations: [],
        cleanup: [],
        additional_info: {},
        timeout: 60,
        code: null,
      },
    ],
    threat_group: ["undefined"],
    last_modified: "2023-09-24 12:16:34",
    singleton: false,
    buckets: ["response"],
    tactic: "response",
    access: {},
    delete_payload: true,
    technique_id: "x",
    ability_id: "5ec7ae3b-c909-41bb-9b6b-dadec409cd40",
    name: "의심스런 파일 삭제",
    technique_name: "x",
    privilege: "",
  },
];

// NDR 이벤트(의심 IP) 수신         930236c2-5397-4868-8c7b-72e294a5a376
// 비인가 프로세스 검색            3b4640bc-eacb-407a-a997-105e39788781
// 연결된 프로세스 검색            2331077e-7be9-4e89-b2bb-32e8d7f6a708
// 비표준 포트 검색               1b4aa8d5-ba97-4b9b-92a3-eaaaffbfdf0a
// 의심스런 파일정보 획득            77272c88-ccf5-4225-a3d9-f9e171d1ca5b
// 의심스런 파일 존재 여부 탐색         f9b3eff0-e11c-48de-9338-1578b351b14b
// 비인가 프로세스 종료            02fb7fa9-8886-4330-9e65-fa7bb1bc5271
// 방화벽에 블랙리스트 인바운드 IP 추가      debd322d-2100-45f7-8832-29ef7c56786d
// 방화벽에 블랙리스트 아웃바운드 IP 추가   cb85039a-6196-4262-883b-0beeb804b83d
// 의심스런 파일 삭제            5ec7ae3b-c909-41bb-9b6b-dadec409cd40

export async function fetchAttacks({
  query = "",
  page = 1,
  itemsPerPage = 10,
  log = false,
}: AttackRequest): Promise<AttackResponse> {
  page--;

  const path = "/attacks";

  const body = {
    page,
    items_per_page: itemsPerPage,
    name: query,
    platform: "",
    mitre: "",
    tactic: "",
    threat_group: "",
  };

  const headers: Record<string, string> = {
    Key: "BLUEADMIN123",
  };

  const response: AttackResponse = await proxyFetch({
    path,
    method: "POST",
    headers,
    body,
  });

  if (log) {
    console.log("PROXY FETCH Request:");
    console.log("→ Path:", path);
    console.log("→ Method:", "POST");
    console.log("→ Headers:", headers);
    console.log("→ Body:", body);
    console.log("← Response Data:", response);
  }

  if (page === 0) {
    response.data = DUMMY;
  }

  return response;
}
