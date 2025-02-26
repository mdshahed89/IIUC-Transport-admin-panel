export function getRecentEntries(data, count = 10) {
  return data
    ?.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt)) // Sort by updatedAt (descending)
    .slice(0, count); // Get the most recent 10 entries
}
