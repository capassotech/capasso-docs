export interface StackBadge {
  label: string;
  color: string;
}

export interface OverviewMeta {
  label: string;
  value: string;
}

export interface Overview {
  about: string;
  objective: string;
  keyPoints: string[];
  meta: OverviewMeta[];
}

export interface FolderItem {
  path: string;
  desc: string;
}

export interface Module {
  name: string;
  tag: string;
  desc: string;
}

export interface Environment {
  name: string;
  type: string;
  url: string;
  branch: string;
  hosting: string;
}

export interface BranchConvention {
  prefix: string;
  format: string;
  use: string;
  origin?: string;
}

export interface CommitFlowStep {
  step: string;
  action: string;
  detail: string;
}

export interface EnvVar {
  key: string;
  value: string;
  desc: string;
}

export interface EnvGroup {
  name: string;
  label: string;
  vars: EnvVar[];
}

export interface DeployRow {
  key: string;
  value: string;
}

export interface Deploy {
  title: string;
  rows: DeployRow[];
  checklist?: string[];
}

export interface PlatformLink {
  label: string;
  url: string;
  desc?: string;
}

export interface PlatformGroup {
  category: string;
  links: PlatformLink[];
}

export interface Subproject {
  id: string;
  name: string;
  description: string;
  stack: StackBadge[];
  overview?: Overview;
  folderStructure?: FolderItem[];
  modules?: Module[];
  environments?: Environment[];
  branchConventions?: BranchConvention[];
  commitFlow?: CommitFlowStep[];
  envGroups?: EnvGroup[];
  deploys?: Deploy[];
  platforms?: PlatformGroup[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  platforms?: PlatformGroup[];
  subprojects: Subproject[];
}
