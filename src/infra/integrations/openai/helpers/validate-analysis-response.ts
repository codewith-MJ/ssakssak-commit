import { UnprocessableEntityError } from "@/errors";
import { z } from "zod";
import { commitAnalysesSchema } from "@/lib/validators/structured-analysis-result";
import { GithubCommit } from "@/types/commit";
import { OPENAI_ERROR_MESSAGES } from "@/constants/error-messages";

type CommitAnalysesResult = z.infer<typeof commitAnalysesSchema>;
type AnalyzedCommit = CommitAnalysesResult["commits"][number];

const { COMMIT_ID_DUPLICATE, MISSING_REQUIRED_ANALYSES } =
  OPENAI_ERROR_MESSAGES;

const buildCommitIdToHasPatch = (
  inputBatch: GithubCommit[],
): Map<string, boolean> => {
  const map = new Map<string, boolean>();
  for (const commit of inputBatch) {
    const hasPatch = commit.files.some(
      (f) => f.codeDiffSummary?.trim().length > 0,
    );
    map.set(commit.commitId, hasPatch);
  }
  return map;
};

const validateCommitIdUniqueness = (commits: AnalyzedCommit[]): void => {
  const commitIds = commits.map((commit) => commit.commitId);
  const uniqueCommitIds = new Set(commitIds);

  if (commitIds.length !== uniqueCommitIds.size) {
    const duplicates = commitIds.filter(
      (id, index) => commitIds.indexOf(id) !== index,
    );
    throw new UnprocessableEntityError({
      message: `${COMMIT_ID_DUPLICATE} 중복된 commitId: ${Array.from(new Set(duplicates)).join(", ")}`,
    });
  }
};

const validateRequiredAnalyses = (
  commits: AnalyzedCommit[],
  commitIdToHasPatch?: Map<string, boolean>,
): void => {
  const missingAnalyses: string[] = [];

  for (const commit of commits) {
    const hasCodeDiff = commit.analyses.some(
      (analysis) => analysis.type === "code-diff",
    );
    const hasExplanation = commit.analyses.some(
      (analysis) => analysis.type === "explanation",
    );

    if (!hasExplanation) {
      missingAnalyses.push(`commitId: ${commit.commitId} (explanation 누락)`);
    }
    if (!hasCodeDiff && !hasExplanation) {
      missingAnalyses.push(
        `commitId: ${commit.commitId} (code-diff와 explanation 모두 누락)`,
      );
    }
    if (commitIdToHasPatch?.get(commit.commitId) === true && !hasCodeDiff) {
      missingAnalyses.push(
        `commitId: ${commit.commitId} (code-diff 누락, 해당 커밋에 patch 존재)`,
      );
    }
  }

  if (missingAnalyses.length > 0) {
    throw new UnprocessableEntityError({
      message: `${MISSING_REQUIRED_ANALYSES} ${missingAnalyses.join("; ")}`,
    });
  }
};

const validateCommitAnalysesResponse = (
  result: CommitAnalysesResult,
  inputBatch?: GithubCommit[],
): void => {
  validateCommitIdUniqueness(result.commits);
  const commitIdToHasPatch = inputBatch
    ? buildCommitIdToHasPatch(inputBatch)
    : undefined;
  validateRequiredAnalyses(result.commits, commitIdToHasPatch);
};

export { validateCommitAnalysesResponse };
