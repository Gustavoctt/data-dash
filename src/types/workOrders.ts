export interface IWorkOrders {
  id: number;
  assetId: number;
  assignedUserIds: number[];
  checklist: {
    completed: boolean;
    task: string;
  }[];
  description: string;
  priority: string;
  status: string;
  title: string;
}
