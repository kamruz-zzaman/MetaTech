import Container from "../components/Container.jsx";
import HighlightedText from "../components/HighlightedText.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useSection } from "../hooks/useSection.js";

export default function Footer() {
  const { status, data, error } = useSection("footer");

  if (status === "loading") {
    return (
      <footer className="bg-ink px-4 py-8 md:px-5">
        <LoadingState className="text-white" />
      </footer>
    );
  }

  if (status === "error") {
    return (
      <footer className="bg-ink px-4 py-8 md:px-5">
        <ErrorState
          message={error?.message ?? "Couldn't load footer."}
          className="text-red-300"
        />
      </footer>
    );
  }

  const { copyright, links, socials } = data;

  return (
    <footer className="overflow-hidden bg-ink">
      <Container className="flex flex-col gap-6 px-4 pt-10 md:flex-row md:items-center md:justify-between md:px-5 md:pt-17">
        <div className="order-3 font-body text-sm text-white md:order-none">
          <HighlightedText
            segments={copyright}
            highlightClassName="text-brand-green"
          />
        </div>
        <nav
          className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
          aria-label="Legal"
        >
          {links.map((link) => (
            <a
              key={link}
              href="#contact"
              className="font-body text-sm text-white underline"
            >
              {link}
            </a>
          ))}
        </nav>
        <div
          className="my-2 h-px w-5 bg-white/30 md:hidden"
          aria-hidden="true"
        />
        <nav
          className="order-2 flex flex-col gap-4 md:order-none md:flex-row md:items-center md:gap-8"
          aria-label="Social media"
        >
          {socials.map((social) => (
            <a
              key={social}
              href="#contact"
              className="font-body text-sm text-white underline"
            >
              {social}
            </a>
          ))}
        </nav>
        <div
          className="order-2 my-2 h-px w-5 bg-white/30 md:hidden"
          aria-hidden="true"
        />
      </Container>
      <div className="relative mt-8 md:mt-14">
        <div
          className="footer-wordmark aspect-1432/227 w-full"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-ink"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
