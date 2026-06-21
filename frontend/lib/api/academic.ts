import { apiGet } from "@/lib/api/client";
import { usesMockData } from "@/lib/api/config";
import { currentAcademicPeriod } from "@/content/data/portal";

export type CurrentAcademicPeriod = {
  session: string;
  semester: string;
  label: string;
  helper: string;
};

type ApiCurrentAcademicPeriod = {
  session_name: string;
  semester_name: string;
};

function mapCurrentAcademicPeriod(
  row: ApiCurrentAcademicPeriod,
): CurrentAcademicPeriod {
  const label = `${row.session_name} · ${row.semester_name}`;
  return {
    session: row.session_name,
    semester: row.semester_name,
    label,
    helper: "Current academic period",
  };
}

export async function getCurrentAcademicPeriod(): Promise<CurrentAcademicPeriod> {
  if (usesMockData()) {
    return currentAcademicPeriod;
  }

  const period = await apiGet<ApiCurrentAcademicPeriod>(
    "/api/academic/current-period",
  );
  return mapCurrentAcademicPeriod(period);
}
