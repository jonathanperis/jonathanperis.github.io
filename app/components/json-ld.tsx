import { PROFILE, SKILLS, SOCIALS, EDUCATION } from "../lib/data";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.title,
    worksFor: {
      "@type": "Organization",
      name: "Derivative Path",
    },
    url: "https://jonathanperis.github.io",
    sameAs: SOCIALS.map((s) => s.href),
    email: PROFILE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itanhaem",
      addressRegion: "Sao Paulo",
      addressCountry: "BR",
    },
    knowsAbout: [
      ...SKILLS.languages,
      ...SKILLS.backend,
      ...SKILLS.architecture,
      ...SKILLS.cloud,
      ...SKILLS.databases,
      ...SKILLS.frontend,
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: EDUCATION.institution,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
