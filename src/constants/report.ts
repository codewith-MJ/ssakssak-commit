const SORT_FIELDS = {
  TITLE: "reportTitle",
  REPOSITORY: "repositoryName",
  BRANCH: "branch",
  CREATED_AT: "createdAt",
} as const;

const SORT_ORDERS = {
  ASC: "asc",
  DESC: "desc",
} as const;

const DEFAULT_PAGE_SIZE = 10;

const SEARCH_FIELDS = [
  SORT_FIELDS.TITLE,
  SORT_FIELDS.REPOSITORY,
  SORT_FIELDS.BRANCH,
] as const;

export { SORT_FIELDS, SORT_ORDERS, DEFAULT_PAGE_SIZE, SEARCH_FIELDS };
