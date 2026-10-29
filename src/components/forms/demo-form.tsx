"use client";

import Link from "next/link";
import { useActionState, type FC } from "react";

import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import Field, {
  describedBy,
  Input,
  Select,
  Textarea,
} from "@/components/ui/field";
import { track } from "@/lib/analytics";

import { requestDemo } from "./actions";
import { teamSizes, type DemoValues, type FormState } from "./schema";

interface DemoFormProps {
  source: string;
  submitLabel?: string;
}

const DemoForm: FC<DemoFormProps> = ({
  source,
  submitLabel = "Request a demo",
}) => {
  // State
  const [state, formAction, isPending] = useActionState(
    async (previous: FormState, formData: FormData) => {
      const result = await requestDemo(previous, formData);
      if (result.status === "success")
        track("form_submit", `demo_${source.replace(/\W+/g, "_")}`);
      return result;
    },
    { status: "idle" } as FormState,
  );

  // Derived
  const errors = state.status === "invalid" ? state.errors : {};
  const values = "values" in state ? (state.values ?? {}) : {};
  const fieldProps = (name: keyof DemoValues) => ({
    id: `demo-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(`demo-${name}`, errors[name]),
  });

  if (state.status === "success") {
    return (
      <div role="status">
        <Alert tone="success" title="Request received">
          Thanks. This is a case study, so nobody will call you, but your
          request was validated, rate-limited and stored in a private Sanity
          dataset, just as a real one would be.
        </Alert>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {state.status === "error" && (
        <div role="alert">
          <Alert tone="danger" title="That didn't go through">
            {state.message}
          </Alert>
        </div>
      )}
      {state.status === "invalid" && (
        <p role="alert" className="text-body-sm text-red-500">
          Please fix the {Object.keys(errors).length === 1 ? "field" : "fields"}{" "}
          marked below.
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="demo-name" label="Full name" isRequired error={errors.name}>
          <Input
            {...fieldProps("name")}
            autoComplete="name"
            placeholder="Ada Lovelace"
          />
        </Field>
        <Field
          id="demo-email"
          label="Work email"
          isRequired
          error={errors.email}
        >
          <Input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            placeholder="ada@company.com"
          />
        </Field>
        <Field
          id="demo-company"
          label="Company"
          isRequired
          error={errors.company}
        >
          <Input
            {...fieldProps("company")}
            autoComplete="organization"
            placeholder="Analytical Engines Ltd"
          />
        </Field>
        <Field
          id="demo-teamSize"
          label="Team size"
          isRequired
          error={errors.teamSize}
        >
          <Select {...fieldProps("teamSize")}>
            <option value="" disabled>
              Choose a size
            </option>
            {teamSizes.map((size) => (
              <option key={size} value={size}>
                {size} people
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        id="demo-message"
        label="What would you automate first?"
        hint="Optional, up to 1,000 characters"
        error={errors.message}
      >
        <Textarea
          {...fieldProps("message")}
          aria-describedby={describedBy(
            "demo-message",
            errors.message,
            "Optional",
          )}
          rows={4}
        />
      </Field>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <input type="hidden" name="source" value={source} />
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full sm:w-auto sm:self-start"
      >
        {isPending ? "Sending…" : submitLabel}
      </Button>
      <p className="text-body-xs text-muted">
        Case study: details go to a private dataset, are never shared, and are
        deleted within 30 days. See the{" "}
        <Link href="/legal/privacy" className="underline hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
};

export default DemoForm;
