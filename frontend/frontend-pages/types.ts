// types.ts
export type TeamMember = {
  id: string;
  name: string;
  position: string;
  advantage: string;
  avatarUrl: string;
  accentColor: string;
  modelId: string;
};

export type SelectedMember = {
  position: string;
  id: string;
  name: string;
  avatarUrl: string;
};
