// Run with: npm run seed
import { writeFileSync } from "node:fs";

let keyCount = 0;
const key = () => `k${(keyCount++).toString(36)}`;
const keyed = (items) => items.map((item) => ({ _key: key(), ...item }));
const strings = (items) => items;
const block = (text, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});
const link = (label, href) => ({ label, href });

const docs = [];
const add = (doc) => docs.push(doc);

add({
  _id: "settings",
  _type: "settings",
  announcement: {
    text: "Quillmesh is a fictional company: this site is a case study by Daniel Omoyibo.",
    link: link("See how it was built", "/case-study"),
  },
  logos: {
    eyebrow: "Trusted by sample teams",
    names: strings(["Kestrel", "Pallas", "Ferrous", "Larkin", "Bellhop"]),
  },
  stats: {
    heading: "Quillmesh teams move reliably, and faster.",
    body: "Sample figures for this case study, shown the way a real team would report run tracking and time saved.",
    items: keyed([
      { value: "240+", label: "Active teams" },
      { value: "1M+", label: "Workflows executed" },
      { value: "8.4 hrs", label: "Saved per team / week" },
      { value: "12ms", label: "Global latency" },
    ]),
    note: "*Ship your first live playbook in 10 minutes. No credit card, no setup call required.",
  },
  ctaPanel: {
    heading: {
      text: "Your team is spending hours on work that Quillmesh can run in seconds",
      emphasis: "Quillmesh",
    },
    primary: link("Create an Account", "/demo"),
    secondary: link("Talk to our team instead", "/demo?topic=sales"),
    note: "*Ship your first live playbook in 10 minutes. No credit card, no setup call required.",
    quote:
      "“We don't just build software. We build the quiet layer that makes every operational detail dependable. Reliability is our whole aesthetic.”",
    quoteName: "Pablo Thompson",
    quoteRole: "- Co-founder & Chief Visionary -",
  },
  pricingHero: {
    badge: "Quillmesh pricing",
    heading: {
      text: "Simple pricing. Serious automation.",
      emphasis: "Simple",
    },
    body: "Every plan starts with a 14-day Pro trial, no card. Start running playbooks today and upgrade when Quillmesh becomes essential to how you ship.",
  },
  newsletter: {
    eyebrow: "Newsletter",
    heading: "Ops thinking, once a week. No noise.",
    body: "One short teardown of a real SaaS ops practice every week. Sample newsletter for this case study.",
  },
});

