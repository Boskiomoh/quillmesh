"use client";

import { useActionState, type FC } from "react";

import Button from "@/components/ui/button";
import { controlClasses } from "@/components/ui/field";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

import { subscribe } from "./actions";
import type { FormState } from "./schema";

interface NewsletterFormProps {
  tone: "dark" | "blue" | "light";
}

const NewsletterForm: FC<NewsletterFormProps> = ({ tone }) => {
  // Derived
  const isStacked = tone !== "dark";
  const id = `newsletter-email-${tone}`;

  // State
  const [state, formAction, isPending] = useActionState(
    async (previous: FormState, formData: FormData) => {
      const result = await subscribe(previous, formData);
      if (result.status === "success") track("form_submit", "newsletter");
      return result;
    },
    { status: "idle" } as FormState,
  );

  const error =
    state.status === "invalid"
      ? state.errors.email
      : state.status === "error"
        ? state.message
        : undefined;

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "text-body-sm",
          tone === "light" ? "text-green-500" : "text-tertiary-200",
        )}
      >
        You&apos;re on the list. (This is a case study, so no emails will
        actually be sent.)
      </p>
    );
  }

  return (
    <form action={formAction} noValidate className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "flex w-full gap-3",
          isStacked ? "flex-col" : "flex-col sm:flex-row",
        )}
      >
        <label htmlFor={id} className="sr-only">
          Work email
        </label>
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="work@email.com"
          defaultValue={"values" in state ? state.values?.email : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlClasses, "flex-1 py-1 text-body-xs")}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <Button
          type="submit"
          look={tone === "light" ? "filled" : "outline"}
          variant={tone === "light" ? "primary" : "mono"}
          size="sm"
          disabled={isPending}
          className={cn(
            "px-7",
            tone !== "light" && "border-surface text-surface hover:bg-white/10",
          )}
        >
          {isPending ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <p
        id={`${id}-error`}
        role="alert"
        className={cn(
          "min-h-5 text-start text-body-xs",
          tone === "light" ? "text-red-500" : "text-red-50",
        )}
      >
        {error}
      </p>
    </form>
  );
};

export default NewsletterForm;
