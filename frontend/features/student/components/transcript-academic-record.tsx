"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";

import { DataTableEmpty } from "@/components/shared/data-table-empty";
import { StatusBadge } from "@/components/shared/status-badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  filterTranscriptGroups,
  getTranscriptSessions,
  groupTranscriptRows,
} from "@/lib/academic/transcript-groups";
import { formatGradePoint, formatScore } from "@/lib/format/academic";
import { cn } from "@/lib/utils";
import type { StudentResultRow } from "@/types/academic";

type TranscriptAcademicRecordProps = {
  rows: StudentResultRow[];
};

function isPendingCourse(course: StudentResultRow): boolean {
  return course.grade == null;
}

function TranscriptGradeCell({ course }: { course: StudentResultRow }) {
  if (isPendingCourse(course)) {
    return <StatusBadge label="Pending" tone="pending" />;
  }

  return <span>{course.grade}</span>;
}

function TranscriptSemesterStats({
  group,
}: {
  group: ReturnType<typeof groupTranscriptRows>[number];
}) {
  const isFilteredView =
    group.matchedCourseCount != null &&
    group.matchedCourseCount !== group.courseCount;

  return (
    <div className="text-muted-foreground shrink-0 text-right text-sm">
      <p>
        {group.courseCount} course{group.courseCount === 1 ? "" : "s"} ·{" "}
        {group.totalCredits} credits
        {group.pendingCount > 0 ? ` · ${group.pendingCount} pending` : ""}
      </p>
      {isFilteredView ? (
        <p className="text-xs">
          Showing {group.matchedCourseCount} matching course
          {group.matchedCourseCount === 1 ? "" : "s"}
        </p>
      ) : null}
      <div className="mt-1 flex items-center justify-end gap-4">
        <p className="tabular-nums">
          <span className="font-normal">GPA </span>
          <span className="text-foreground font-medium">
            {formatGradePoint(group.semesterGpa)}
          </span>
        </p>
        <p className="tabular-nums">
          <span className="font-normal">CGPA </span>
          <span className="text-foreground font-medium">
            {formatGradePoint(group.cgpa)}
          </span>
        </p>
      </div>
    </div>
  );
}

function TranscriptCourseCard({ course }: { course: StudentResultRow }) {
  const pending = isPendingCourse(course);

  return (
    <article className={cn("space-y-2 py-3", pending && "opacity-90")}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{course.courseCode}</p>
          <p className="text-muted-foreground text-xs">{course.courseTitle}</p>
        </div>
        <TranscriptGradeCell course={course} />
      </div>
      <dl className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-muted-foreground">Credits</dt>
          <dd className="tabular-nums">{course.creditUnits}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Score</dt>
          <dd className="tabular-nums">
            {pending ? (
              <span className="text-muted-foreground">Not published</span>
            ) : (
              formatScore(course.totalScore)
            )}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">GPA</dt>
          <dd className="tabular-nums">
            {pending ? (
              <span className="text-muted-foreground">—</span>
            ) : (
              formatGradePoint(course.gradePoint)
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function TranscriptSemesterPanel({
  group,
  expanded,
  onToggle,
}: {
  group: ReturnType<typeof groupTranscriptRows>[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="border-border rounded-lg border">
      <button
        aria-expanded={expanded}
        className="hover:bg-muted/40 flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors"
        onClick={onToggle}
        type="button"
      >
        <div className="flex min-w-0 items-start gap-3">
          <ChevronRight
            className={cn(
              "text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform",
              expanded && "rotate-90",
            )}
          />
          <div className="min-w-0">
            <p className="font-medium">{group.session}</p>
            <p className="text-muted-foreground text-sm">{group.semester}</p>
          </div>
        </div>
        <TranscriptSemesterStats group={group} />
      </button>

      {expanded ? (
        <div className="border-border border-t">
          <div className="divide-border divide-y px-4 md:hidden">
            {group.courses.map((course) => (
              <TranscriptCourseCard course={course} key={course.id} />
            ))}
          </div>

          <div className="hidden overflow-x-auto px-4 pb-4 md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">GPA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.courses.map((course) => {
                  const pending = isPendingCourse(course);

                  return (
                    <TableRow
                      className={cn(pending && "bg-muted/20")}
                      key={course.id}
                    >
                      <TableCell>
                        <p className="font-medium">{course.courseCode}</p>
                        <p className="text-muted-foreground text-xs">
                          {course.courseTitle}
                        </p>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {course.creditUnits}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {pending ? (
                          <span className="text-muted-foreground text-sm">
                            Not published
                          </span>
                        ) : (
                          formatScore(course.totalScore)
                        )}
                      </TableCell>
                      <TableCell>
                        <TranscriptGradeCell course={course} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {pending ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          formatGradePoint(course.gradePoint)
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function TranscriptAcademicRecord({
  rows,
}: TranscriptAcademicRecordProps) {
  const groups = useMemo(() => groupTranscriptRows(rows), [rows]);
  const sessions = useMemo(() => getTranscriptSessions(groups), [groups]);
  const [sessionFilter, setSessionFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string> | null>(null);

  const filteredGroups = useMemo(
    () =>
      filterTranscriptGroups(groups, {
        session: sessionFilter === "all" ? undefined : sessionFilter,
        search,
      }),
    [groups, search, sessionFilter],
  );

  const visibleExpandedIds = useMemo(() => {
    const visibleGroupIds = new Set(filteredGroups.map((group) => group.id));

    if (expandedIds === null) {
      return filteredGroups[0] ? new Set([filteredGroups[0].id]) : new Set();
    }

    return new Set(
      [...expandedIds].filter((groupId) => visibleGroupIds.has(groupId)),
    );
  }, [expandedIds, filteredGroups]);

  function toggleGroup(groupId: string) {
    setExpandedIds((current) => {
      const visibleGroupIds = new Set(filteredGroups.map((group) => group.id));
      const base: Set<string> =
        current === null
          ? filteredGroups[0]
            ? new Set([filteredGroups[0].id])
            : new Set<string>()
          : current;
      const next = new Set<string>(
        [...base].filter((id) => visibleGroupIds.has(id)),
      );

      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }

      return next;
    });
  }

  if (rows.length === 0) {
    return (
      <DataTableEmpty
        description="Transcript rows will appear as results are published each semester."
        title="No transcript records"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {sessions.length > 1 ? (
          <Tabs onValueChange={setSessionFilter} value={sessionFilter}>
            <TabsList>
              <TabsTrigger value="all">All sessions</TabsTrigger>
              {sessions.map((session) => (
                <TabsTrigger key={session} value={session}>
                  {session}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <p className="text-muted-foreground text-sm">
            {groups.length} semester{groups.length === 1 ? "" : "s"} on record
          </p>
        )}

        <div className="relative w-full sm:max-w-xs">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses..."
            value={search}
          />
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <DataTableEmpty
          description="Try another session or clear your course search."
          title="No matching records"
        />
      ) : (
        <div className="space-y-3">
          {filteredGroups.map((group) => (
            <TranscriptSemesterPanel
              expanded={visibleExpandedIds.has(group.id)}
              group={group}
              key={group.id}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
