/**
 * Central content + business configuration.
 * EVERYTHING marked `TODO_CLIENT` is a placeholder awaiting confirmation.
 * Membership prices below are temporary visual examples requested for the preview.
 */

export const site = {
  name: "STEEL HEART",
  fullName: "Steel Heart Fitness Studio",
  tagline: "Built with heart. Forged in steel.",
  description:
    "Steel Heart Fitness Studio. A performance-driven training environment built on discipline, consistency and heart.",
  url: "https://example.com", // TODO_CLIENT: production domain
  contact: {
    email: "hello@your-domain.com", // TODO_CLIENT
    phone: "+00 00000 00000", // TODO_CLIENT
    address: ["Studio address", "City, State, PIN"], // TODO_CLIENT
    hours: "Studio hours to be confirmed", // TODO_CLIENT
    mapUrl: "", // TODO_CLIENT: Google Maps link
  },
  social: [
    { label: "Instagram", href: "" }, // TODO_CLIENT
    { label: "Facebook", href: "" }, // TODO_CLIENT
    { label: "YouTube", href: "" }, // TODO_CLIENT
    { label: "WhatsApp", href: "" }, // TODO_CLIENT
  ],
} as const;

export const nav = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Training", href: "#training", id: "training" },
  { label: "Facility", href: "#facility", id: "facility" },
  { label: "Membership", href: "#membership", id: "membership" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const hero = {
  lines: ["BUILT WITH HEART.", "FORGED IN STEEL."],
  statement:
    "Every rep has a purpose. Every challenge builds strength. Every day is an opportunity to become stronger.",
  primary: { label: "Explore the Experience", href: "#about" },
  secondary: { label: "Join Steel Heart", href: "#membership" },
};

export const philosophy = {
  lines: ["STRENGTH IS BUILT.", "HEART IS EARNED."],
  intro:
    "Steel Heart is not about shortcuts or quick fixes. It is about the quiet decisions made again and again until strength becomes who you are.",
  pillars: [
    {
      n: "01",
      title: "Discipline",
      text: "Show up when motivation fades. Discipline is the structure that carries every session.",
    },
    {
      n: "02",
      title: "Consistency",
      text: "Progress is the sum of ordinary days done properly. Repetition builds the result.",
    },
    {
      n: "03",
      title: "Determination",
      text: "The last rep belongs to the person who decided long before the set began.",
    },
    {
      n: "04",
      title: "Progress",
      text: "Measured in effort and in the strength you carry beyond the studio floor.",
    },
  ],
};

/** Categories are subject to client confirmation. Flip `confirmed` once verified. */
export const training = [
  {
    id: "strength",
    index: "01",
    title: "Strength Training",
    kicker: "Foundation",
    text: "Build raw, honest strength through focused, progressive work.",
    confirmed: false,
  },
  {
    id: "weight",
    index: "02",
    title: "Weight Training",
    kicker: "Resistance",
    text: "Controlled resistance work shaped around technique and intent.",
    confirmed: false,
  },
  {
    id: "personal",
    index: "03",
    title: "Personal Training",
    kicker: "One to one",
    text: "Focused coaching attention built around the individual.",
    confirmed: false,
  },
  {
    id: "functional",
    index: "04",
    title: "Functional Fitness",
    kicker: "Movement",
    text: "Train movement patterns that carry into everyday life.",
    confirmed: false,
  },
  {
    id: "cardio",
    index: "05",
    title: "Cardio Training",
    kicker: "Engine",
    text: "Build the endurance and heart that sustain every other effort.",
    confirmed: false,
  },
  {
    id: "performance",
    index: "06",
    title: "Performance Training",
    kicker: "Edge",
    text: "Sharpen power, speed and athletic capacity with purpose.",
    confirmed: false,
  },
] as const;

export const mindset = {
  lines: ["NO SHORTCUTS.", "NO COMPROMISES.", "JUST PROGRESS."],
  text: "Strength is a decision renewed every session. What you give the work is what the work gives back.",
};

export const community = {
  title: "TRAIN TOGETHER. GROW TOGETHER.",
  intro:
    "Behind every strong individual is a room that keeps showing up. Steel Heart is built around shared effort.",
  values: [
    { title: "Training culture", text: "A room where effort is the common language." },
    { title: "Community", text: "Support that makes the hard days lighter." },
    { title: "Consistency", text: "Showing up together makes showing up easier." },
    { title: "Motivation", text: "Energy that is shared, never forced." },
    { title: "Shared progress", text: "Every milestone belongs to the room." },
  ],
  note: "Member photography to be added when supplied.",
};

export const membership = {
  title: "MEMBERSHIP",
  intro: "Choose a membership term that fits your plans. Ask the studio about current availability and details.",
  plans: [
    {
      name: "Monthly",
      detail: "1 month membership term",
      price: "₹1,500",
      period: "per month",
      recommended: false,
      inclusions: ["Training floor access", "Strength & cardio equipment", "Member support"],
    },
    {
      name: "Quarterly",
      detail: "3 month membership term",
      price: "₹4,000",
      period: "per quarter",
      recommended: true,
      inclusions: ["Training floor access", "Strength & cardio equipment", "Member support"],
    },
    {
      name: "Yearly",
      detail: "12 month membership term",
      price: "₹14,000",
      period: "per year",
      recommended: false,
      inclusions: ["Training floor access", "Strength & cardio equipment", "Member support"],
    },
  ],
  cta: { label: "Enquire about membership", href: "#contact" },
};

