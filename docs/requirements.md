# Requirements

## Project

Design and Implementation of a University Course Registration and Result Management System.

## Source Brief

Course: CSC 384 Database Systems

Group 1 topic: University Course Registration and Result Management System

## Objectives

- Design a relational database for academic records.
- Implement course registration processes.
- Store and manage student results securely.
- Generate transcripts and semester reports.
- Enforce user authentication and access control.

## Major Modules

- Student Management
- Department and Course Management
- Course Registration
- Result Upload and Processing
- GPA/CGPA Computation
- Transcript Generation
- Admin Dashboard

## Required Database Concepts

- ER modeling
- Normalization
- SQL queries
- Stored procedures or functions
- Triggers
- Views
- Constraints
- Transactions

## Current Decisions

- PostgreSQL is the target database.
- GPA/CGPA logic follows the school model already used in Nabeel's CGPA calculator.
- Raw SQL deliverables should be kept in the repo even if the app uses a framework.
- The ERD should be written in Mermaid, not manual SVG.
- Results should link to course registrations, not directly to student and course pairs.

## Open Questions

- Is the backend stack flexible, or must it be PHP, Python, or Java?
- Does the Monday target mean a checkpoint, proposal, or functional demo?
- Should the final demo run only locally, or should it be deployed?
- Does the lecturer expect MySQL specifically, or is PostgreSQL fully acceptable?

