export type DataTableFilterOption = {
  value: string;
  label: string;
};

export type DataTableFilter = {
  columnId: string;
  label: string;
  placeholder?: string;
  options: readonly DataTableFilterOption[];
  allValue?: string;
};

export type DataTableFilterTabOption = {
  value: string;
  label: string;
  count?: number;
};

export type DataTableFilterTabs = {
  columnId: string;
  ariaLabel: string;
  options: readonly DataTableFilterTabOption[];
  allValue?: string;
};
