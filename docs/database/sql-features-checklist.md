# SQL Features Checklist

## ER Modeling

- [x] Mermaid ERD created
- [ ] ERD reviewed with Batul
- [x] ERD converted into final SQL schema

## Normalization

- [x] Initial 3NF explanation drafted
- [x] Confirm every table has one responsibility
- [ ] Add normalization section to report

## Constraints

- [x] Primary keys
- [x] Foreign keys
- [x] Unique constraints
- [x] Check constraints for roles, scores, status, and credit units
- [x] Nullable HOD relationship handled safely

## Views

- [x] Student transcript view
- [x] Semester result summary view
- [x] Admin dashboard summary view

## Functions Or Stored Procedures

- [x] Function to compute semester GPA
- [x] Function to compute CGPA
- [x] Procedure/function to register a student for a course offering
- [x] Procedure/function to upload or update result

## Triggers

- [x] Trigger to assign grade and grade point from total score
- [x] Trigger to write result changes to `AUDIT_LOG`

## Transactions

- [x] Course registration transaction
- [x] Result upload transaction
- [x] Demo rollback example

## Sample Queries

- [x] List courses available to a student
- [x] List registered courses for a semester
- [x] Show lecturer assigned courses
- [x] Generate transcript
- [x] Compute GPA/CGPA
- [x] Show audit history for result changes
