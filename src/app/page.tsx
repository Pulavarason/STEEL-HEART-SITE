import { SiteShell } from "@/components/SiteShell";
import { site } from "@/config/site";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.fullName,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/steel-heart-logo.png`,
  };
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[400] bg-[var(--sh-red)] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteShell />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
