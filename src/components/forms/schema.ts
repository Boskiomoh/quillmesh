import { z } from "zod";

export const teamSizes = ["1-10", "11-50", "51-200", "201+"] as const;

export const demoSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name")
    .max(80, "Use 80 characters or fewer"),
  email: z.email("Enter a work email like name@company.com").max(120),
  company: z
    .string()
    .trim()
    .min(2, "Enter your company")
    .max(80, "Use 80 characters or fewer"),
  teamSize: z.enum(teamSizes, "Choose a team size"),
  message: z.string().trim().max(1000, "Use 1,000 characters or fewer"),
  website: z.string().max(0),
  source: z.string().regex(/^[a-z0-9/_-]{0,60}$/),
});

export const newsletterSchema = z.strictObject({
  email: z.email("Enter a valid email"),
  website: z.string().max(0),
});

export type DemoValues = z.infer<typeof demoSchema>;
export type FieldErrors = Partial<Record<keyof DemoValues, string>>;

export type SubmittedValues = Partial<Record<string, string>>;

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: FieldErrors; values: SubmittedValues }
  | { status: "error"; message: string; values?: SubmittedValues };

export const fieldErrors = (error: z.ZodError): FieldErrors =>
  Object.fromEntries(
    error.issues.map((issue) => [issue.path[0], issue.message]),
  );

export const formValues = (formData: FormData): SubmittedValues =>
  Object.fromEntries(
    [...formData.entries()].filter(
      ([name, value]) => !name.startsWith("$") && typeof value === "string",
    ),
  ) as SubmittedValues;
