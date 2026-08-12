import Container from "@/components/Container.jsx";
import HighlightedText from "@/components/HighlightedText.jsx";
import LoadingState from "@/components/LoadingState.jsx";
import ErrorState from "@/components/ErrorState.jsx";
import { useSection } from "@/hooks/useSection.js";
import databricks from "@/assets/logos/databricks.png";
import googleCloud from "@/assets/logos/google-cloud.png";
import uipath from "@/assets/logos/uipath.png";
import alteryx from "@/assets/logos/alteryx.png";
import figmaLogo from "@/assets/logos/figma.png";
import aws from "@/assets/logos/aws.png";

const LOGO_ASSETS = {
  Databricks: databricks,
  "Google Cloud": googleCloud,
  UiPath: uipath,
  Alteryx: alteryx,
  Figma: figmaLogo,
  AWS: aws,
};

export default function TrustedBy() {
  const { status, data, error } = useSection("trusted-by");

  if (status === "loading") {
    return (
      <section className="bg-brand-dark px-4 py-10 md:px-5 md:py-16">
        <LoadingState className="text-white" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-brand-dark px-4 py-10 md:px-5 md:py-16">
        <ErrorState message={error?.message ?? "Couldn't load trusted-by logos."} />
      </section>
    );
  }

  const { heading, logos } = data;

  return (
    <section className="bg-brand-dark px-4 py-10 md:px-5 md:py-16">
      <Container className="flex flex-col items-start gap-7.5 md:flex-row md:items-start md:justify-between">
        <h2 className="max-w-54.5 font-display text-lg leading-6 font-semibold tracking-[-0.9px] text-white md:max-w-48 md:font-body md:leading-5">
          <HighlightedText segments={heading} />
        </h2>
        <div className="grid w-full grid-cols-2 border-t border-l border-white/25 md:w-231.25 md:grid-cols-4">
          {logos.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="flex h-17.5 items-center justify-center border-r border-b border-white/25 px-6 py-2.5 md:h-25 md:px-7.5"
            >
              <img
                src={LOGO_ASSETS[name]}
                alt={name}
                loading="lazy"
                className="max-h-9 max-w-full object-contain md:max-h-10"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
