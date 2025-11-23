import { CommitDetail } from "./commit";

type ReportFormState = undefined | { ok: false; formError: string };

interface ReportData {
  reportId?: string;
  reportTitle: string;
  reportSummary: string;
  commits: CommitDetail[];
  reportConclusion: string;
  repositoryUrl: string;
  branch: string;
}

interface ReportListItem {
  reportId: string;
  reportTitle: string;
  repositoryName: string;
  owner: string;
  branch: string;
  repositoryUrl?: string;
  createdAt: string;
}

type SortField = "reportTitle" | "repositoryName" | "branch" | "createdAt";
type SortOrder = "asc" | "desc";

export type {
  ReportData,
  ReportFormState,
  ReportListItem,
  SortField,
  SortOrder,
};
