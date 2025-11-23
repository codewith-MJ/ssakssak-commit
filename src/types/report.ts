import { SORT_FIELDS, SORT_ORDERS } from "@/constants/report";
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

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];
type SortOrder = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];

export type {
  ReportData,
  ReportFormState,
  ReportListItem,
  SortField,
  SortOrder,
};
