export const RESUME_URL = "/Varsha_Bhatt_Resume_2026.pdf";
export const EMAIL = "bhattversha10@gmail.com";
export const PHONE = "+917974656773";
export const LINKEDIN = "https://www.linkedin.com/in/varsha-bhatt-9a8a2a231/";

export const nav = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 95, suffix: "%", label: "Defect resolution rate" },
  { value: 30, suffix: "%", label: "Fewer cross-browser compatibility issues" },
  { value: 10000, suffix: "", label: "Concurrent users load tested" },
  { value: 25, suffix: "%", label: "Improvement in user satisfaction" },
];

export type SkillGroup = {
  title: string;
  span: 7 | 5;
  tone: "" | "n";
  tags: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Testing Types",
    span: 7,
    tone: "",
    tags: ["Manual", "Functional", "Regression", "Smoke", "Sanity", "Retesting", "Exploratory", "Black Box", "UI/UX", "Cross-Browser", "Responsive", "API", "Non-Functional", "Mobile (Android & iOS)", "PWA"],
  },
  { title: "Tools", span: 5, tone: "n", tags: ["JIRA", "Postman", "LambdaTest", "Browser DevTools", "Trello"] },
  {
    title: "Process",
    span: 7,
    tone: "n",
    tags: ["Agile/Scrum", "SDLC", "STLC", "Defect Life Cycle", "Test Case Design", "Requirement Analysis", "Bug Reporting", "Test Reporting", "UAT Support"],
  },
  { title: "Platforms", span: 5, tone: "", tags: ["Windows", "Linux"] },
];

export type Project = {
  span: 2 | 3;
  tone: string;
  domain: string;
  name: string;
  desc: string;
  team: string;
  stack: string[];
  tested: string[];
  details: string[];
  url: string;
};

export const projects: Project[] = [
  {
    span: 2,
    tone: "t-fin",
    domain: "FINTECH",
    name: "Maji",
    desc: "Financial wellbeing & money management platform.",
    team: "Team of 8",
    stack: ["Django", "Angular", "Web + PWA"],
    tested: ["UI & cross-browser testing", "PWA testing on Android & iOS"],
    details: [
      "Analyzed requirements, created test scenarios and executed test cases for web and PWA features.",
      "Logged, tracked and retested defects through the full defect life cycle.",
    ],
    url: "https://maji.io/",
  },
  {
    span: 2,
    tone: "t-eco",
    domain: "E-COMMERCE",
    name: "Specxweb",
    desc: "B2B/B2C e-commerce platform for eyeglasses.",
    team: "Team of 6",
    stack: ["B2B", "B2C"],
    tested: ["Functional & UI testing", "Inventory & pricing integration", "Loyalty program"],
    details: [
      "End-to-end functional and UI testing for vendor and customer journeys.",
      "Managed defect tracking and supported deployment of a unified loyalty program.",
    ],
    url: "https://specxweb.com/",
  },
  {
    span: 2,
    tone: "t-hea",
    domain: "HEALTHCARE",
    name: "MYCareBridge",
    desc: "Communication platform for ASD/ADHD assessments.",
    team: "Team of 6",
    stack: ["NestJS", "React"],
    tested: ["Functional & API testing", "Regression & exploratory"],
    details: [
      "Secure information exchange between clinicians, schools and parents/carers.",
      "Functional and API testing for accuracy, reliability and secure data exchange.",
    ],
    url: "https://mycarebridge.co.uk/",
  },
  {
    span: 3,
    tone: "t-soc",
    domain: "HEALTH & SOCIAL CARE",
    name: "Thriving.ai",
    desc: "Health & social care platform for older adults.",
    team: "Team of 4",
    stack: ["Android", "iOS"],
    tested: ["Android & iOS app testing"],
    details: ["Mobile app testing across Android and iOS devices for an older-adult audience."],
    url: "https://thriving.ai/",
  },
  {
    span: 3,
    tone: "t-ev",
    domain: "EV / ENERGY",
    name: "RightCharge",
    desc: "EV home charging platform.",
    team: "Team of 4",
    stack: ["Django", "Vue.js"],
    tested: ["Functional & non-functional testing", "API testing"],
    details: ["Functional, non-functional and API testing for the EV home charging journey."],
    url: "https://rightcharge.co.uk/",
  },
];

export const experienceBullets = [
  "Functional, regression, smoke, sanity and exploratory testing on web, mobile and PWA apps",
  "API testing with Postman; cross-browser and device testing with LambdaTest",
  "Defect logging and tracking in JIRA through the full defect life cycle",
  "Test case design, test reporting and UAT support in Agile/Scrum teams",
];
