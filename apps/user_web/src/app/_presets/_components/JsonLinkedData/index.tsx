import { WithContext, WebSite } from "schema-dts";

type Props = {
  locale: string;
  name: string;
  description: string;
  url: string;
  type?: "WebSite";
};

export default async function JsonLinkedData(props: Props) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": props.type ?? "WebSite",
    name: props.name,
    description: props.description,
    url: props.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
