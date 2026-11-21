export type Block = { t: "h2"; text: string } | { t: "p"; text: string } | { t: "ul"; items: string[] };
export type Article = { slug: string; title: string; description: string; date: string; read: string; body: Block[] };

// Add new articles to this list. Each one gets its own page at /resources/<slug>.
export const ARTICLES: Article[] = [
  {
    slug: "volunteer-signups-without-a-group-chat",
    title: "How to run volunteer sign-ups without a group chat",
    description: "A simple way to fill every job for your next event, without scrolling back through messages.",
    date: "2026-11-20",
    read: "4 min read",
    body: [
      { t: "p", text: "A group chat is great for saying hello and poor at counting. By the third reminder, the job list is buried, nobody knows who said yes, and the organizer is scrolling up with a pen. You can fix this without any special software. Start with these five habits." },
      { t: "h2", text: "1. Write the jobs down before you ask for help" },
      { t: "p", text: "People sign up for a clear job faster than for “we need volunteers”. List each job, the time it starts, and how many people it takes. “Set-up, 3 people, 3:00 to 4:00” works better than “help with set-up”." },
      { t: "h2", text: "2. Keep one list, in one place" },
      { t: "p", text: "Pick a single place where the list lives: a shared sheet, a form, or an app. Post the link in the chat, and keep the answers out of the chat. When someone asks “who is doing food?”, the answer is a link, not a search." },
      { t: "h2", text: "3. Show how many spots are left" },
      { t: "p", text: "A number creates a reason to act. “2 spots left” gets a reply sooner than an open-ended request, and a full job stops taking names so no one shows up to a crowded table." },
      { t: "h2", text: "4. Make signing up take one step" },
      { t: "p", text: "Every extra field loses people. Ask for a name and a way to reach them. If someone has to create an account, explain why and make the sign-in a single link." },
      { t: "h2", text: "5. Check in before the day" },
      { t: "ul", items: [
        "Send each volunteer their job and time two days ahead.",
        "Count the open spots the day before, and ask in the chat for the few that remain.",
        "After the event, thank people by name. They will remember it when you ask again.",
      ] },
      { t: "h2", text: "When a spreadsheet stops being enough" },
      { t: "p", text: "If you run several events a year, or different people organize different ones, the sheet gets messy: copies multiply, and nobody knows which is current. That is the point where a small tool with one volunteer board, sign-up buttons and a roster for organizers saves real hours. It is also where we can help." },
    ],
  },
];
