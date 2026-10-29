export const navLinks = [
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Design system", href: "/components" },
      { label: "How this site was built", href: "/case-study" },
    ],
  },
  { label: "Changelog", href: "/changelog" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const footerLinks = [
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Terms of service", href: "/legal/terms" },
  { label: "Cookie policy", href: "/legal/cookies" },
  { label: "Help", href: "/demo" },
  { label: "Blog", href: "/blog" },
  { label: "Design system", href: "/components" },
  { label: "Case study", href: "/case-study" },
] as const;
