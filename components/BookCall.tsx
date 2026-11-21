import Link from "next/link";
import { SITE } from "@/lib/site";

/** Opens your booking page (Cal.com, Calendly) when NEXT_PUBLIC_BOOKING_URL is set. Otherwise it opens the request form. */
export default function BookCall({ className = "btn btn-ghost", label = "Book a call" }: { className?: string; label?: string }) {
  if (SITE.bookingUrl) {
    return <a className={className} href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{label}</a>;
  }
  return <Link className={className} href="/start?topic=Not%20sure%20yet">Request a call</Link>;
}
