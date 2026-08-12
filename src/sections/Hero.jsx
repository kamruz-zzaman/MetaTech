import Container from "../components/Container.jsx";
import HighlightedText from "../components/HighlightedText.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useSection } from "../hooks/useSection.js";
import heroPhoto from "../assets/hero-photo.png";
import watermark from "../assets/hero-metatech-watermark.svg";
import playIcon from "../assets/hero-play-icon.svg";
import heroNotchBorder from "../assets/hero-subtract.svg";

function PlayButton({ className = "" }) {
  return (
    <div className={`size-14 md:size-32.5 ${className}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-brand-green/40 motion-safe:animate-ping" />
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-brand-green/25">
        <div className="flex size-[65%] items-center justify-center rounded-full bg-brand-green/50">
          <img src={playIcon} alt="" className="size-[70%]" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { status, data, error } = useSection("home");

  if (status === "loading") {
    return (
      <section className="bg-brand-dark px-4 py-16 md:px-5">
        <LoadingState className="text-white" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-brand-dark px-4 py-16 md:px-5">
        <ErrorState message={error?.message ?? "Couldn't load the hero section."} />
      </section>
    );
  }

  const { hero } = data;

  return (
    <section className="bg-brand-dark pb-16 md:pb-20">
      <Container className="flex flex-col gap-10 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-5 md:py-12 lg:gap-25">
        <h1 className="max-w-166 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[72px] lg:leading-18 lg:tracking-[-3.6px]">
          <HighlightedText segments={hero.headline} />
        </h1>
        <div className="flex max-w-97 flex-col items-start gap-5">
          <p className="font-body text-base font-light text-white">{hero.description}</p>
          <a
            href="#contact"
            className="rounded-[15px] bg-brand-green px-8.75 py-2.5 font-body text-sm font-bold tracking-[-0.35px] text-ink"
          >
            {hero.cta}
          </a>
        </div>
      </Container>

      {/* Mobile only: the Figma mobile frame places the play button as its own
          element between the CTA and the image, not overlapping it like on desktop. */}
      <Container className="flex px-4 py-6 md:hidden">
        <PlayButton className="relative" />
      </Container>

      <Container className="px-4 md:px-5">
        <div className="relative">
          <div className="hero-notch-mask relative aspect-380/200 w-full overflow-hidden rounded-[25px] md:aspect-1400/571 md:overflow-visible md:rounded-none">
            <img src={heroPhoto} alt="" className="absolute inset-0 size-full object-cover" />
            <img
              src={watermark}
              alt=""
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 mx-auto w-[72%] opacity-90"
            />
          </div>
          <img
            src={heroNotchBorder}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden size-full md:block"
          />
          <PlayButton className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block" />
        </div>
      </Container>
    </section>
  );
}
