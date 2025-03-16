// @/lib/types.ts
export type Task = {
  id: string;
  name: string;
  status: string;
  description?: string;
  type?: string;
  // Có thể thêm các field khác từ API nếu cần
  tsp?: number;
  spLeft?: number;
  spPredicted?: number;
  assignee?: string;
  userId?: string;
  dependencies?: string[];
  path?: string;
  modelId?: string;
};