add({
  _id: "home",
  _type: "home",
  hero: {
    badge: "Introducing the ops playbook framework",
    heading: {
      text: "Your Ops Brain for Enterprise SaaS Teams.",
      emphasis: "Enterprise",
    },
    body: "Quillmesh watches events across your stack, catches the work that falls between tools, and runs it automatically, without a full-time ops engineer to babysit it.",
    primary: link("Get early access", "/demo"),
    secondary: link("Watch Quillmesh in action", "/features"),
    footnote: "*No setup fee · Onboarding in under 18 minutes · Cancel anytime",
    statLabel: "Efficiency",
    statValue: "+142%",
    statCaption: "Quarterly performance lift",
    progressLabel: "Real-time deployment sync",
    progressValue: 75,
    proofLine:
      "Built for B2B SaaS teams · SOC 2 Type II ready · 99.97% execution uptime",
  },
  featureGrid: {
    heading: {
      text: "An Ops Brain that Actually Shows its Work",
      emphasis: "",
    },
    badge: "What makes Quillmesh different",
    intro:
      "Most tools fire automations and hope for the best. Quillmesh treats every workflow as a first-class system: it listens, decides, acts, and records exactly what happened, so your team can trust the result.",
    cards: keyed([
      {
        _type: "featureCard",
        eyebrow: "Analytics",
        title: "Live Workflow Analytics",
        body: "See where work is queuing, which playbooks save the most time, and how many incidents were prevented. Track runs, latency, and failure patterns over time.",
      },
      {
        _type: "featureCard",
        eyebrow: "Recovery",
        title: "Built-In Recovery & Replays",
        body: "When something fails, Quillmesh doesn't go silent. It retries with backoff, logs the error with full context, and alerts the right person. Once fixed, replay the run with one click.",
      },
      {
        _type: "featureCard",
        eyebrow: "Ops intelligence",
        title:
          "Your tools generate signals.\nQuillmesh turns them into decisions.",
        body: "Quillmesh takes the logic that lives in spreadsheets, Slack threads, and someone's head, and turns it into explicit playbooks. When the right signal fires, it runs the play the same way, every time.",
      },
      {
        _type: "featureCard",
        eyebrow: "Visual builder",
        title: "Visual Workflow Playbooks",
        body: "Design end-to-end playbooks on a canvas your PMs can own. Define conditions, branches, and fallbacks without code. Engineers stay in the loop, not stuck wiring everything together.",
      },
      {
        _type: "featureCard",
        eyebrow: "Integrations",
        title: "50+ Deep SaaS Integrations",
        body: "Native connectors for Slack, Notion, Linear, GitHub, Stripe, HubSpot, Jira, Salesforce, and more. Two-way sync, typed payloads, and sensible defaults so you don't live in API docs.",
      },
      {
        _type: "featureCard",
        eyebrow: "Access control",
        title: "Granular Access & Guardrails",
        body: "Control who can design playbooks, who can publish them, and who can only see outcomes. Ships with sensible defaults for growing teams and scales to stricter enterprise policies.",
      },
    ]),
    recoveryStat: "99.99%",
    signalTags: strings(["No-Code Logic", "Version Control"]),
  },
  testimonials: {
    heading: "Built for the world's most demanding engineering teams.",
    badge: "WALL OF LOVE",
    intro:
      "What teams say after a quarter on Quillmesh. These quotes are sample content written for this case study; the people are fictional.",
    sampleNote:
      "Sample testimonials: Quillmesh and these customers are fictional.",
    items: keyed([
      {
        _type: "testimonial",
        quote:
          "Our weekly reporting used to eat a whole afternoon of copy and paste. Quillmesh now assembles it from Stripe and HubSpot before Monday standup, and we spend that time on the analysis instead.",
        name: "Lisa Tran",
        role: "Data analyst, Acme Corp",
      },
      {
        _type: "testimonial",
        quote:
          "Our PMs own the workflows. Engineering reviews the critical ones, but we're not involved in every change. That separation is huge for a team our size: we stopped being a bottleneck in our own ops.",
        name: "Jamal Carter",
        role: "Product manager, Technovate",
      },
      {
        _type: "testimonial",
        quote:
          "Every failed run comes with the payload, the step that broke and a replay button. Incidents that used to take a morning of log digging now take ten minutes.",
        name: "Sofia Chen",
        role: "Software architect, NextGen Solutions",
      },
      {
        _type: "testimonial",
        quote:
          "Switched after hitting API limits on our old tool every week. Quillmesh has run clean for five months, and the run logs make debugging the odd edge case trivial.",
        name: "Alex Kim",
        role: "Ops lead, Innovate LLC",
      },
      {
        _type: "testimonial",
        quote:
          "We route support escalations, refunds and churn alerts through one playbook library now. New hires can read a playbook and know exactly what happens and why.",
        name: "David Wong",
        role: "CTO, CloudTech Inc",
      },
      {
        _type: "testimonial",
        quote:
          "The visual canvas meant our designers could map the onboarding flow themselves. We shipped three versions in a sprint and kept the one the data liked best.",
        name: "Emma Johnson",
        role: "UX designer, Creative Labs",
      },
    ]),
    featured: {
      quote:
        "Quillmesh cut 60% of our manual revenue ops in the first month. The best part isn't the time saved: it's knowing exactly why something failed when it does. That observability alone is worth the subscription.",
      name: "Pamela Schmidt",
      role: "Co-founder, Stackly (B2B SaaS) · 12-person team",
    },
  },
  faq: {
    heading: "Questions Teams Ask Before Trusting Quillmesh.",
    intro: "Your technical architecture questions, answered.",
  },
});

