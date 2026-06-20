import { FileSearch } from "lucide-react";

type DataTableEmptyProps = {
  title?: string;
  description?: string;
};

export function DataTableEmpty({
  title = "No records yet",
  description = "No records match the current filters.",
}: DataTableEmptyProps) {
  return (
    <div className="border-border bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
      <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg">
        <FileSearch className="size-5" />
      </div>
      <p className="text-foreground mt-4 text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {description}
      </p>
    </div>
  );
}
