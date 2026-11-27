export const BRAND = {
  name: "VLEARNIN",
  legalName: "VLEARNIN Academy",
  tagline: "The V-Way to Learn, Build & Lead.",
  website: "https://vlearnin.com",
  email: "info@vlearnin.com",
  phoneDisplay: "+91 70223 37580",
  phoneHref: "tel:+917022337580",
  whatsappNumber: "917022337580",
  whatsappBaseUrl: "https://wa.me/917022337580",
  address: "6th Block, Rajajinagar (Next to Sangeetha Mobiles), Bengaluru, Karnataka – 560010",
  shortLocation: "Rajajinagar, Bengaluru",
  timings: {
    weekdays: "Monday–Saturday: 7:30 AM–8:30 PM",
    sunday: "Sunday: Weekend Bootcamps & Demo Sessions, 9:30 AM–5:00 PM",
  },
  placementDisclaimer:
    "VLEARNIN provides structured career preparation, portfolio development, resume building, mock interviews, and interview opportunities through our hiring network. Final selection depends on candidate performance and employer recruitment criteria.",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${BRAND.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface OfficialCourseSeed {
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  durationHours: number;
  durationLabel: string;
  idealFor: string;
  summary: string;
  overview: string;
  capstoneTitle: string;
  capstoneDescription: string;
  careerPathways: string[];
  learningModes: string[];
  image: string;
  tools: string[];
  outcomes: string[];
  modules: {
    moduleNumber: number;
    title: string;
    durationHours: number;
    summary: string;
    topics: string[];
  }[];
}

export interface OfficialCategorySeed {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  outcomeSummary: string;
  image: string;
  displayOrder: number;
}

export interface OfficialComboSeed {
  slug: string;
  title: string;
  durationHours: number;
  durationLabel: string;
  includedLabel: string;
  idealFor: string;
  summary: string;
  outcomes: string[];
  courseSlugs: string[];
  image: string;
  displayOrder: number;
}

export const OFFICIAL_CATEGORIES: OfficialCategorySeed[] = [
  {
    slug: "ai-business-intelligence",
    name: "Artificial Intelligence & Business Intelligence",
    shortName: "AI & Analytics",
    description:
      "AI workflows, Power Query, DAX, and Power BI dashboards.",
    outcomeSummary:
      "Automate workflows, clean datasets, and build Power BI dashboards.",
    image: "/images/domain-ai-bi.webp",
    displayOrder: 1,
  },
  {
    slug: "corporate-finance-capital-markets",
    name: "Corporate Finance & Capital Markets",
    shortName: "Finance & IB",
    description:
      "Excel financial models, DCF valuations, M&A, and pitchbooks.",
    outcomeSummary:
      "Build dynamic Excel models, valuations, and M&A deal structures.",
    image: "/images/domain-finance.webp",
    displayOrder: 2,
  },
  {
    slug: "digital-marketing-creative-media",
    name: "Digital Marketing & Creative Media",
    shortName: "Digital & Media",
    description:
      "Performance ads, brand content systems, and commercial video editing.",
    outcomeSummary:
      "Launch ad campaigns, grow social brands, and edit short-form videos.",
    image: "/images/domain-digital-media.webp",
    displayOrder: 3,
  },
];

export const OFFICIAL_COURSES: OfficialCourseSeed[] = [
  {
    slug: "ai-tools-for-commerce-business",
    title: "Certified AI Tools for Commerce & Business",
    categorySlug: "ai-business-intelligence",
    categoryName: "AI & Business Intelligence",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "B.Com, BBA, MBA students, working professionals and business owners.",
    summary:
      "Use generative AI and prompt engineering to automate daily business and spreadsheet tasks.",
    overview:
      "Designed specifically for commerce, management, and business professionals, this 30-hour programme transforms how you research markets, draft communications, analyze spreadsheets, and automate repetitive business workflows.",
    capstoneTitle: "Custom Workplace AI Operations Suite",
    capstoneDescription:
      "Design and present an end-to-end AI workflow combining structured prompt templates, automated spreadsheet reporting, and customer response systems for a real business scenario.",
    careerPathways: ["AI Operations Intern", "Business Analyst", "MIS Executive"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-ai-commerce.webp",
    tools: [
      "ChatGPT",
      "Claude",
      "Microsoft Copilot",
      "Google Gemini",
      "AI Spreadsheet & Automation Tools",
    ],
    outcomes: [
      "Build effective business prompts with structured context and guardrails",
      "Automate spreadsheet reporting, summaries, and operational trackers",
      "Conduct AI-powered market research and competitor benchmarking",
      "Deploy custom workplace AI workflows with data-privacy awareness",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "AI Foundations, Workspaces, Privacy & Prompt Engineering",
        durationHours: 6,
        summary: "Core LLM mechanics, enterprise workspace setup, data hygiene, and structured prompting.",
        topics: [
          "Understanding generative AI models for business",
          "Workspace configuration & data privacy best practices",
          "Role, context, constraint, and few-shot prompting frameworks",
          "Evaluating accuracy and mitigating hallucinations",
        ],
      },
      {
        moduleNumber: 2,
        title: "AI for Market Research, Competitor Analysis & Brand Strategy",
        durationHours: 6,
        summary: "Rapid industry synthesis, customer persona mapping, and competitive intelligence.",
        topics: [
          "Structured market sizing and competitor matrix generation",
          "Synthesizing customer reviews and survey feedback",
          "Positioning statements and go-to-market briefs",
          "Executive presentation structuring",
        ],
      },
      {
        moduleNumber: 3,
        title: "AI for Marketing, Content & Customer Service",
        durationHours: 6,
        summary: "Multi-channel business communication, campaign ideation, and support playbooks.",
        topics: [
          "High-clarity business emails, proposals, and SOPs",
          "Campaign messaging and landing page copy frameworks",
          "Customer support response templates & FAQ knowledge bases",
          "Brand voice consistency across channels",
        ],
      },
      {
        moduleNumber: 4,
        title: "AI for Operations, Projects, Spreadsheets & Business Reporting",
        durationHours: 6,
        summary: "Spreadsheet formula generation, data cleaning, MIS summaries, and project tracking.",
        topics: [
          "Excel/Sheets formula generation & troubleshooting with AI",
          "Summarizing financial and operational tables",
          "Meeting notes to action-item trackers",
          "Vendor, inventory, and SOP documentation workflows",
        ],
      },
      {
        moduleNumber: 5,
        title: "Custom AI Workflows, Automation, Capstone & Practical Assessment",
        durationHours: 6,
        summary: "Building reusable custom assistants, no-code triggers, and final capstone evaluation.",
        topics: [
          "Building custom GPTs / Gems for recurring business tasks",
          "Connecting forms, sheets, and email summaries",
          "Live capstone project presentation",
          "Practical assessment & certification review",
        ],
      },
    ],
  },
  {
    slug: "data-visualization-power-bi",
    title: "Certified Data Visualization Using Power BI",
    categorySlug: "ai-business-intelligence",
    categoryName: "AI & Business Intelligence",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "B.Com, BBA, BCA, B.Sc graduates and aspiring Data / Business Analysts.",
    summary:
      "Clean data in Power Query, write DAX measures, and build Power BI dashboards.",
    overview:
      "Organizations rely on clear, decision-ready dashboards rather than static spreadsheets. This 30-hour hands-on programme guides you from raw messy CSV/Excel files to polished multi-page Power BI executive reports.",
    capstoneTitle: "Multi-Page Executive Business Intelligence Dashboard",
    capstoneDescription:
      "Ingest multi-table sales, finance, or operations data, model relationships in Power BI, build DAX KPIs, and present actionable insights to an evaluation panel.",
    careerPathways: ["Junior Data Analyst", "Business Analyst", "MIS Executive"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-power-bi.webp",
    tools: [
      "Microsoft Power BI Desktop",
      "Power Query",
      "DAX",
      "Microsoft Excel",
      "CSV/Data Connectors",
    ],
    outcomes: [
      "Clean and transform raw business data using Power Query",
      "Design star-schema data models with clean relationships",
      "Write foundational DAX measures and time-intelligence KPIs",
      "Present interactive executive dashboards with clear storytelling",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Data Visualization Foundations & Power BI Environment",
        durationHours: 6,
        summary: "BI architecture, visual perception principles, and Power BI Desktop workflow.",
        topics: [
          "Business Intelligence lifecycle & KPI selection",
          "Power BI Desktop interface: Report, Data, and Model views",
          "Choosing the right chart for business questions",
          "Connecting initial Excel and CSV datasets",
        ],
      },
      {
        moduleNumber: 2,
        title: "Data Sources, Power Query & Data Cleaning",
        durationHours: 6,
        summary: "Automated ETL pipelines, unpivoting, merging, and data type standardization.",
        topics: [
          "Power Query Editor transformations & applied steps",
          "Handling nulls, duplicates, splitting, and formatting",
          "Append vs Merge queries across multiple files",
          "Folder-level automated data ingestion",
        ],
      },
      {
        moduleNumber: 3,
        title: "Data Transformation, Calculations & Basic DAX",
        durationHours: 6,
        summary: "Star schema modeling, calculated columns vs measures, and core DAX.",
        topics: [
          "Fact and dimension tables, cardinality & filter direction",
          "Calculated columns vs dynamic DAX measures",
          "SUMX, CALCULATE, FILTER, and basic time intelligence",
          "Creating a dedicated Date table",
        ],
      },
      {
        moduleNumber: 4,
        title: "Reports, Charts, Advanced Visuals & Interactive Design",
        durationHours: 6,
        summary: "Slicers, drill-through, bookmarks, tooltips, and executive layout hierarchy.",
        topics: [
          "KPI cards, matrices, conditional formatting, and combo charts",
          "Cross-filtering, slicers, and drill-through pages",
          "Custom report-page tooltips and navigation buttons",
          "Color discipline and accessible dashboard typography",
        ],
      },
      {
        moduleNumber: 5,
        title: "Business Dashboard, Insight Presentation & Capstone",
        durationHours: 6,
        summary: "End-to-end dashboard build, publishing overview, and stakeholder presentation.",
        topics: [
          "Optimizing report performance and layout",
          "Power BI Service sharing concepts",
          "Executive insight storytelling from dashboard findings",
          "Capstone dashboard defense & practical assessment",
        ],
      },
    ],
  },
  {
    slug: "financial-modelling-for-business",
    title: "Certified Professional in Financial Modelling for Business",
    categorySlug: "corporate-finance-capital-markets",
    categoryName: "Corporate Finance & Capital Markets",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "B.Com Finance/Accounting, BBA, MBA, M.Com and CA/CMA aspirants.",
    summary:
      "Build 3-statement Excel forecasts, DCF valuations, and startup models.",
    overview:
      "Built for finance students and analysts who want to move beyond textbook accounting into live Excel modelling. You will construct audit-ready, dynamically linked financial models from scratch.",
    capstoneTitle: "Integrated 3-Statement Forecast & DCF Valuation Model",
    capstoneDescription:
      "Build a complete historical-to-forecast 3-statement model with sensitivity tables and a Discounted Cash Flow valuation for a real business case.",
    careerPathways: ["Financial Analyst", "Finance Executive", "Business Analyst"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-financial-modelling.webp",
    tools: [
      "Microsoft Excel",
      "Advanced Financial Functions",
      "Scenario Manager",
      "DCF & Valuation Templates",
    ],
    outcomes: [
      "Construct dynamic three-statement financial forecasts in Excel",
      "Perform DCF company valuations with WACC and terminal value",
      "Build basic LBO/M&A transaction and sensitivity models",
      "Create investor-ready startup financial projections",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Financial Modelling Foundations & Excel",
        durationHours: 6,
        summary: "Keyboard-first Excel speed, modelling standards, and dynamic lookup/logical functions.",
        topics: [
          "Financial modelling formatting & color-coding conventions",
          "INDEX-MATCH, XLOOKUP, SUMIFS, and dynamic flags",
          "Working capital, depreciation, and debt schedule mechanics",
          "Error-checking and model audit switches",
        ],
      },
      {
        moduleNumber: 2,
        title: "Integrated Financial & Forecasting Models",
        durationHours: 6,
        summary: "Linking Income Statement, Balance Sheet, and Cash Flow Statement dynamically.",
        topics: [
          "Historical statement normalization and driver analysis",
          "Revenue and cost driver-based forecasting",
          "Balancing the Balance Sheet via Cash Flow & Revolver",
          "Scenario & sensitivity analysis (Data Tables, CHOOSE)",
        ],
      },
      {
        moduleNumber: 3,
        title: "Valuation Models",
        durationHours: 6,
        summary: "Intrinsic and relative valuation methodologies.",
        topics: [
          "Free Cash Flow to Firm (FCFF) and WACC estimation",
          "Terminal Value: Perpetuity Growth vs Exit Multiple",
          "Comparable Company Analysis (Trading Multiples)",
          "Football field valuation summary",
        ],
      },
      {
        moduleNumber: 4,
        title: "Transaction & Corporate Models",
        durationHours: 6,
        summary: "Corporate capital allocation, M&A accretion/dilution, and LBO basics.",
        topics: [
          "M&A EPS accretion / dilution fundamentals",
          "Sources & Uses of funds in a buyout",
          "Debt paydown and IRR sensitivity in LBOs",
          "Capital budgeting (NPV, IRR, Payback) in corporate cases",
        ],
      },
      {
        moduleNumber: 5,
        title: "Startup & Business Financial Modelling Lab",
        durationHours: 6,
        summary: "Unit economics, SaaS/D2C startup projections, and capstone evaluation.",
        topics: [
          "CAC, LTV, burn rate, and runway modelling",
          "Monthly-to-annual startup financial plan",
          "Presenting model outputs to management/investors",
          "Capstone model review & practical assessment",
        ],
      },
    ],
  },
  {
    slug: "investment-banking-professional",
    title: "Certified Investment Banking Professional",
    categorySlug: "corporate-finance-capital-markets",
    categoryName: "Corporate Finance & Capital Markets",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "MBA, M.Com, finance undergraduates and capital market career aspirants.",
    summary:
      "Master IPO equity markets, M&A structuring, LBOs, and debt instruments.",
    overview:
      "Gain practical exposure to how investment banks advise corporations on raising capital, executing mergers and acquisitions, structuring leveraged buyouts, and navigating global capital market regulations.",
    capstoneTitle: "M&A / IPO Investment Banking Pitchbook Case",
    capstoneDescription:
      "Evaluate a live corporate transaction, structure the deal rationale and valuation range, and present an executive investment banking pitchbook.",
    careerPathways: ["Financial Analyst", "Finance Executive", "Corporate Finance Associate"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-investment-banking.webp",
    tools: [
      "Deal Structuring Frameworks",
      "Pitchbook Templates",
      "IPO/M&A Case Models",
    ],
    outcomes: [
      "Analyse IPO/FPO capital-raising processes and book-building mechanics",
      "Evaluate M&A and corporate restructuring deals end to end",
      "Understand LBO and debt-financing structures through live case studies",
      "Navigate international finance instruments and regulatory frameworks",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Investment Banking & Equity Capital Markets",
        durationHours: 6,
        summary: "IB division structure, ECM mandate lifecycle, IPOs, FPOs, and private placements.",
        topics: [
          "Front, middle, and back-office investment banking roles",
          "IPO readiness, DRHP, book-building, and pricing",
          "Rights issues, QIPs, and secondary offerings",
          "Underwriting syndicates and fee structures",
        ],
      },
      {
        moduleNumber: 2,
        title: "Mergers & Acquisitions & Corporate Restructuring",
        durationHours: 6,
        summary: "Buy-side vs sell-side M&A process, synergies, and restructuring.",
        topics: [
          "Strategic vs financial buyers and deal rationale",
          "Sell-side auction process: Teaser, CIM, LOI, Due Diligence",
          "Spin-offs, divestitures, and corporate restructuring",
          "Synergy estimation and deal-breaker risks",
        ],
      },
      {
        moduleNumber: 3,
        title: "Leveraged Buyouts & Deal Structuring",
        durationHours: 6,
        summary: "Private equity buyout mechanics, debt tranches, and value creation levers.",
        topics: [
          "Characteristics of strong LBO candidates",
          "Senior debt, mezzanine, and equity sponsor layers",
          "Cash-free debt-free adjustments & working capital pegs",
          "Exit strategies and sponsor return analysis",
        ],
      },
      {
        moduleNumber: 4,
        title: "Debt Capital Markets & Structured Finance",
        durationHours: 6,
        summary: "Corporate bonds, credit ratings, syndicated loans, and securitization.",
        topics: [
          "Investment-grade vs high-yield debt instruments",
          "Covenants, credit spreads, and rating agency metrics",
          "Securitization and asset-backed structures overview",
          "Interest rate hedging basics in corporate debt",
        ],
      },
      {
        moduleNumber: 5,
        title: "International Finance, Regulations & Investment Banking Practice",
        durationHours: 6,
        summary: "Cross-border transactions, SEBI/global compliance, and pitchbook capstone.",
        topics: [
          "Cross-border M&A, ADRs/GDRs, and FX considerations",
          "SEBI, insider trading, and Chinese Wall compliance",
          "Crafting institutional-grade IB pitchbooks",
          "Capstone case presentation & assessment",
        ],
      },
    ],
  },
  {
    slug: "ai-powered-digital-marketing",
    title: "Certified AI-Powered Digital Marketing Professional",
    categorySlug: "digital-marketing-creative-media",
    categoryName: "Digital Marketing & Creative Media",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "Students, job seekers, freelancers and business owners looking to scale online.",
    summary:
      "Run SEO, Google Ads, Meta Ads, and GA4 campaigns with AI workflows.",
    overview:
      "Modern digital marketing blends performance analytics with AI-assisted creative speed. This 30-hour programme walks you through real ad managers, keyword research, landing page conversion, and GA4 tracking.",
    capstoneTitle: "Full-Funnel Performance Campaign & GA4 Measurement Plan",
    capstoneDescription:
      "Build a complete search + paid social campaign architecture with AI-assisted ad copy, audience targeting, and GA4 conversion tracking.",
    careerPathways: ["Digital Marketing Executive", "Social Media Executive", "Performance Marketing Intern"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-digital-marketing.webp",
    tools: [
      "Google Ads",
      "Meta Ads Manager",
      "Google Analytics GA4",
      "SEO & Keyword Tools",
      "AI Copy & Creative Tools",
    ],
    outcomes: [
      "Design full-funnel digital marketing strategies powered by AI",
      "Execute on-page SEO and high-converting landing page copy",
      "Launch and optimize Google Search, Display, and Meta ad campaigns",
      "Track conversions and campaign ROI in Google Analytics GA4",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Digital Marketing Ecosystems, Funnels & AI Strategy",
        durationHours: 6,
        summary: "Customer acquisition funnels, buyer personas, and AI workflow integration.",
        topics: [
          "TOFU, MOFU, BOFU funnel architecture",
          "AI-assisted audience research & value proposition mapping",
          "Channel selection for B2C, D2C, and B2B brands",
          "Budgeting and unit economics (CAC, ROAS, CPL)",
        ],
      },
      {
        moduleNumber: 2,
        title: "Search Engine Optimization & High-Converting Website Copy",
        durationHours: 6,
        summary: "Keyword intent mapping, on-page SEO, technical basics, and conversion copywriting.",
        topics: [
          "Search intent & keyword clustering",
          "On-page SEO: titles, headers, schema, internal linking",
          "Local SEO & Google Business Profile optimization",
          "Landing page wireframing & persuasive copy",
        ],
      },
      {
        moduleNumber: 3,
        title: "Performance Marketing: Google Search & Display Ads",
        durationHours: 6,
        summary: "Campaign structure, bidding strategies, ad extensions, and quality score.",
        topics: [
          "Search campaign hierarchy & match types",
          "Responsive Search Ads & AI-assisted copy testing",
          "Display remarketing & YouTube ad basics",
          "Negative keywords and CPC optimization",
        ],
      },
      {
        moduleNumber: 4,
        title: "Paid Social Advertising: Meta Campaigns",
        durationHours: 6,
        summary: "Meta Ads Manager objectives, audience targeting, creatives, and Pixel/CAPI.",
        topics: [
          "Campaign objectives: Leads, Traffic, Sales",
          "Custom & Lookalike audiences",
          "Creative testing frameworks for Reels & Feed",
          "A/B testing & reading Meta Ads metrics",
        ],
      },
      {
        moduleNumber: 5,
        title: "Analytics GA4, Conversion Tracking & Live Campaign Capstone",
        durationHours: 6,
        summary: "GA4 events, UTM governance, reporting dashboards, and final campaign defense.",
        topics: [
          "Google Tag Manager & GA4 event/conversion setup",
          "UTM parameters and multi-channel attribution",
          "Building client-ready performance reports",
          "Live campaign strategy capstone & assessment",
        ],
      },
    ],
  },
  {
    slug: "social-media-marketing-content-creation",
    title: "Certified Social Media Marketing & Content Creation Specialist",
    categorySlug: "digital-marketing-creative-media",
    categoryName: "Digital Marketing & Creative Media",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "Aspiring social media managers, content creators, brand builders and entrepreneurs.",
    summary:
      "Design Canva brand kits and grow organic reach across Instagram, YouTube, and LinkedIn.",
    overview:
      "Brands and creators win attention through consistent storytelling, sharp visual identity, and platform-native formats. Learn how to strategize, script, design, and schedule a complete social media presence.",
    capstoneTitle: "30-Day Multi-Platform Brand Content Engine",
    capstoneDescription:
      "Develop a complete brand kit, 30-day editorial calendar, Canva carousel suite, and short-form video scripts for a real or concept brand.",
    careerPathways: ["Social Media Executive", "Digital Marketing Executive", "Content Strategist"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-social-media.webp",
    tools: [
      "Instagram Business",
      "YouTube Studio",
      "LinkedIn Pages",
      "Canva Pro",
      "AI Scripting & Scheduling Tools",
    ],
    outcomes: [
      "Build a complete 30-day multi-platform content engine",
      "Design professional brand creatives and carousels in Canva",
      "Write high-retention hooks and AI-assisted scripts",
      "Grow organic engagement across Instagram, YouTube Shorts, and LinkedIn",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Brand Positioning, Audience Personas & Platform Algorithms",
        durationHours: 6,
        summary: "Content pillars, visual identity systems, and how modern social feeds rank content.",
        topics: [
          "Defining brand voice, tone, and audience personas",
          "Algorithm signals: watch time, saves, shares, comments",
          "Profile optimization across Instagram, LinkedIn & YouTube",
          "Competitor content audits",
        ],
      },
      {
        moduleNumber: 2,
        title: "Content Strategy, Hook Writing & AI-Assisted Storytelling",
        durationHours: 6,
        summary: "Scroll-stopping hooks, narrative frameworks, and scripting workflows.",
        topics: [
          "The 3-second hook formula for text and video",
          "Educational, authority, and community content pillars",
          "AI-assisted ideation without losing human authenticity",
          "Caption copywriting and CTA placement",
        ],
      },
      {
        moduleNumber: 3,
        title: "Visual Branding & Carousel/Post Design with Canva",
        durationHours: 6,
        summary: "Typography, grid alignment, brand kits, and high-save carousel design.",
        topics: [
          "Building reusable Canva Brand Kits",
          "Multi-slide educational carousel architecture",
          "Thumbnail hierarchy and contrast principles",
          "Batch-creating templates for speed",
        ],
      },
      {
        moduleNumber: 4,
        title: "Instagram Reels, YouTube Shorts & LinkedIn Growth Systems",
        durationHours: 6,
        summary: "Platform-specific distribution playbooks for B2C and B2B growth.",
        topics: [
          "Instagram Reels & YouTube Shorts pacing and formats",
          "LinkedIn thought-leadership & company page growth",
          "Creator collaborations & UGC briefs",
          "Analyzing retention graphs in Insights & YouTube Studio",
        ],
      },
      {
        moduleNumber: 5,
        title: "Content Calendars, Community Management & 30-Day Brand Capstone",
        durationHours: 6,
        summary: "Scheduling workflows, community engagement, and 30-day capstone presentation.",
        topics: [
          "Building a 30-day multi-platform content calendar",
          "Comment moderation, DM workflows & crisis etiquette",
          "Monthly social media analytics reporting",
          "Capstone brand portfolio defense & assessment",
        ],
      },
    ],
  },
  {
    slug: "video-editing-reels-production",
    title: "Certified Video Editing & Reels Production Specialist",
    categorySlug: "digital-marketing-creative-media",
    categoryName: "Digital Marketing & Creative Media",
    durationHours: 30,
    durationLabel: "30 Hours (5 Modules × 6 Hours)",
    idealFor: "Aspiring video editors, YouTubers, digital marketers and freelance creators.",
    summary:
      "Edit high-retention Reels, YouTube videos, and promos with sound and color grading.",
    overview:
      "Short-form and long-form video dominate digital attention. This hands-on studio programme teaches timeline mastery, dynamic pacing, clean voice-over audio, color grading, and export optimization.",
    capstoneTitle: "Commercial & Creator Video Showreel",
    capstoneDescription:
      "Produce and deliver a polished showreel featuring high-retention vertical Reels/Shorts and a widescreen commercial or YouTube edit.",
    careerPathways: ["Video Editor", "Social Media Executive", "Content Producer"],
    learningModes: ["Classroom (Rajajinagar)", "Live Online", "On-Campus"],
    image: "/images/course-video-editing.webp",
    tools: [
      "Adobe Premiere Pro",
      "DaVinci Resolve (Alternative)",
      "CapCut Desktop (Where Available)",
      "Audio Cleanup & AI Captioning Tools",
    ],
    outcomes: [
      "Master non-linear timeline editing and narrative pacing",
      "Execute smooth cuts, speed ramping, and motion graphics",
      "Deliver crisp voice enhancement, music sync, and dynamic subtitles",
      "Apply color correction, grading, and platform-optimal exports",
    ],
    modules: [
      {
        moduleNumber: 1,
        title: "Video Editing Foundations, Storytelling & Timeline Workflows",
        durationHours: 6,
        summary: "Project organization, frame rates, aspect ratios, and A-roll/B-roll assembly.",
        topics: [
          "Media management, proxies, and sequence settings (16:9 vs 9:16)",
          "Story structure: hook, setup, payoff",
          "J-cuts, L-cuts, and clean A-roll tightening",
          "Keyboard shortcuts for fast timeline assembly",
        ],
      },
      {
        moduleNumber: 2,
        title: "Cuts, Transitions, Speed Ramping & Dynamic Motion Effects",
        durationHours: 6,
        summary: "Rhythm-based editing, keyframes, speed ramps, and motion graphics.",
        topics: [
          "Match cuts, whip pans, and seamless transitions",
          "Keyframe animation for scale, position, and text",
          "Speed ramping for product & lifestyle Reels",
          "Using MOGRTs and clean lower-thirds",
        ],
      },
      {
        moduleNumber: 3,
        title: "Sound Design, Voice Enhancement, Music Sync & Subtitles",
        durationHours: 6,
        summary: "Audio mixing, noise reduction, SFX layering, and retention captions.",
        topics: [
          "Dialogue cleanup, EQ, and compression basics",
          "Sourcing licensed music and cutting to the beat",
          "Whooshes, risers, and ambient SFX layering",
          "AI-assisted captioning & stylized kinetic subtitles",
        ],
      },
      {
        moduleNumber: 4,
        title: "Color Correction, Grading & High-Retention Reels/Shorts Formatting",
        durationHours: 6,
        summary: "Lumetri/Resolve scopes, skin tones, LUTs, and vertical framing.",
        topics: [
          "Reading scopes: Waveform, Parade, Vectorscope",
          "Exposure, white balance, and natural skin tones",
          "Applying cinematic LUTs tastefully",
          "Safe zones for Instagram Reels & YouTube Shorts UI",
        ],
      },
      {
        moduleNumber: 5,
        title: "Export Optimization & Commercial/Creator Showreel Capstone",
        durationHours: 6,
        summary: "Bitrate/codec settings for crisp uploads and final showreel evaluation.",
        topics: [
          "H.264 / H.265 export presets for social vs client delivery",
          "Delivering clean revisions and project archives",
          "Building a freelance/employer showreel",
          "Capstone showreel screening & practical assessment",
        ],
      },
    ],
  },
];

export const OFFICIAL_COMBOS: OfficialComboSeed[] = [
  {
    slug: "smart-office-ai-starter",
    title: "Smart Office & AI Starter",
    durationHours: 45,
    durationLabel: "45 Hours",
    includedLabel: "Advanced Excel + AI Tools for Business",
    idealFor: "Students and working professionals.",
    summary:
      "Pair Excel mastery with AI workflows to automate reporting and office tasks.",
    outcomes: [
      "Master Excel lookups, pivots, and reporting",
      "Automate emails, research, and sheets with AI",
    ],
    courseSlugs: ["ai-tools-for-commerce-business"],
    image: "/images/combo-smart-office.webp",
    displayOrder: 1,
  },
  {
    slug: "business-analytics-pro-track",
    title: "Business Analytics Pro Track",
    durationHours: 60,
    durationLabel: "60 Hours",
    includedLabel: "Advanced Excel + Power BI + AI Reporting",
    idealFor: "B.Com, BBA, BCA, and B.Sc graduates.",
    summary:
      "Go from raw Excel data to Power Query, DAX, and Power BI dashboards.",
    outcomes: [
      "Clean and model multi-source datasets",
      "Build executive Power BI dashboards with DAX",
    ],
    courseSlugs: ["data-visualization-power-bi", "ai-tools-for-commerce-business"],
    image: "/images/combo-business-analytics.webp",
    displayOrder: 2,
  },
  {
    slug: "corporate-finance-ib-master-track",
    title: "Corporate Finance & IB Master Track",
    durationHours: 60,
    durationLabel: "60 Hours",
    includedLabel: "Financial Modelling + Investment Banking",
    idealFor: "MBA, M.Com, CA/CMA, and finance aspirants.",
    summary:
      "Combine 3-statement Excel modelling and DCF valuation with M&A and IB pitchbooks.",
    outcomes: [
      "Build 3-statement forecasts and DCF models",
      "Analyze IPO, M&A, and LBO transactions",
    ],
    courseSlugs: ["financial-modelling-for-business", "investment-banking-professional"],
    image: "/images/combo-finance-ib.webp",
    displayOrder: 3,
  },
  {
    slug: "digital-creator-growth-master-track",
    title: "Digital Creator & Growth Master Track",
    durationHours: 90,
    durationLabel: "90 Hours",
    includedLabel: "Digital Marketing + Social Media + Video Editing",
    idealFor: "Marketers, creators, freelancers, and founders.",
    summary:
      "Master Google & Meta ads, SEO, social content systems, and video editing.",
    outcomes: [
      "Run ROI-tracked Google & Meta ad campaigns",
      "Edit high-retention Reels and brand videos",
    ],
    courseSlugs: [
      "ai-powered-digital-marketing",
      "social-media-marketing-content-creation",
      "video-editing-reels-production",
    ],
    image: "/images/combo-digital-creator.webp",
    displayOrder: 4,
  },
];

export const QUALIFICATION_OPTIONS = [
  "B.Com",
  "BBA",
  "BCA",
  "MBA",
  "M.Com",
  "Engineering",
  "Working Professional",
  "Business Owner",
  "Other",
] as const;

export const BATCH_TIMING_OPTIONS = [
  "Weekday Morning",
  "Weekday Evening",
  "Weekend Only",
  "Online Live",
] as const;

export const INSTITUTIONAL_DESIGNATIONS = [
  "Principal",
  "Director",
  "HOD",
  "Placement Officer",
  "Faculty Coordinator",
  "Management",
] as const;

export const BATCH_SIZE_OPTIONS = ["30–50", "51–100", "More than 100"] as const;

export const EMPLOYER_ROLE_CATEGORIES = [
  "Data & Power BI Analyst",
  "Finance & Accounts Executive",
  "Digital Marketing & Social Media",
  "Video Editor",
  "AI Operations Intern",
] as const;

export const JOB_LOCATION_OPTIONS = [
  "Rajajinagar",
  "West Bengaluru",
  "Other Bengaluru Area",
  "Remote",
] as const;

export const CAREER_PATHWAYS = [
  "MIS Executive",
  "Junior Data Analyst",
  "Business Analyst",
  "Finance Executive",
  "Financial Analyst",
  "Digital Marketing Executive",
  "Social Media Executive",
  "Video Editor",
  "AI Operations Intern",
] as const;