const faqs = [
  [
    "How is Quillmesh different from Zapier or Make?",
    "Those tools connect apps. Quillmesh runs playbooks: every run is versioned, logged step by step and replayable, with retries and alerts built in, so you can see why something happened, not just that it did.",
  ],
  [
    "Do I need to write code to use Quillmesh?",
    "No. Most teams design playbooks visually: you describe conditions and actions in plain language and connect them to your tools. For advanced cases there are optional code steps. They're never required.",
  ],
  [
    "How long does setup actually take?",
    "Most teams connect their first two tools and ship a live playbook in under 20 minutes. There is no setup call and no migration project.",
  ],
  [
    "What happens if a workflow fails halfway?",
    "The run stops at the failing step, retries with backoff, and alerts the playbook owner with the full payload. Once the cause is fixed, you replay the run from that step with one click.",
  ],
  [
    "Is my data secure?",
    "In this case study, Quillmesh is fictional and stores nothing. A real product would publish its security page here: encryption, data residency, access controls and audit reports.",
  ],
  [
    "Can we cancel or change plans anytime?",
    "Yes. Upgrades apply immediately and downgrades at the end of the billing period. Cancelling keeps your playbooks readable for 30 days.",
  ],
];
faqs.forEach(([question, answer], index) =>
  add({
    _id: `faq-${index + 1}`,
    _type: "faq",
    question,
    answer,
    order: (index + 1) * 10,
  }),
);

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "/ forever",
    description:
      "For founders and small teams validating their first playbooks.",
    features: [
      "3 active playbooks",
      "1,000 runs/month",
      "2 integrations",
      "7-day run history",
    ],
    cta: link("Try it Free", "/demo?plan=starter"),
    isPopular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    annualPrice: 34,
    period: "/ month",
    description:
      "For teams shipping reliably and scaling their automation stack.",
    features: [
      "Unlimited playbooks",
      "50,000 runs/month",
      "All 50+ integrations",
      "90-day run history",
      "Visual canvas builder",
    ],
    cta: link("Try it Free", "/demo?plan=pro"),
    isPopular: true,
  },
  {
    name: "Enterprise",
    period: "",
    description:
      "For teams that need audit-grade reliability, SSO, and dedicated support.",
    features: [
      "Unlimited playbooks & runs",
      "Custom integrations",
      "SOC 2 Type II reporting",
      "Dedicated account manager",
    ],
    cta: link("Talk to us", "/demo?topic=sales"),
    isPopular: false,
  },
];
plans.forEach((plan, index) =>
  add({
    _id: `plan-${plan.name.toLowerCase()}`,
    _type: "plan",
    order: (index + 1) * 10,
    ...plan,
  }),
);

add({
  _id: "featuresPage",
  _type: "featuresPage",
  hero: {
    badge: "Precision engineering",
    heading: {
      text: "Precision Engineering for the Modern Web.",
      emphasis: "Modern Web.",
    },
    body: "Quillmesh isn't just a workflow tool. It's a runtime layer for teams who treat operations as infrastructure: logic that listens, adapts, and executes in milliseconds.",
    primary: link("Start Building Now", "/demo"),
    secondary: link("Read the Changelog", "/changelog"),
  },
  builtFor: {
    badge: "Built for real teams",
    heading: "Set it up once. Trust it every time it runs.",
    body: "Most teams don't have a dedicated ops engineer. Quillmesh is designed for PMs and founders who design a workflow once and need it to run for months. Quillmesh handles execution, monitoring, and recovery; you handle the rules.",
    points: strings([
      "Visual canvas for designing playbooks without writing code",
      "Quillmesh suggests new steps when it spots recurring manual work in your logs",
      "Version history and one-click rollback for every playbook you build",
    ]),
    link: link("Explore the template library", "/blog"),
  },
  logic: {
    codeLabel: "// LOGIC_CORE_V2.1",
    codeQuote:
      "“Every playbook in Quillmesh compiles to a graph, so runs stay fast even at scale.”",
    badge: "Ops intelligence",
    heading:
      "Your tools generate signals.\nQuillmesh turns them into decisions.",
    body: "Quillmesh takes the logic that lives in spreadsheets, Slack threads, and someone's head, and turns it into explicit playbooks. When the right signal fires, it runs the play the same way, every time.",
    examples: strings([
      "Assign new sign-ups to sales reps based on custom criteria.",
      "Alert your team when key accounts show signs of reduced engagement.",
      "Resolve Jira tickets and update user access after offboarding.",
    ]),
    link: link("Browse all playbook templates", "/blog"),
  },
});

