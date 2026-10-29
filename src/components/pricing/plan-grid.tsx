"use client";

import {
  ArrowRightIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";

import TrackedButton from "@/components/analytics/tracked-button";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { PricingQueryResult } from "@/sanity/types";

type Plan = PricingQueryResult["plans"][number];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface PlanCardsProps {
  plans: Plan[];
  isAnnual: boolean;
  onToggle?: () => void;
}

export const PlanCards: FC<PlanCardsProps> = ({
  plans,
  isAnnual,
  onToggle,
}) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center gap-4 pt-6 text-body-sm">
        <span id="billing-monthly">Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          aria-labelledby="billing-monthly billing-annual"
          disabled={!onToggle}
          onClick={onToggle}
          className={cn(
            "flex h-6 w-12 items-center rounded-full border p-1 transition-colors",
            isAnnual
              ? "justify-end border-primary-700 bg-primary-50"
              : "justify-start border-subtle bg-surface",
          )}
        >
          <span
            className={cn(
              "size-4 rounded-full transition-colors",
              isAnnual ? "bg-brand" : "bg-neutral-400",
            )}
          />
        </button>
        <span className="flex items-center gap-2">
          <span id="billing-annual">Annually</span>
          <Badge tone="success">SAVE 30%</Badge>
        </span>
      </div>
      <h2 className="sr-only">Plans</h2>
      <ul className="grid w-full gap-6 py-10 lg:grid-cols-3 lg:items-center lg:gap-8">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isCustom = price === null || price === undefined;
          return (
            <li
              key={plan._id}
              className={cn(
                "relative flex flex-col gap-2 rounded-card bg-radial from-white to-surface p-8 text-start shadow-card",
                plan.isPopular ? "border-3 border-brand" : "border border-line",
              )}
            >
              {plan.isPopular && (
                <Badge
                  tone="warning"
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary-500 text-ink uppercase"
                >
                  Popular
                </Badge>
              )}
              <h3
                className={cn(
                  "text-body-xs uppercase",
                  plan.isPopular ? "text-brand" : "text-muted",
                )}
              >
                {plan.name}
              </h3>
              <p className="flex items-baseline">
                <span className="font-serif text-h3 font-bold">
                  {isCustom ? "Custom" : `${currency.format(price)} `}
                </span>
                {!isCustom && (
                  <span className="text-body-md text-muted">{plan.period}</span>
                )}
              </p>
              <p className="pt-2 text-body-sm text-body">{plan.description}</p>
              <ul className="flex flex-col gap-4 pb-6">
                {plan.features?.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 border-b border-line pb-2 text-body-xs text-body"
                  >
                    <CheckCircleIcon
                      aria-hidden
                      className="size-5 shrink-0 text-green-500"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.cta?.href && (
                <TrackedButton
                  href={plan.cta.href}
                  event="cta_click"
                  label={`pricing_${plan.name?.toLowerCase()}`}
                  look={plan.isPopular ? "filled" : "outline"}
                  variant={plan.isPopular ? "primary" : "secondary"}
                  size="sm"
                  className="w-full"
                >
                  {plan.cta.label}
                  <ArrowRightIcon aria-hidden className="rtl:-scale-x-100" />
                </TrackedButton>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

interface PlanGridProps {
  plans: Plan[];
}

const PlanGrid: FC<PlanGridProps> = ({ plans }) => {
  // Router
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derived
  const isAnnual = searchParams.get("billing") === "annual";

  // Handlers
  const handleToggle = () => {
    const params = new URLSearchParams(searchParams);
    if (isAnnual) params.delete("billing");
    else params.set("billing", "annual");
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <PlanCards plans={plans} isAnnual={isAnnual} onToggle={handleToggle} />
  );
};

export default PlanGrid;
