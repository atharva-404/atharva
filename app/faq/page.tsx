import { faq } from "@/data/faq";
import { SubpageShell } from "@/components/layout/SubpageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/site";
import { faqGraph } from "@/lib/seo/schema";

const title = "Atharva Sonar FAQ — Work, Education, Velquix & Contact";
const description =
  "Straight answers about Atharva Sonar: what he does, where he studied, the technologies he uses, SpendDecode, Velquix, Velquix Learn and how to contact him.";

export const metadata = pageMetadata({ title, description, path: "/faq/" });

export default function FaqPage() {
  return (
    <SubpageShell
      eyebrow="FAQ"
      title={<>Questions about <span className="text-accent">Atharva Sonar.</span></>}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq/" },
      ]}
    >
      <JsonLd data={faqGraph(title, description, faq)} />

      <p>Short, factual answers to what people most often ask about me, my work and Velquix.</p>

      {faq.map((item) => (
        <section key={item.id} id={item.id} aria-labelledby={`${item.id}-q`} className="scroll-mt-24">
          <h2 id={`${item.id}-q`}>{item.question}</h2>
          <p className="mt-4">{item.answer}</p>
          {item.links ? (
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {item.links.map((l) => {
                const external = /^https?:/.test(l.href);
                return (
                  <a key={l.href} href={l.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {l.label}
                  </a>
                );
              })}
            </p>
          ) : null}
        </section>
      ))}
    </SubpageShell>
  );
}
