export interface IAssets {
  assignedUserIds: [];
  companyId: number;
  healthHistory: [
    {
      status:
        | "inAlert"
        | "inOperation"
        | "inDowntime"
        | "plannedStop"
        | "unplannedStop";
      timestamp: string;
    }
  ];
  healthscore: number;
  id: number;
  image: string;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  model: string;
  name: string;
  sensors: [];
  specifications: {
    maxTemp: number | null;
    power: number | null;
    rpm: number | null;
  };
  status:
    | "inAlert"
    | "inOperation"
    | "inDowntime"
    | "plannedStop"
    | "unplannedStop";
  unitId: string;
}
