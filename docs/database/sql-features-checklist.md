# SQL Features Checklist

## ER Modeling

- [x] Mermaid ERD created
- [ ] ERD reviewed with Batul
- [ ] ERD converted into final SQL schema

## Normalization

- [x] Initial 3NF explanation drafted
- [ ] Confirm every table has one responsibility
- [ ] Add normalization section to report

## Constraints

- [ ] Primary keys
- [ ] Foreign keys
- [ ] Unique constraints
- [ ] Check constraints for roles, scores, status, and credit units
- [ ] Nullable HOD relationship handled safely

## Views

- [ ] Student transcript view
- [ ] Semester result summary view
- [ ] Admin dashboard summary view

## Functions Or Stored Procedures

- [ ] Function to compute semester GPA
- [ ] Function to compute CGPA
- [ ] Procedure/function to register a student for a course offering
- [ ] Procedure/function to upload or update result

## Triggers

- [ ] Trigger to assign grade and grade point from total score
- [ ] Trigger to write result changes to `AUDIT_LOG`

## Transactions

- [ ] Course registration transaction
- [ ] Result upload transaction
- [ ] Demo rollback example

## Sample Queries

- [ ] List courses available to a student
- [ ] List registered courses for a semester
- [ ] Show lecturer assigned courses
- [ ] Generate transcript
- [ ] Compute GPA/CGPA
- [ ] Show audit history for result changes

