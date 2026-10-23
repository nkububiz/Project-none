/*
 * KaziRemote fixtures + demo store.
 *
 * EVERYTHING in this file is stub data for the product surface. Milestone 2+
 * (see PLAN.md) replaces `KaziStore` with calls to Netlify Functions backed by
 * Netlify Database. Pages only talk to `KaziStore`, never to localStorage
 * directly, so the swap stays in this one module.
 */
(function () {
  const CONFIG = {
    TILL_NUMBER: "4374253",
    TILL_NAME: "KAZIREMOTE SERVICES (KENYA)",
    ENROLL_FEE_KES: 500,
    CURRENCY: "KES",
    USD_TO_KES: 129,
    REFUND_GUARANTEE_DAYS: 30,
    REGISTERED_BUSINESS: "KaziRemote Talent Ltd (Reg. CPR/2024/189244)",
    OFFICE_LOCATION: "Delta Corner Annex, 4th Floor, Westlands, Nairobi, Kenya",
    CONTACT: {
      PHONE: "0183036639",
      PHONE_DISPLAY: "0183 036 639",
      PHONE_INTL: "+254 183 036 639",
      CALL_LINK: "tel:0183036639",
      WHATSAPP: "https://wa.me/254183036639?text=Hi%20KaziRemote%20Team%2C%20I%20have%20a%20question%20about%20remote%20jobs%20and%20enrollment",
      EMAIL: "Ke-remotejobs@gmail.com",
    },
  };

  const REGIONAL_PAYMENTS = {
    KE: {
      code: "KE", country: "Kenya", flag: "🇰🇪", currency: "KES", amount: 500, feeDisplay: "KES 500",
      gateway: "M-Pesa Buy Goods", provider: "Safaricom M-Pesa",
      instructions: "Pay to Till 4374253 (KAZIREMOTE SERVICES (KENYA))",
      stkSupported: true,
      identifierLabel: "Till Number", identifierValue: "4374253"
    },
    NG: {
      code: "NG", country: "Nigeria", flag: "🇳🇬", currency: "NGN", amount: 4500, feeDisplay: "NGN 4,500",
      gateway: "Paystack / Bank Transfer", provider: "Access Bank / USSD",
      instructions: "Transfer to KaziRemote Paystack account or dial *737#",
      stkSupported: false,
      identifierLabel: "Account No.", identifierValue: "0123984721 (Access Bank)"
    },
    GH: {
      code: "GH", country: "Ghana", flag: "🇬🇭", currency: "GHS", amount: 45, feeDisplay: "GHS 45",
      gateway: "MTN Mobile Money", provider: "MTN MoMo / Telecel",
      instructions: "Send to Merchant Code 437425 or trigger instant MoMo prompt",
      stkSupported: true,
      identifierLabel: "Merchant Code", identifierValue: "437425"
    },
    RW: {
      code: "RW", country: "Rwanda", flag: "🇷🇼", currency: "RWF", amount: 4200, feeDisplay: "RWF 4,200",
      gateway: "MTN MoMo Rwanda", provider: "MTN MoMo",
      instructions: "Dial *182*8*1*4374253# or trigger instant MoMo push",
      stkSupported: true,
      identifierLabel: "Merchant Code", identifierValue: "4374253"
    },
    ZA: {
      code: "ZA", country: "South Africa", flag: "🇿🇦", currency: "ZAR", amount: 75, feeDisplay: "R 75",
      gateway: "Ozow Instant EFT", provider: "Ozow / Capitec / Nedbank",
      instructions: "Instant EFT via Ozow secure banking gateway",
      stkSupported: false,
      identifierLabel: "Reference", identifierValue: "KAZI-ZA-ENROLL"
    },
    GLOBAL: {
      code: "GLOBAL", country: "International / Other", flag: "🌍", currency: "USD", amount: 4, feeDisplay: "$4.00",
      gateway: "Stripe / Card", provider: "Visa / Mastercard / Apple Pay",
      instructions: "Pay with any international credit or debit card securely",
      stkSupported: false,
      identifierLabel: "Checkout", identifierValue: "Stripe 256-bit Secure"
    }
  };

  const COUNTRIES = {
    KE: "Kenya", UG: "Uganda", TZ: "Tanzania", RW: "Rwanda", ET: "Ethiopia",
    NG: "Nigeria", GH: "Ghana", SN: "Senegal", CI: "Côte d'Ivoire", CM: "Cameroon",
    ZA: "South Africa", ZM: "Zambia", ZW: "Zimbabwe", BW: "Botswana", MW: "Malawi", EG: "Egypt",
  };

  // Where a job seeker is: the time zones used by the "Your time zone" filter.
  const ZONES = [
    { id: "GMT", label: "GMT · UTC+0", offset: 0, places: "Ghana, Senegal, Côte d'Ivoire" },
    { id: "WAT", label: "WAT · UTC+1", offset: 1, places: "Nigeria, Cameroon" },
    { id: "CAT", label: "CAT · UTC+2", offset: 2, places: "South Africa, Zambia, Rwanda, Egypt" },
    { id: "EAT", label: "EAT · UTC+3", offset: 3, places: "Kenya, Uganda, Tanzania, Ethiopia" },
  ];

  // What a job requires: the UTC offsets a candidate's working hours must fall in.
  // `countries` feeds Google Jobs `applicantLocationRequirements` (empty = worldwide).
  const TZ_RANGES = {
    any: { label: "Any time zone (async)", short: "Any time zone", min: -12, max: 14, countries: [] },
    africa: { label: "African time zones (UTC+0 to +3)", short: "UTC+0 to +3", min: 0, max: 3, countries: ["KE", "UG", "TZ", "RW", "ET", "NG", "GH", "SN", "CM", "ZA", "ZM", "EG"] },
    west: { label: "West Africa (UTC+0 to +1)", short: "UTC+0 to +1", min: 0, max: 1, countries: ["NG", "GH", "SN", "CI", "CM"] },
    central: { label: "Central & Southern Africa (UTC+2)", short: "UTC+2", min: 2, max: 2, countries: ["ZA", "ZM", "ZW", "BW", "MW", "RW", "EG"] },
    east: { label: "East Africa (UTC+3)", short: "UTC+3", min: 3, max: 3, countries: ["KE", "UG", "TZ", "ET"] },
    emea: { label: "Europe & Africa overlap (UTC-1 to +4)", short: "UTC-1 to +4", min: -1, max: 4, countries: [] },
  };

  const CATEGORIES = [
    { id: "engineering", label: "Engineering", emoji: "💻" },
    { id: "design", label: "Design", emoji: "🎨" },
    { id: "marketing", label: "Marketing", emoji: "📣" },
    { id: "support", label: "Customer Support", emoji: "🎧" },
    { id: "data", label: "Data & Analytics", emoji: "📊" },
    { id: "writing", label: "Writing", emoji: "✍️" },
    { id: "finance", label: "Finance & Ops", emoji: "🧾" },
    { id: "va", label: "Virtual Assistant", emoji: "🗂️" },
  ];

  const TYPES = ["Full-time", "Part-time", "Contract", "Freelance"];

  const JOBS = [
    {
      id: "j-101", title: "Senior Frontend Engineer", company: "Sendwave Labs", color: "#f97316",
      website: "https://www.sendwave.com", verified: true, flag: "🇰🇪", tzOverlap: "UTC+0 to +3 (Africa)",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#f97316"/><path d="M7 16l6-6 4 4 8-8M21 6h4v4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      category: "engineering", type: "Full-time", location: "Remote · Africa timezones",
      pay: { currency: "USD", min: 3500, max: 5000, unit: "MONTH" }, tz: "africa",
      posted: 1, featured: true, status: "approved", applicants: 42,
      tags: ["JavaScript", "React", "Accessibility"],
      summary: "Build the money-transfer experience used by millions of people sending money home.",
      responsibilities: ["Own customer-facing web flows end to end", "Partner with design on a shared component library", "Mentor two mid-level engineers"],
      requirements: ["5+ years building production web apps", "Strong vanilla JS and CSS fundamentals", "Comfortable working async across time zones"],
    },
    {
      id: "j-102", title: "Customer Success Associate", company: "Lipa Later", color: "#18181b",
      website: "https://lipalater.com", verified: true, flag: "🇰🇪", tzOverlap: "EAT (UTC+3)",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#18181b"/><path d="M10 22V10h4v8h8v4H10z" fill="#f97316"/></svg>',
      category: "support", type: "Full-time", location: "Remote · Kenya",
      pay: { currency: "KES", min: 90000, max: 120000, unit: "MONTH" }, tz: "east", countries: ["KE"],
      posted: 2, featured: true, status: "approved", applicants: 118,
      tags: ["Zendesk", "Swahili", "Fintech"],
      summary: "Help merchants get the most out of buy-now-pay-later checkout.",
      responsibilities: ["Resolve merchant tickets via chat and email", "Run onboarding calls for new merchants", "Flag product issues to engineering"],
      requirements: ["Fluent English and Swahili", "1+ year in a support role", "Reliable internet and a quiet workspace"],
    },
    {
      id: "j-103", title: "Product Designer (UI/UX)", company: "Andela Studio", color: "#ea580c",
      website: "https://andela.com", verified: true, flag: "🇳🇬", tzOverlap: "Worldwide Async",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#3359DF"/><path d="M16 8l7 14h-4l-3-6-3 6h-4l7-14z" fill="white"/></svg>',
      category: "design", type: "Contract", location: "Remote · Worldwide",
      pay: { currency: "USD", min: 40, max: 60, unit: "HOUR" }, tz: "any",
      posted: 3, featured: false, status: "approved", applicants: 64,
      tags: ["Figma", "Design systems", "Mobile"],
      summary: "Design mobile-first flows for an agri-tech marketplace.",
      responsibilities: ["Run discovery interviews with farmers and buyers", "Ship high-fidelity prototypes weekly", "Maintain the Figma design system"],
      requirements: ["Portfolio with shipped mobile products", "Experience with low-bandwidth UX", "Strong written communication"],
    },
    {
      id: "j-104", title: "Growth Marketing Manager", company: "Twiga Digital", color: "#52525b",
      website: "https://twiga.com", verified: true, flag: "🇰🇪", tzOverlap: "EMEA Overlap",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#15803d"/><circle cx="16" cy="16" r="6" fill="#facc15"/></svg>',
      category: "marketing", type: "Full-time", location: "Remote · EMEA",
      pay: { currency: "USD", min: 2800, max: 4000, unit: "MONTH" }, tz: "emea",
      posted: 4, featured: false, status: "approved", applicants: 37,
      tags: ["SEO", "Paid social", "Analytics"],
      summary: "Own acquisition for a fast-growing B2B ordering app.",
      responsibilities: ["Plan and run paid campaigns", "Build the content and SEO engine", "Report weekly on CAC and retention"],
      requirements: ["3+ years in growth or performance marketing", "Hands-on with GA4 and Meta Ads", "Data-driven mindset"],
    },
    {
      id: "j-105", title: "Data Analyst", company: "M-Kopa Insights", color: "#c2410c",
      website: "https://m-kopa.com", verified: true, flag: "🇰🇪", tzOverlap: "East Africa Time",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#0284c7"/><path d="M10 21V11l6 5 6-5v10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      category: "data", type: "Full-time", location: "Remote · East Africa",
      pay: { currency: "KES", min: 150000, max: 200000, unit: "MONTH" }, tz: "east",
      posted: 5, featured: true, status: "approved", applicants: 51,
      tags: ["SQL", "Python", "Looker"],
      summary: "Turn repayment and device data into decisions for the credit team.",
      responsibilities: ["Build and maintain core dashboards", "Run cohort and churn analyses", "Partner with credit risk on models"],
      requirements: ["Strong SQL", "Python or R for analysis", "Clear storytelling with data"],
    },
    {
      id: "j-106", title: "Technical Content Writer", company: "DevDocs Co.", color: "#3f3f46",
      website: "https://devdocs.io", verified: true, flag: "🌍", tzOverlap: "Any Timezone",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#3f3f46"/><path d="M9 11h14M9 16h14M9 21h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>',
      category: "writing", type: "Freelance", location: "Remote · Worldwide",
      pay: { currency: "USD", min: 0.12, unit: "WORD" }, tz: "any",
      posted: 6, featured: false, status: "approved", applicants: 89,
      tags: ["APIs", "Tutorials", "Markdown"],
      summary: "Write developer tutorials and API guides for SaaS clients.",
      responsibilities: ["Write 4–6 long-form tutorials a month", "Test every code sample you publish", "Collaborate with client engineers on accuracy"],
      requirements: ["Published technical writing samples", "Basic coding ability", "Excellent English grammar"],
    },
    {
      id: "j-107", title: "Executive Virtual Assistant", company: "Bridge Partners", color: "#fb923c",
      website: "https://bridgepartners.com", verified: true, flag: "🇰🇪", tzOverlap: "3pm–9pm EAT",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#fb923c"/><circle cx="16" cy="16" r="5" stroke="white" stroke-width="2.5"/><path d="M16 8v3M16 21v3M8 16h3M21 16h3" stroke="white" stroke-width="2"/></svg>',
      category: "va", type: "Part-time", location: "Remote · Kenya / Uganda",
      pay: { currency: "USD", min: 800, max: 1200, unit: "MONTH" }, tz: "east", countries: ["KE", "UG"],
      posted: 7, featured: false, status: "approved", applicants: 203,
      tags: ["Google Workspace", "Scheduling", "Notion"],
      summary: "Support a US-based founder with inbox, calendar and travel.",
      responsibilities: ["Manage inbox and calendar", "Prepare meeting briefs", "Coordinate travel and expenses"],
      requirements: ["2+ years as an EA or VA", "Available 3pm–9pm EAT", "Highly organised"],
    },
    {
      id: "j-108", title: "Backend Engineer (Node.js)", company: "Pesapal Cloud", color: "#71717a",
      website: "https://pesapal.com", verified: true, flag: "🇰🇪", tzOverlap: "Africa Timezones",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#059669"/><path d="M11 16h10M16 11v10" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>',
      category: "engineering", type: "Full-time", location: "Remote · Africa timezones",
      pay: { currency: "USD", min: 3000, max: 4500, unit: "MONTH" }, tz: "africa",
      posted: 8, featured: false, status: "approved", applicants: 58,
      tags: ["Node.js", "Postgres", "Payments"],
      summary: "Scale payment APIs handling millions of transactions monthly.",
      responsibilities: ["Design and build payment APIs", "Improve reliability and observability", "Join a light on-call rotation"],
      requirements: ["3+ years backend experience", "Postgres in production", "Payments experience is a plus"],
    },
    {
      id: "j-109", title: "Bookkeeper", company: "Ledgerly", color: "#f97316",
      website: "https://ledgerly.co", verified: true, flag: "🌍", tzOverlap: "Worldwide Async",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#d97706"/><rect x="9" y="9" width="14" height="14" rx="2" stroke="white" stroke-width="2"/><line x1="13" y1="13" x2="19" y2="13" stroke="white" stroke-width="2"/></svg>',
      category: "finance", type: "Contract", location: "Remote · Worldwide",
      pay: { currency: "USD", min: 20, max: 28, unit: "HOUR" }, tz: "any",
      posted: 10, featured: false, status: "approved", applicants: 26,
      tags: ["QuickBooks", "Xero", "Reconciliation"],
      summary: "Keep the books for a portfolio of small e-commerce brands.",
      responsibilities: ["Monthly reconciliations", "Accounts payable and receivable", "Prepare month-end reports"],
      requirements: ["CPA (K) or ACCA progress", "QuickBooks or Xero experience", "Attention to detail"],
    },
    {
      id: "j-110", title: "Social Media Designer", company: "Kazi Creative", color: "#18181b",
      website: "https://kazicreative.africa", verified: true, flag: "🇰🇪", tzOverlap: "EAT (UTC+3)",
      logoSvg: '<svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#7c3aed"/><circle cx="16" cy="16" r="6" stroke="white" stroke-width="2.5"/></svg>',
      category: "design", type: "Part-time", location: "Remote · Kenya",
      pay: { currency: "KES", min: 60000, unit: "MONTH" }, tz: "east", countries: ["KE"],
      posted: 12, featured: false, status: "approved", applicants: 71,
      tags: ["Canva", "Illustrator", "Motion"],
      summary: "Create scroll-stopping social content for consumer brands.",
      responsibilities: ["Design 20+ social assets a week", "Light motion edits for Reels and TikTok", "Keep brand kits up to date"],
      requirements: ["Strong portfolio", "Adobe CC or Canva Pro", "Quick turnaround"],
    },
    // Pending employer submissions (shown only in the admin dashboard)
    {
      id: "j-201", title: "Mobile Engineer (Flutter)", company: "Safiri Apps", color: "#ea580c",
      category: "engineering", type: "Contract", location: "Remote · Worldwide",
      pay: { currency: "USD", min: 35, max: 50, unit: "HOUR" }, tz: "any",
      posted: 0, featured: false, status: "pending", applicants: 0,
      tags: ["Flutter", "Dart", "Firebase"],
      summary: "Build a ride-booking app for intercity buses.",
      responsibilities: ["Ship features in Flutter", "Write widget tests"], requirements: ["2+ years Flutter"],
    },
    {
      id: "j-202", title: "Sales Development Rep", company: "Duka Pro", color: "#52525b",
      category: "marketing", type: "Full-time", location: "Remote · Kenya",
      pay: { currency: "KES", min: 70000, unit: "MONTH", note: "+ commission" }, tz: "east", countries: ["KE"],
      posted: 0, featured: false, status: "pending", applicants: 0,
      tags: ["B2B", "Outbound", "CRM"],
      summary: "Book demos with retailers for a point-of-sale product.",
      responsibilities: ["Outbound calls and email", "Qualify inbound leads"], requirements: ["Sales experience"],
    },
  ];

  const PAYMENTS = [
    { id: "p-1", name: "Wanjiru Kamau", email: "wanjiru.k@gmail.com", phone: "0712 345 678", code: "SJK4H7QX2P", amount: 500, date: "2026-10-22 09:14", status: "pending" },
    { id: "p-2", name: "Brian Otieno", email: "b.otieno@gmail.com", phone: "0722 908 112", code: "SJK3D1MZ8T", amount: 500, date: "2026-10-22 08:02", status: "pending" },
    { id: "p-3", name: "Aisha Mohamed", email: "aisha.m@gmail.com", phone: "0733 554 019", code: "SJJ9P0LW4R", amount: 500, date: "2026-10-21 17:40", status: "verified" },
    { id: "p-4", name: "Kevin Mutua", email: "kmutua@gmail.com", phone: "0701 223 456", code: "SJJ7B2NV6Q", amount: 500, date: "2026-10-21 12:11", status: "verified" },
    { id: "p-5", name: "Grace Achieng", email: "grace.ach@gmail.com", phone: "0745 667 890", code: "SJI2X8CU1Y", amount: 300, date: "2026-10-20 15:27", status: "rejected" },
    { id: "p-6", name: "Peter Njoroge", email: "pnjoroge@gmail.com", phone: "0790 112 334", code: "SJH5T3RK9E", amount: 500, date: "2026-10-19 10:05", status: "verified" },
  ];

  const USERS = [
    { name: "Wanjiru Kamau", email: "wanjiru.k@gmail.com", role: "seeker", joined: "2026-10-22", enrolled: false },
    { name: "Brian Otieno", email: "b.otieno@gmail.com", role: "seeker", joined: "2026-10-22", enrolled: false },
    { name: "Aisha Mohamed", email: "aisha.m@gmail.com", role: "seeker", joined: "2026-10-21", enrolled: true },
    { name: "Kevin Mutua", email: "kmutua@gmail.com", role: "seeker", joined: "2026-10-20", enrolled: true },
    { name: "Safiri Apps", email: "hr@safiri.app", role: "employer", joined: "2026-10-22", enrolled: false },
    { name: "Duka Pro", email: "talent@dukapro.co.ke", role: "employer", joined: "2026-10-21", enrolled: false },
    { name: "Sendwave Labs", email: "jobs@sendwave.dev", role: "employer", joined: "2026-09-02", enrolled: false },
    { name: "Peter Njoroge", email: "pnjoroge@gmail.com", role: "seeker", joined: "2026-10-18", enrolled: true },
  ];

  const ENROLLMENTS_BY_WEEK = [
    { label: "Sep 15", value: 34 }, { label: "Sep 22", value: 41 }, { label: "Sep 29", value: 38 },
    { label: "Oct 6", value: 55 }, { label: "Oct 13", value: 62 }, { label: "Oct 20", value: 71 },
  ];


  // ---- Unlimited job catalog ----
  // Jobs past the curated list are generated on demand from their index, so the
  // catalog never runs out and every generated job has a stable id ("g-<n>")
  // that any visitor can open, share or apply to.
  const GEN = {
    engineering: { titles: ["Frontend Engineer", "Backend Engineer", "Full-stack Developer", "Mobile Developer (React Native)", "DevOps Engineer", "QA Automation Engineer", "Python Developer", "WordPress Developer"], tags: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Postgres", "Laravel", "Flutter"] },
    design: { titles: ["UI/UX Designer", "Graphic Designer", "Brand Designer", "Motion Designer", "Product Designer", "Illustrator"], tags: ["Figma", "Canva", "Illustrator", "After Effects", "Photoshop", "Design systems"] },
    marketing: { titles: ["Social Media Manager", "SEO Specialist", "Email Marketing Specialist", "Sales Development Rep", "Growth Marketer", "Community Manager"], tags: ["SEO", "Meta Ads", "TikTok", "HubSpot", "Copywriting", "B2B"] },
    support: { titles: ["Customer Support Agent", "Live Chat Agent", "Technical Support Specialist", "Customer Success Associate", "Call Center Agent"], tags: ["Zendesk", "Intercom", "Swahili", "English", "Freshdesk", "Night shift"] },
    data: { titles: ["Data Analyst", "Data Entry Clerk", "Data Annotator", "BI Analyst", "AI Training Specialist", "Research Analyst"], tags: ["Excel", "SQL", "Power BI", "Python", "Labeling", "Google Sheets"] },
    writing: { titles: ["Content Writer", "Copywriter", "Transcriptionist", "Proofreader", "Technical Writer", "Translator (Swahili–English)"], tags: ["Blogging", "SEO writing", "Editing", "Research", "Swahili", "Grammarly"] },
    finance: { titles: ["Bookkeeper", "Accounts Assistant", "Payroll Specialist", "Financial Analyst", "Operations Coordinator"], tags: ["QuickBooks", "Xero", "Excel", "Reconciliation", "Payroll", "CPA (K)"] },
    va: { titles: ["Virtual Assistant", "Executive Assistant", "Admin Assistant", "Appointment Setter", "E-commerce Assistant"], tags: ["Google Workspace", "Calendly", "Notion", "Shopify", "Scheduling", "Inbox management"] },
  };
  const GEN_COMPANIES = ["Savannah Tech", "Jambo Digital", "Nile Bridge", "Baobab Labs", "Kilima Cloud", "Ubuntu Works", "Mara Ventures", "Simba Systems", "Tausi Media", "Pwani Partners", "Zuri Commerce", "Rafiki Remote", "Amani Health", "Shamba Data", "Duma Logistics", "Mvua Analytics", "Kito Studio", "Imara Finance", "Upendo Care", "Bahari Global", "Nyota AI", "Safari Support", "Tembo Retail", "Kazi Partners"];
  const GEN_COLORS = ["#f97316", "#ea580c", "#111111", "#525252", "#c2410c", "#374151", "#fb923c", "#6b7280", "#9a3412", "#1f2937"];
  const GEN_LOCATIONS = { any: "Remote · Worldwide", africa: "Remote · Africa timezones", east: "Remote · East Africa", west: "Remote · West Africa", central: "Remote · Southern Africa", emea: "Remote · EMEA" };
  const GEN_SUMMARY = {
    engineering: "Build and maintain reliable software for a growing customer base.",
    design: "Create clear, beautiful visuals and product experiences for a fast-moving team.",
    marketing: "Grow the brand and bring in new customers across digital channels.",
    support: "Help customers succeed by answering questions quickly and kindly.",
    data: "Turn raw information into accurate, well-organised data the team can trust.",
    writing: "Produce clear, engaging written content for websites, clients and products.",
    finance: "Keep the numbers accurate and the back office running smoothly.",
    va: "Keep a busy team organised: inbox, calendar, documents and follow-ups.",
  };
  const DEFAULT_LIST = {
    responsibilities: ["Deliver high-quality work on agreed timelines", "Communicate progress daily with the team", "Continuously improve processes and documentation"],
    requirements: ["Reliable internet and a laptop", "Good written and spoken English", "Self-motivated and comfortable working remotely"],
  };
  // Deterministic PRNG so job #n is always the same job for every visitor.
  function rng(seed) {
    let a = (seed * 2654435761) >>> 0;
    return () => { a = (a + 0x6d2b79f5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const JOBS_PER_DAY = 40;
  const TESTIMONIALS = [
    {
      id: "t-1",
      name: "Kelvin Mutua",
      location: "Nairobi, Kenya 🇰🇪",
      role: "Frontend Engineer",
      company: "Sendwave Labs",
      avatar: "KM",
      avatarBg: "#f97316",
      quote: "Landed my first full-time USD remote role in 3 weeks. The Till payment had me cautious at first, but the verified employer badge and direct interview made it 100% worth it.",
      hired: "Hired Sep 2026",
      salary: "$4,200 / mo",
    },
    {
      id: "t-2",
      name: "Aisha Mohamed",
      location: "Mombasa, Kenya 🇰🇪",
      role: "Customer Success Associate",
      company: "Lipa Later",
      avatar: "AM",
      avatarBg: "#18181b",
      quote: "No spammy recruiter DMs or fake Telegram posts. I applied directly, my profile was forwarded with my CV, and the team interviewed me via Google Meet.",
      hired: "Hired Oct 2026",
      salary: "KES 115,000 / mo",
    },
    {
      id: "t-3",
      name: "Brian Otieno",
      location: "Kisumu, Kenya 🇰🇪",
      role: "Virtual Assistant",
      company: "Bridge Partners",
      avatar: "BO",
      avatarBg: "#ea580c",
      quote: "The Till 4374253 confirmation took under 2 hours. Applied to 4 vetted roles and got 2 callbacks. Working full-time remotely without leaving home.",
      hired: "Hired Oct 2026",
      salary: "$1,100 / mo",
    },
    {
      id: "t-4",
      name: "Chidinma Okafor",
      location: "Lagos, Nigeria 🇳🇬",
      role: "Product Designer",
      company: "Andela Studio",
      avatar: "CO",
      avatarBg: "#3359DF",
      quote: "The timezone match feature was a game-changer. I found a company that aligns perfectly with West African hours.",
      hired: "Hired Aug 2026",
      salary: "$55 / hr",
    },
  ];

  const LIVE_ACTIVITIES = [
    { text: "Mercy K. from Nairobi enrolled via Till 4374253", time: "6m ago" },
    { text: "Sendwave Labs shortlisted 3 candidate CVs", time: "14m ago" },
    { text: "David O. from Lagos applied for Frontend Engineer", time: "28m ago" },
    { text: "Lipa Later posted Customer Success Associate", time: "42m ago" },
    { text: "Faith W. from Nakuru verified & applied to Twiga", time: "1h ago" },
  ];

  function generatedJob(n) {
    const r = rng(n + 1), pick = (arr) => arr[Math.floor(r() * arr.length)];
    const cat = CATEGORIES[Math.floor(r() * CATEGORIES.length)].id, g = GEN[cat];
    const tz = pick(Object.keys(GEN_LOCATIONS));
    const tags = [...new Set([pick(g.tags), pick(g.tags), pick(g.tags)])];
    const flags = ["🇰🇪", "🇳🇬", "🇷🇼", "🇿🇦", "🇬🇭", "🌍"];
    let pay;
    if (r() < 0.45) { const min = (3 + Math.floor(r() * 25)) * 5000; pay = { currency: "KES", min, max: min + (1 + Math.floor(r() * 6)) * 10000, unit: "MONTH" }; }
    else if (r() < 0.5) { const min = 5 + Math.floor(r() * 30); pay = { currency: "USD", min, max: min + 5 + Math.floor(r() * 15), unit: "HOUR" }; }
    else { const min = (4 + Math.floor(r() * 30)) * 100; pay = { currency: "USD", min, max: min + (2 + Math.floor(r() * 10)) * 100, unit: "MONTH" }; }
    return {
      id: "g-" + n, title: pick(g.titles), company: pick(GEN_COMPANIES), color: pick(GEN_COLORS),
      category: cat, type: pick(TYPES), location: GEN_LOCATIONS[tz], pay, tz,
      posted: Math.floor(n / JOBS_PER_DAY), featured: r() < 0.06, status: "approved",
      applicants: Math.floor(r() * 180), tags, summary: GEN_SUMMARY[cat], ...DEFAULT_LIST, generated: true,
      verified: true, flag: pick(flags), tzOverlap: GEN_LOCATIONS[tz].replace("Remote · ", ""),
    };
  }

  // ---- Demo store (localStorage-backed; replaced by real APIs later) ----
  const LS = {
    get(key, fallback) {
      try { const v = localStorage.getItem("kazi:" + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) { localStorage.setItem("kazi:" + key, JSON.stringify(value)); },
  };

  const clone = (x) => JSON.parse(JSON.stringify(x));

  // Human-readable salary from the structured `pay` field with USD / KES conversion support.
  const UNITS = { MONTH: "/ mo", HOUR: "/ hr", WORD: "/ word", YEAR: "/ yr" };
  function salaryText(p, targetCurrency = LS.get("currency", "USD")) {
    if (!p) return "";
    const rate = CONFIG.USD_TO_KES;
    let min = p.min;
    let max = p.max;
    let curr = p.currency;

    if (targetCurrency === "KES" && curr === "USD") {
      min = Math.round(min * rate);
      if (max) max = Math.round(max * rate);
      curr = "KES";
    } else if (targetCurrency === "USD" && curr === "KES") {
      min = Math.round(min / rate);
      if (max) max = Math.round(max / rate);
      curr = "USD";
    }

    const sym = curr === "USD" ? "$" : "KES ";
    const f = (n) => sym + Number(n).toLocaleString();
    const range = max ? f(min) + " – " + (curr === "USD" ? "$" : "") + Number(max).toLocaleString() : f(min);
    return [range, p.note || UNITS[p.unit] || ""].join(" ").trim();
  }
  const withSalary = (j) => ({ ...j, salary: salaryText(j.pay) });

  const KaziStore = {
    config: CONFIG,
    categories: CATEGORIES,
    types: TYPES,
    zones: ZONES,
    tzRanges: TZ_RANGES,
    countries: COUNTRIES,
    testimonials: TESTIMONIALS,
    liveActivities: LIVE_ACTIVITIES,
    enrollmentsByWeek: ENROLLMENTS_BY_WEEK,

    allJobs() { return (LS.get("jobs", null) || clone(JOBS)).map(withSalary); },
    saveJobs(jobs) { LS.set("jobs", jobs); },
    publicJobs() { return this.allJobs().filter((j) => j.status === "approved"); },
    getJob(id) {
      if (/^g-\d+$/.test(id)) return withSalary(generatedJob(Number(id.slice(2))));
      return this.allJobs().find((j) => j.id === id);
    },
    jobsPage({ match = () => true, sort = "recent", limit = 20, cursor = null } = {}) {
      const curated = this.publicJobs().filter(match);
      if (sort === "recent") curated.sort((a, b) => a.posted - b.posted);
      if (sort === "featured") curated.sort((a, b) => (b.featured - a.featured) || (a.posted - b.posted));
      if (sort === "popular") curated.sort((a, b) => b.applicants - a.applicants);
      let { c, g } = cursor || { c: 0, g: 0 };
      const out = [];
      let scanned = 0;
      while (out.length < limit && scanned < 20000) {
        const takeCurated = c < curated.length && (sort !== "recent" || curated[c].posted <= Math.floor(g / JOBS_PER_DAY));
        if (takeCurated) { out.push(curated[c++]); continue; }
        const job = withSalary(generatedJob(g++));
        scanned++;
        if (match(job)) out.push(job);
      }
      return { jobs: out, next: { c, g } };
    },
    unlimited: true,
    submitJob(job) {
      const jobs = this.allJobs();
      const record = { ...job, id: "j-" + Date.now(), posted: 0, status: "pending", applicants: 0, featured: false, verified: true };
      jobs.unshift(record);
      this.saveJobs(jobs);
      return record;
    },
    setJobStatus(id, status) {
      const jobs = this.allJobs().map((j) => (j.id === id ? { ...j, status } : j));
      this.saveJobs(jobs);
    },

    // Regional & Location-based payments
    regionalPayments: REGIONAL_PAYMENTS,
    getCountryPayment(countryCode) {
      const code = (countryCode || this.selectedCountry() || "KE").toUpperCase();
      return REGIONAL_PAYMENTS[code] || REGIONAL_PAYMENTS.GLOBAL;
    },
    selectedCountry() {
      return LS.get("selectedCountry", "KE");
    },
    setSelectedCountry(c) {
      LS.set("selectedCountry", c);
      document.dispatchEvent(new CustomEvent("kazi:country_changed", { detail: c }));
    },

    payments() { return LS.get("payments", null) || clone(PAYMENTS); },
    setPaymentStatus(id, status) {
      LS.set("payments", this.payments().map((p) => (p.id === id ? { ...p, status } : p)));
    },
    isDuplicateCode(code) {
      if (!code) return false;
      const normalized = code.trim().toUpperCase();
      return this.payments().some((p) => p.code && p.code.trim().toUpperCase() === normalized);
    },
    submitPayment({ name, email, phone, code, countryCode }) {
      const reg = this.getCountryPayment(countryCode || "KE");
      const record = {
        id: "p-" + Date.now(),
        name,
        email,
        phone,
        country: reg.country,
        countryCode: reg.code,
        currency: reg.currency,
        gateway: reg.gateway,
        code: code ? code.toUpperCase() : "STK-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        amount: reg.amount,
        amountDisplay: reg.feeDisplay,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        status: "pending"
      };
      LS.set("payments", [record, ...this.payments()]);
      return record;
    },

    // STK Push / Instant Mobile Money simulation
    triggerInstantPayment({ phone, countryCode, name, email }) {
      const reg = this.getCountryPayment(countryCode || "KE");
      const randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
      const prefix = reg.code === "KE" ? "SJK" : reg.code === "GH" ? "MMG" : reg.code === "RW" ? "RWM" : "INT";
      const code = (prefix + randomPart).slice(0, 10);

      const record = {
        id: "p-" + Date.now(),
        name: name || "Enrolled Seeker",
        email: email || (this.currentUser() ? this.currentUser().email : "seeker@kaziremote.africa"),
        phone,
        country: reg.country,
        countryCode: reg.code,
        currency: reg.currency,
        gateway: reg.gateway + " (Instant STK)",
        code,
        amount: reg.amount,
        amountDisplay: reg.feeDisplay,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
        status: "verified" // Instant verification on STK PIN confirmation
      };

      const existing = this.payments().filter((p) => p.email !== record.email);
      LS.set("payments", [record, ...existing]);
      document.dispatchEvent(new CustomEvent("kazi:auth"));
      document.dispatchEvent(new CustomEvent("kazi:payment_verified", { detail: record }));
      return record;
    },

    users() { return clone(USERS); },

    // Applications tracking & Employer Kanban Pipeline
    applications() {
      return LS.get("applications", [
        {
          id: "app-101",
          jobId: "j-101",
          jobTitle: "Senior Frontend Engineer",
          company: "Sendwave Labs",
          candidateName: "Amani Wekesa",
          candidateEmail: "amani.wekesa@gmail.com",
          candidatePhone: "0183036639",
          status: "forwarded", // 'submitted' | 'forwarded' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'hired'
          date: "2026-10-21",
          cvName: "Amani_Wekesa_Software_Engineer_CV.pdf",
          linkedin: "https://linkedin.com/in/amani-wekesa",
          github: "https://github.com/amaniwekesa",
          meetLink: "https://meet.google.com/kzi-rmte-job",
          note: "5+ years working with modern TypeScript, React, and CSS architecture across remote African teams."
        },
        {
          id: "app-102",
          jobId: "j-102",
          jobTitle: "Customer Success Associate",
          company: "Lipa Later",
          candidateName: "Faith Mwangi",
          candidateEmail: "faith.mwangi@gmail.com",
          candidatePhone: "0722104928",
          status: "shortlisted",
          date: "2026-10-22",
          cvName: "Faith_Mwangi_CustomerSuccess_CV.pdf",
          linkedin: "https://linkedin.com/in/faithmwangi",
          github: "",
          meetLink: "https://meet.google.com/fth-lpa-call",
          note: "Fluent in English and Swahili with Zendesk and fintech merchant onboarding expertise."
        }
      ]);
    },
    submitApplication({ jobId, cvName, linkedin, github, note }) {
      const apps = this.applications();
      const job = this.getJob(jobId);
      const user = this.currentUser() || { name: "Amani Wekesa", email: "amani.wekesa@gmail.com" };
      const newApp = {
        id: "app-" + Date.now(),
        jobId,
        jobTitle: job ? job.title : "Remote Role",
        company: job ? job.company : "Hiring Company",
        candidateName: user.name,
        candidateEmail: user.email,
        candidatePhone: "0183036639",
        status: "submitted",
        date: new Date().toISOString().slice(0, 10),
        cvName: cvName || "Amani_Wekesa_Resume_2026.pdf",
        linkedin: linkedin || "",
        github: github || "",
        meetLink: "https://meet.google.com/new",
        note: note || ""
      };
      apps.unshift(newApp);
      LS.set("applications", apps);
      this.apply(jobId);
      return newApp;
    },
    updateApplicationStage(appId, newStage, meetLink = "") {
      const apps = this.applications().map((a) => {
        if (a.id === appId) {
          return { ...a, status: newStage, meetLink: meetLink || a.meetLink };
        }
        return a;
      });
      LS.set("applications", apps);
      document.dispatchEvent(new CustomEvent("kazi:application_updated", { detail: { appId, newStage } }));
      return apps;
    },
    getApplication(jobId) {
      return this.applications().find((a) => a.jobId === jobId);
    },

    // Job Alerts subscription
    jobAlerts() {
      return LS.get("alerts", [
        { id: "alt-1", channel: "whatsapp", destination: "0183036639", category: "all", created: "2026-10-20" }
      ]);
    },
    subscribeAlert({ channel, destination, category }) {
      const alerts = this.jobAlerts();
      const newAlert = {
        id: "alt-" + Date.now(),
        channel,
        destination,
        category: category || "all",
        created: new Date().toISOString().slice(0, 10)
      };
      alerts.unshift(newAlert);
      LS.set("alerts", alerts);
      return newAlert;
    },

    // ATS Remote Readiness Match Calculation
    calculateAtsScore(job, candidateSkills = ["JavaScript", "React", "TypeScript", "Remote Work", "Communication", "CSS", "Node.js"]) {
      if (!job || !job.tags || !job.tags.length) return 88;
      const lowerCandidate = candidateSkills.map((s) => s.toLowerCase());
      const matched = job.tags.filter((t) => lowerCandidate.includes(t.toLowerCase())).length;
      const ratio = matched / job.tags.length;
      const score = Math.round(65 + ratio * 30);
      return Math.min(99, Math.max(68, score));
    },

    // Session (stub for Google sign-in)
    currentUser() { return LS.get("user", null); },
    signInDemo() {
      const user = { name: "Amani Wekesa", email: "amani.wekesa@gmail.com", initials: "AW", provider: "google" };
      LS.set("user", user);
      return user;
    },
    signOut() { localStorage.removeItem("kazi:user"); },

    // Enrollment status for the signed-in seeker: "none" | "pending" | "active"
    enrollment() {
      const user = this.currentUser();
      if (!user) return "none";
      const mine = this.payments().find((p) => p.email === user.email);
      if (!mine) return "none";
      return mine.status === "verified" ? "active" : mine.status === "pending" ? "pending" : "none";
    },

    // Display preferences
    currency() { return LS.get("currency", "USD"); },
    setCurrency(c) {
      LS.set("currency", c);
      document.dispatchEvent(new CustomEvent("kazi:currency", { detail: c }));
    },
    formatSalaryForJob(pay) {
      return salaryText(pay, this.currency());
    },
    contrast() { return LS.get("contrast", "normal"); },
    setContrast(c) { LS.set("contrast", c); },

    applied() { return LS.get("applied", ["j-101"]); },
    apply(jobId) { const a = this.applied(); if (!a.includes(jobId)) LS.set("applied", [...a, jobId]); },

    resetDemo() { ["jobs", "payments", "applied", "user", "applications", "currency", "selectedCountry", "alerts"].forEach((k) => localStorage.removeItem("kazi:" + k)); },
  };

  window.KaziStore = KaziStore;
})();
