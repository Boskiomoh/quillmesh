export const variantCookie = "qm-variant";
export const variants = ["a", "b"] as const;
export type Variant = (typeof variants)[number];

export const isVariant = (value: unknown): value is Variant =>
  variants.includes(value as Variant);