add({
  _id: "aboutPage",
  _type: "aboutPage",
  hero: {
    badge: "About Quillmesh",
    heading: { text: "Crafting Structural Elegance.", emphasis: "Structural" },
    body: "We built Quillmesh because we couldn't find the tool we actually needed. We believe ops shouldn't be a bottleneck. It should be a brain.",
    locationLabel: "Headquarters",
    location: "San Francisco, CA (fictional)",
  },
  values: {
    heading: "What we believe about ops",
    intro: "Principles that guide every playbook we ship.",
    items: keyed([
      {
        title: "Automation should be invisible",
        body: "The best playbook is the one you forget is running. It handles the complexity so you can focus on the work only people can do.",
      },
      {
        title: "Reliability is a feature",
        body: "A workflow that fails silently is worse than no workflow at all. We build every run to be logged, retried and replayable.",
      },
      {
        title: "PMs should own the ops",
        body: "If your product manager can't maintain it, we haven't done our job. Ops belongs to the product, not just to infra.",
      },
    ]),
  },
  team: {
    heading: "The Digital Craftspeople of Quillmesh",
    intro:
      "A fictional team for this case study, drawn as initials rather than photos of real people.",
    link: link("We're growing. See open roles", "/demo?topic=careers"),
    members: keyed([
      {
        name: "Pablo Thompson",
        role: "Founder & Chief Visionary",
        team: "Design",
      },
      { name: "Elena Thorne", role: "CEO & Co-founder", team: "Development" },
      { name: "Marcus Lee", role: "CTO & Co-founder", team: "Marketing" },
      { name: "Sofia Patel", role: "Head of Product", team: "User research" },
      { name: "James Kim", role: "Product Lead", team: "Product management" },
      { name: "Aisha Gomez", role: "Staff Engineer", team: "Data analysis" },
      { name: "Oliver Chen", role: "QA Specialist", team: "Quality assurance" },
      {
        name: "Natalie Brown",
        role: "Support Engineer",
        team: "Customer support",
      },
    ]),
  },
});

const categories = [
  "Engineering",
  "Product updates",
  "Scalability",
  "Culture",
  "Ops strategy",
  "Quality assurance",
];
categories.forEach((title, index) =>
  add({
    _id: `category-${index + 1}`,
    _type: "category",
    title,
    slug: { _type: "slug", current: title.toLowerCase().replace(/\s+/g, "-") },
    order: (index + 1) * 10,
  }),
);
const categoryRef = (title) => ({
  _type: "reference",
  _ref: `category-${categories.indexOf(title) + 1}`,
});

const posts = [
  {
    slug: "the-future-of-digital-infrastructure-is-intentional",
    title: "The Future of Digital Infrastructure is Intentional",
    category: "Scalability",
    author: "Marcus Chen",
    minutes: 12,
    date: "2026-03-28",
    isFeatured: true,
    excerpt:
      "As we move beyond reactive DevOps, the next era of infrastructure belongs to the architects who build for intent, not just availability.",
  },
  {
    slug: "the-5-workflows-every-saas-team-should-automate-first",
    title: "The 5 workflows every SaaS team should automate first.",
    category: "Ops strategy",
    author: "Elena Marsh",
    minutes: 12,
    date: "2026-03-28",
    excerpt:
      "The real gains aren't in flashy overhauls but in the repetitive tasks that drain your team's time. Here's the order we'd automate them in, and why.",
  },
  {
    slug: "quillmesh-v2-event-based-triggers",
    title: "Quillmesh v2: Event-based triggers & 3x faster runs.",
    category: "Product updates",
    author: "Dev Team",
    minutes: 6,
    date: "2026-03-20",
    excerpt:
      "We rebuilt the trigger engine around events instead of polling. Here's what changed, what got faster, and what you need to do (nothing).",
  },
  {
    slug: "why-pms-should-own-the-ops",
    title: "Why PMs should own the ops, not just the roadmap.",
    category: "Culture",
    author: "Sam Okafor",
    minutes: 10,
    date: "2026-04-05",
    excerpt:
      "When product managers own the internal workflows, ops stops being a backend concern and becomes part of how the product ships. A case for shared ownership, and how to start without adding to anyone's plate.",
  },
  {
    slug: "zapier-vs-make-vs-quillmesh",
    title: "Zapier vs Make vs Quillmesh: The honest breakdown.",
    category: "Scalability",
    author: "Sam Okafor",
    minutes: 10,
    date: "2026-04-02",
    excerpt:
      "Three tools, three philosophies. Where app connectors are the right call, where they break down, and where a playbook runtime earns its place.",
  },
  {
    slug: "testing-playbooks-before-they-touch-production",
    title: "Testing playbooks before they touch production.",
    category: "Quality assurance",
    author: "Oliver Chen",
    minutes: 8,
    date: "2026-02-14",
    excerpt:
      "Dry runs, recorded payloads and a staging workspace: the three habits that catch most broken workflows before a customer does.",
  },
];

