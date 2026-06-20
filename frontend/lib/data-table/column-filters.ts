export const ALL_FILTER_VALUE = "all";

export function isActiveFilterValue(
  value: unknown,
  allValue = ALL_FILTER_VALUE,
) {
  return (
    value !== undefined && value !== null && value !== "" && value !== allValue
  );
}
