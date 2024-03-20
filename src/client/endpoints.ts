export const FIND_ROUTE = "/routing/scan"

export const ESTIMATE = "/estimate/"

export const CREATE_TRANSACTION = "tx/create"

export const SEARCH_TRANSACTION = (hash: string) => `/search?search={${hash}}&limit=1`