const articleBody = (title) => [
  block("The Cost of Silent Entropy", "h2"),
  block(
    "When we talk about an “ops brain” we aren't just talking about automation triggers. We're talking about the semantic layer of your company. Every SaaS team starts with a clean Slack and a clean Stripe. Within six months the drift begins: “Pro” in billing means something different from “Verified” in the CRM. The signals stop matching, and the automations built on them break quietly.",
  ),
  block(
    "A workflow that fails silently is worse than no workflow at all. Reliability starts with the names you give your data.",
    "blockquote",
  ),
  block("Mapping the Decision Chain", "h2"),
  block(
    `The teams that do well with ${title.includes("Quillmesh") ? "a tool like this" : "automation"} don't have more complex workflows; they have more explicit ones. They map which event means what, who owns each decision, and what should happen when a step fails, so an event in GitHub turns into the right Slack message without a translation layer in someone's head.`,
  ),
  {
    _type: "pullQuote",
    _key: key(),
    quote:
      "Data architecture is not about databases, it's about decision architecture: making sure the right data reaches the right place at the right time.",
    cite: "Sample quote for this case study",
  },
  block("Structuring for Scale", "h2"),
  block(
    "The move from a three-person team to a fifty-person product org is where most of this collapses. Tribal knowledge is the enemy of automation: if a PM can't read a playbook and see why a deal was routed to a specific owner, you haven't built a system, you've built a riddle.",
  ),
  {
    _type: "steps",
    _key: key(),
    items: keyed([
      {
        title: "Name every signal once",
        body: "One glossary for plan, status and owner fields, shared by every tool.",
      },
      {
        title: "Write the decision down",
        body: "Each playbook states the trigger, the rule and who is paged when it fails.",
      },
    ]),
  },
  block(
    "This is a sample article for the Quillmesh case study. Quillmesh is fictional; the article shows how long-form content from Sanity renders on the blog.",
  ),
];

posts.forEach((post) =>
  add({
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    category: categoryRef(post.category),
    excerpt: post.excerpt,
    author: post.author,
    readingMinutes: post.minutes,
    publishedAt: post.date,
    isFeatured: Boolean(post.isFeatured),
    lede: "Most teams treat information architecture as a post-launch cleanup task. In reality, the way you structure your data sets the ceiling on your operational efficiency.",
    body: articleBody(post.title),
    tags: strings(["Workflow automation", "SaaS ops", "Product strategy"]),
  }),
);

const releases = [
  {
    version: "v6.0",
    label: "Current system",
    title: "The Intelligence Update",
    released: "Released: May 24, 2026",
    releasedAt: "2026-05-24",
    groups: keyed([
      {
        kind: "New features",
        items: [
          "Enhanced automation engine: multi-step conditional workflows and cross-platform hooks.",
          "Quillmesh assistant: drafts a playbook from plain-language notes.",
        ],
      },
      {
        kind: "Improvements",
        items: [
          "Design-system documentation inside the editor for real-time brand alignment.",
        ],
      },
    ]),
  },
  {
    version: "v5.0",
    title: "Digital Architect",
    released: "Released: February 12, 2026",
    releasedAt: "2026-02-12",
    groups: keyed([
      {
        kind: "New features",
        items: [
          "Visual overhaul: focus modes and structural logic layers.",
          "Real-time observation: live tracking of workflow health and throughput.",
        ],
      },
    ]),
  },
  {
    version: "v4.0",
    title: "Editorial Studio",
    released: "Released: October 5, 2025",
    releasedAt: "2025-10-05",
    groups: keyed([
      {
        kind: "New features",
        items: [
          "Editorial Studio: a dedicated space for long-form playbook documentation.",
        ],
      },
      {
        kind: "Bug fixes",
        items: ["Fixed component rendering on high-DPI displays."],
      },
    ]),
  },
  {
    version: "v1.0 - v3.0",
    title: "Foundation Era",
    released: "2024 - Early 2025",
    releasedAt: "2024-01-01",
    summary:
      "The building blocks that made Quillmesh possible. The focus was stability, core workflow triggers, and secure data handling.",
    groups: keyed([
      {
        kind: "Core infrastructure",
        items: [
          "Initial platform launch with workspace management.",
          "Basic workflow triggers and integration layer.",
        ],
      },
    ]),
  },
];
releases.forEach((release, index) =>
  add({ _id: `release-${index + 1}`, _type: "release", ...release }),
);

