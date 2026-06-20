import { z } from "zod";

import { requiredTrimmedText } from "@/schemas/fields";

export const loginFormSchema = z.object({
  identifier: requiredTrimmedText(
    3,
    "Enter your email, matric number, or staff number",
  ),
  password: requiredTrimmedText(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormValues = {
  identifier: "",
  password: "",
};
