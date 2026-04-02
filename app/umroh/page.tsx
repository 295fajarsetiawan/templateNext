import type { Metadata } from "next";

import { UmrohHomePage } from "@/components/umroh/umroh-home-page";

export const metadata: Metadata = {
  title: "Travel Umroh",
  description: "Umroh travel homepage with package listings, testimonials, and CTA sections.",
};

export default function Page() {
  return <UmrohHomePage />;
}
