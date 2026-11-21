// Edit these in one place.
export const SITE = {
  name: "Nesting",
  legalName: "Nesting", // change to your registered business name when you have one
  legalUpdated: "November 20, 2026",
  domain: "nesting.com",
  email: "hello@nesting.com", // placeholder: replace with your real address
  tagline: "Websites and apps built for the way your team actually works",
  gatsLiveUrl: "https://gats-events-9jco.vercel.app",
  // Paste your Cal.com or Calendly link in the NEXT_PUBLIC_BOOKING_URL variable (see SETUP.md).
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  // Set NEXT_PUBLIC_ENABLE_GOOGLE=true after you turn on Google in Supabase.
  enableGoogle: process.env.NEXT_PUBLIC_ENABLE_GOOGLE === "true",
};
