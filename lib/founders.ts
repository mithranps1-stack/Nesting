// TODO: replace these roles and bios with your own, and add photos to public/founders/.
// To use a photo, set `photo: "/founders/jay.jpg"`.
export type Founder = { name: string; initials: string; role: string; bio: string; photo?: string };

export const FOUNDERS: Founder[] = [
  { name: "Jay Gaur", initials: "JG", role: "Founder · Design", bio: "Led the site design on GATSapp, the first app Nesting grew out of." },
  { name: "Mithran Saravanan", initials: "MS", role: "Founder · Design", bio: "Co-designed GATSapp, the first app Nesting grew out of." },
  { name: "Shriyan Thangeda", initials: "ST", role: "Founder · Research", bio: "Led the connections and research behind GATSapp, starting with an event planner who walked the team through how RSVPs and volunteers get collected today." },
  { name: "Aaron Jacob", initials: "AJ", role: "Founder · Marketing", bio: "Led marketing for GATSapp, the first app Nesting grew out of." },
];
