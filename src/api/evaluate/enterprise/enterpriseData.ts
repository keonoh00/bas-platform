import ReconnaissanceTechniques from "./Reconnaissance.json";
import ResourceDevelopmentTechniques from "./Resource Development.json";
import InitialAccessTechniques from "./Initial Access.json";
import ExecutionTechniques from "./Execution.json";
import PersistenceTechniques from "./Persistence.json";
import PrivilegeEscalationTechniques from "./Privilege Escalation.json";
import DefenseEvasionTechniques from "./Defense Evasion.json";
import CredentialAccessTechniques from "./Credential Access.json";
import DiscoveryTechniques from "./Discovery.json";
import LateralMovementTechniques from "./Lateral Movement.json";
import CollectionTechniques from "./Collection.json";
import CommandAndControlTechniques from "./Command and Control.json";
import ExfiltrationTechniques from "./Exfiltration.json";
import ImpactTechniques from "./Impact.json";
import { SeverityEnum } from "../types";

export interface SubTechnique {
  name: string;
  id: string;
  severity: SeverityEnum;
  topCount: number;
  bottomCount: number;
  description: string;
}

export interface RawTechnique {
  name: string;
  id: string;
  severity: SeverityEnum;
  topCount: number;
  bottomCount: number;
  subtechniques?: SubTechnique[];
}

export interface RawTactic {
  name: string;
  techniques: RawTechnique[];
}

export const tacticsDataEnterprise: RawTactic[] = [
  {
    name: "Reconnaissance",
    techniques: ReconnaissanceTechniques as RawTechnique[],
  },
  {
    name: "Resource Development",
    techniques: ResourceDevelopmentTechniques as RawTechnique[],
  },
  {
    name: "InitialAccess",
    techniques: InitialAccessTechniques as RawTechnique[],
  },
  {
    name: "Execution",
    techniques: ExecutionTechniques as RawTechnique[],
  },
  {
    name: "Persistence",
    techniques: PersistenceTechniques as RawTechnique[],
  },
  {
    name: "Privilege Escalation",
    techniques: PrivilegeEscalationTechniques as RawTechnique[],
  },
  {
    name: "Defense Evasion",
    techniques: DefenseEvasionTechniques as RawTechnique[],
  },
  {
    name: "Credential Access",
    techniques: CredentialAccessTechniques as RawTechnique[],
  },
  {
    name: "Discovery",
    techniques: DiscoveryTechniques as RawTechnique[],
  },
  {
    name: "Lateral Movement",
    techniques: LateralMovementTechniques as RawTechnique[],
  },
  {
    name: "Collection",
    techniques: CollectionTechniques as RawTechnique[],
  },
  {
    name: "Command And Control",
    techniques: CommandAndControlTechniques as RawTechnique[],
  },
  {
    name: "Exfiltration",
    techniques: ExfiltrationTechniques as RawTechnique[],
  },
  {
    name: "Impact",
    techniques: ImpactTechniques as RawTechnique[],
  },
];
