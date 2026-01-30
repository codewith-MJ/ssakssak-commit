import { CommitFile, DiagramType } from "./commit";

type Analysis =
  | {
      type: "explanation";
      description: string;
    }
  | {
      type: "code-diff";
      title: string;
      description: string;
      files: CommitFile[];
      caption: string;
    }
  | {
      type: "diagram";
      diagram: DiagramType;
      title: string;
      description: string;
      chart: string;
      caption: string;
    };

export type ExplanationAnalysis = Extract<Analysis, { type: "explanation" }>;
export type CodeDiffAnalysis = Extract<Analysis, { type: "code-diff" }>;
export type DiagramAnalysis = Extract<Analysis, { type: "diagram" }>;

export type { Analysis };
