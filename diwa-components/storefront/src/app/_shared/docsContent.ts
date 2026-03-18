export type DocStep = {
  title: string;
  description: string;
  code?: string;
};

export type DocLinkAction = {
  href: string;
  label: string;
  description: string;
  external?: boolean;
};

export type DocDetail = {
  title: string;
  intro: string;
  prerequisites?: string[];
  steps?: DocStep[];
  notesTitle?: string;
  notes?: string[];
  troubleshooting?: string[];
  nextActions: DocLinkAction[];
};
