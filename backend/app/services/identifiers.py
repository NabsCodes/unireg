import re

from app.services.query import fetch_one

_DEPT_STAFF_CODES = {
    "computer science": "CS",
    "software engineering": "SE",
    "information systems": "IS",
}


def department_staff_code(dept_name: str) -> str:
    normalized = dept_name.strip().lower()
    if normalized in _DEPT_STAFF_CODES:
        return _DEPT_STAFF_CODES[normalized]

    parts = [part for part in dept_name.split() if part]
    if len(parts) >= 2:
        return f"{parts[0][0]}{parts[1][0]}".upper()
    if parts:
        return parts[0][:2].upper()
    return "GEN"


def next_matric_no() -> str:
    row = fetch_one(
        """
        SELECT
            COALESCE(
                MAX(CAST(SUBSTRING(matric_no FROM 2) AS integer)),
                0
            ) + 1 AS next_no
        FROM student
        WHERE matric_no ~ '^A[0-9]+$'
        """
    )
    next_no = int(row["next_no"]) if row else 1
    return f"A{next_no:08d}"


def next_staff_no(dept_id: int) -> str:
    dept = fetch_one(
        "SELECT dept_name FROM department WHERE dept_id = %s",
        (dept_id,),
    )
    if dept is None:
        msg = "Department not found"
        raise ValueError(msg)

    code = department_staff_code(dept["dept_name"])
    pattern = f"^STF-{re.escape(code)}-[0-9]+$"
    row = fetch_one(
        """
        SELECT
            COALESCE(
                MAX(
                    CAST(
                        regexp_replace(staff_no, '^STF-[A-Z]+-', '')
                        AS integer
                    )
                ),
                0
            ) + 1 AS next_no
        FROM lecturer
        WHERE staff_no ~ %s
        """,
        (pattern,),
    )
    next_no = int(row["next_no"]) if row else 1
    return f"STF-{code}-{next_no:03d}"
