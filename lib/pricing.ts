// Prices are starting points ("from"), in US dollars. Edit freely: every price on the site comes from this file.
export type Plan = {
  id: string; name: string; from: number; blurb: string; includes: string[]; topic: string; featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "site", name: "Website", from: 1500, topic: "Website",
    blurb: "A clear front door that works on a phone.",
    includes: [
      "Up to 5 pages, designed phone-first",
      "Your events, contact details and a request form",
      "Domain and hosting set up in your name",
      "A written guide to editing it yourself",
    ],
  },
  {
    id: "events", name: "Events and volunteer tool", from: 3500, topic: "Events and volunteer tools", featured: true,
    blurb: "Open jobs, RSVPs and rosters in one place, instead of a chat scroll.",
    includes: [
      "Volunteer board with spots left and one-tap sign-up",
      "RSVPs: going, maybe, can’t make it",
      "A view for organizers with who is coming",
      "Email sign-in, with the code and accounts handed to you",
    ],
  },
  {
    id: "members", name: "Member app with sign-in", from: 5000, topic: "Member app and sign-in",
    blurb: "Accounts, approval and a view for each role.",
    includes: [
      "Email sign-in, with admin approval for new accounts",
      "Roles for members, admins and an owner",
      "Permission rules tested for every role",
      "Everything in the events tool if you want it",
    ],
  },
];

export const CARE = {
  name: "Care plan",
  perMonth: 75,
  blurb: "Optional, month to month. For groups that want a team on call after the handoff.",
  includes: ["Fixes and small changes", "Software updates and checks", "Help when someone on your team is stuck"],
};

export const ADDONS = ["AI drafting helpers for events and announcements", "A second language, with wording checked by a fluent reader", "Admin team chat", "Extra pages or roles"];

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const FAQ: { q: string; a: string }[] = [
  { q: "Are these the final prices?", a: "They are starting prices. After we hear what your team needs, we give you one fixed price in writing before any work starts. If the scope changes, we tell you before the price does." },
  { q: "What else will I pay for?", a: "Your domain name, usually $10 to $20 a year, and any hosting or email services that go past their free plans. These bills go to you directly, in your own accounts, so you always see what you are paying for. Small groups often stay on free plans for a long time." },
  { q: "Do I own what you build?", a: "Yes. The code goes into your GitHub, the hosting and database sit in your accounts, and your data stays yours. We write a setup guide so your team can run it without us." },
  { q: "How long does a project take?", a: "It depends on the scope. When we send your price, we also send a schedule with dates for each step, so you know what to expect." },
  { q: "How do payments work?", a: "We ask for half to start and half when we hand the project over. You pay nothing more until the handoff is done and working." },
  { q: "Can you work with a small budget?", a: "Tell us your budget on the call. For nonprofits, schools and community groups, we will often suggest a smaller first version that you can grow later." },
  { q: "Do you use AI?", a: "Only where it helps a person, such as drafting an event or an announcement. A person always checks it before it goes out, and anything AI wrote is labeled." },
  { q: "What if I need a change after the handoff?", a: "Small fixes are covered if you choose the care plan. Otherwise, write to us and we will quote the change before we start." },
];
