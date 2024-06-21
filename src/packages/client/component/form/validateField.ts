/*
 * Function to validate password when sign up
 */

import { z } from "zod";

// Example list of common dictionary words and names for demonstration
const commonWords = ["password", "123456", "qwerty", "admin", "123456789"];

// Types for validation result and error messages
type ValidationResult = z.SafeParseReturnType<string, string>;

export const validateField = (
  value: string,
  setPassMessage: (msg: string) => void,
  setIsPassValid: (valid: boolean) => void,
) => {
  const passwordSchema = z
    .string()
    .min(12, { message: "Password must be at least 12 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol",
    })
    .refine((password) => !commonWords.includes(password.toLowerCase()), {
      message: "Password should not be a common dictionary word or name",
    });

  let res: ValidationResult;

  res = passwordSchema.safeParse(value);

  if (!res.success) {
    // If validation failed, extract the error messages
    const errorMessage = res.error.errors[0]?.message || "Invalid input";

    setIsPassValid(false);
    setPassMessage(errorMessage);
  } else {
    setIsPassValid(true);
    setPassMessage("");
  }
};
