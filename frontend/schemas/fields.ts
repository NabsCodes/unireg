import { z } from "zod";

export function requiredTrimmedText(min: number, message: string) {
  return z.string().trim().min(min, message);
}

export const emailSchema = z.email("Enter a valid email address");
