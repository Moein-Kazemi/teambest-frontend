export interface ITeamMember {
  memberId: string;
  memberName: string;
  memberAvatar: string;
  memberJobTitle: string;
}

// ==================== ITeamProject ====================
export interface ITeamProject {
  projectId: string;
  projectName: string;
}
// ==================== ITeam ====================
export interface ITeam {
  name: string;
  summary: string;
  logo: string;
  ownerId: string;
  members: ITeamMember[];
  projects?: ITeamProject[];
}
