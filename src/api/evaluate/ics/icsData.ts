import { RawTactic, RawTechnique } from "./../enterprise/enterpriseData";
import InitialAccessTechniques from "./Initial Access.json";
import ExecutionTechniques from "./Execution.json";
import PersistenceTechniques from "./Persistence.json";
import PrivilegeEscalationTechniques from "./Privilege Escalation.json";
import EvasionTechniques from "./Evasion.json";
import DiscoveryTechniques from "./Discovery.json";
import LateralMovementTechniques from "./Lateral Movement.json";
import CollectionTechniques from "./Collection.json";
import CommandAndControlTechniques from "./Command and Control.json";
import InhibitResponseFunctionTechniques from "./Inhibit Response Function.json";
import ImpairProcessControlTechniques from "./Impair Process Control.json";
import ImpactTechniques from "./Impact.json";

export const tacticsDataICS: RawTactic[] = [
  {
    name: "Initial Access",
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
    name: "Evasion",
    techniques: EvasionTechniques as RawTechnique[],
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
    name: "Command and Control",
    techniques: CommandAndControlTechniques as RawTechnique[],
  },
  {
    name: "Inhibit Response Function",
    techniques: InhibitResponseFunctionTechniques as RawTechnique[],
  },
  {
    name: "Impair Process Control",
    techniques: ImpairProcessControlTechniques as RawTechnique[],
  },
  {
    name: "Impact",
    techniques: ImpactTechniques as RawTechnique[],
  },
];
