import {
  BookOpen,
  CalendarRange,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Scale,
  ScrollText,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";
import type { Route } from "next";

type NavItem = {
  label: string;
  href: Route;
  icon: typeof LayoutDashboard;
};

export const adminNavigation: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Departments", href: "/admin/departments", icon: ShieldCheck },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Lecturers", href: "/admin/lecturers", icon: GraduationCap },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Offerings", href: "/admin/offerings", icon: ClipboardList },
  { label: "Academic Setup", href: "/admin/academic", icon: CalendarRange },
  { label: "Result Oversight", href: "/admin/results", icon: Upload },
  { label: "Grade Scale", href: "/admin/grade-scale", icon: Scale },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
];

export const lecturerNavigation: NavItem[] = [
  { label: "Dashboard", href: "/lecturer/dashboard", icon: LayoutDashboard },
  { label: "Assigned Courses", href: "/lecturer/courses", icon: BookOpen },
  { label: "Upload Results", href: "/lecturer/results", icon: Upload },
];

export const studentNavigation: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  {
    label: "Course Registration",
    href: "/student/registration",
    icon: ClipboardList,
  },
  { label: "Results", href: "/student/results", icon: BookOpen },
  { label: "Transcript", href: "/student/transcript", icon: ScrollText },
];