const legal = [
  {
    slug: "privacy",
    title: "Privacy policy",
    body: [
      block(
        "Quillmesh is a fictional company. This site is a portfolio case study by Daniel Omoyibo, and this page explains what the site itself does with data.",
      ),
      block("What the demo form collects", "h2"),
      block(
        "If you send the demo-request form, your name, work email, company, team size and message are stored in a private Sanity dataset that only the site owner can read. They are used to show that the form works and are deleted within 30 days. Nobody will contact you to sell anything.",
      ),
      block("Analytics", "h2"),
      block(
        "If you accept cookies, the site records which landing-page variant you saw and when you clicked a call to action or sent a form, to measure the A/B test. These events carry no name or email. If you choose essential only, no events are recorded.",
      ),
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    body: [
      block(
        "Quillmesh is a fictional product, so there is no service to agree to. The design is adapted from the Synkra Figma kit by Inagata Technosmith and Dicky Bhismawan H, used under CC BY 4.0. The code is Daniel Omoyibo's own work.",
      ),
      block("Using this site", "h2"),
      block(
        "Please don't submit real customer data through the demo form. It exists to demonstrate validation, storage and error handling.",
      ),
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    body: [
      block("The site uses two first-party items and no third-party trackers."),
      block("What is stored", "h2"),
      block(
        "A cookie named qm-variant keeps you on the same A/B landing-page variant for 30 days, so the test is fair. Your cookie choice is kept in your browser's local storage. Nothing else is stored.",
      ),
    ],
  },
];
legal.forEach((page) =>
  add({
    _id: `legal-${page.slug}`,
    _type: "legal",
    title: page.title,
    slug: { _type: "slug", current: page.slug },
    updatedAt: "2026-10-29",
    body: page.body,
  }),
);

add({
  _id: "landing-a",
  _type: "landing",
  variant: "a",
  internalName: "A: outcome headline",
  badge: "For B2B SaaS ops teams",
  heading: {
    text: "Stop babysitting the work that falls between your tools.",
    emphasis: "babysitting",
  },
  body: "Quillmesh watches your stack, runs the routine work automatically and tells you exactly what happened. Your first playbook goes live in under 20 minutes.",
  cta: link("Request a demo", "/demo"),
  proofPoints: strings([
    "No setup fee",
    "Onboarding in under 20 minutes",
    "Cancel anytime",
  ]),
});
add({
  _id: "landing-b",
  _type: "landing",
  variant: "b",
  internalName: "B: proof headline",
  badge: "Every run logged and replayable",
  heading: { text: "Automation you can actually audit.", emphasis: "audit." },
  body: "Every Quillmesh run is versioned, logged step by step and replayable with one click, so when something breaks you know why in minutes, not mornings.",
  cta: link("See it on your stack", "/demo"),
  proofPoints: strings([
    "Step-by-step run logs",
    "One-click replays",
    "Role-based guardrails",
  ]),
});

add({
  _id: "prelander",
  _type: "prelander",
  badge: "Ops teardown",
  heading: {
    text: "Your ops team is quietly doing a second job.",
    emphasis: "second job.",
  },
  intro:
    "Most SaaS teams lose hours a week to work that sits between their tools. Here are three signs it's happening to yours. (A sample pre-lander for the Quillmesh case study.)",
  points: keyed([
    {
      title: "Someone copies data between tools every week",
      body: "Billing to CRM, CRM to Slack, Slack to a spreadsheet. If a person is the integration, the integration breaks when they're on holiday.",
    },
    {
      title: "Failures are found by customers, not by you",
      body: "A webhook times out, a sync stops, and nobody notices until a customer emails. Silent failures are the expensive ones.",
    },
    {
      title: "Only one person knows how the automations work",
      body: "When the logic lives in someone's head, every change waits for them, and every new hire has to reverse-engineer it.",
    },
  ]),
  closing:
    "If two of these sound familiar, a playbook runtime is worth a look.",
  cta: link("See how Quillmesh handles it", "/lp/automate"),
});

writeFileSync(
  new URL("./seed.ndjson", import.meta.url),
  docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
);
console.log(`Wrote ${docs.length} documents to scripts/seed.ndjson`);
