import { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useSection } from "../hooks/useSection.js";
import showcaseBanner from "../assets/showcase-banner.png";

const AUTO_SLIDE_INTERVAL_MS = 5000;

export default function Showcase() {
  const { status, data, error } = useSection("showcase");
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = data?.slideCount ?? 0;

  useEffect(() => {
    if (slideCount < 2) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slideCount]);

  if (status === "loading") {
    return (
      <section className="bg-showcase-green px-4 py-16 md:px-5">
        <LoadingState className="text-white" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-showcase-green px-4 py-16 md:px-5">
        <ErrorState message={error?.message ?? "Couldn't load showcase."} />
      </section>
    );
  }

  const { brand, heading, description, cta, slideCount: count } = data;
  const slideIndexes = Array.from({ length: count });

  return (
    <section className="overflow-hidden bg-showcase-green">
      <Container className="flex flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:gap-8 md:px-5 md:py-20">
        <div className="flex flex-col items-start gap-5 md:flex-1">
          <p className="font-body text-lg font-extrabold text-white">{brand}</p>
          <h3 className="font-display text-3xl leading-tight font-extrabold text-white md:text-[42px] md:leading-[1.15]">
            {heading}
          </h3>
          <p className="font-body text-sm text-white/90 md:text-base">{description}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 font-body text-sm font-bold text-white"
          >
            {cta} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="relative md:flex-1">
          <div className="overflow-hidden rounded-[25px]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slideIndexes.map((_, index) => (
                <img
                  key={index}
                  src={showcaseBanner}
                  alt={index === 0 ? `${brand} product screenshot` : ""}
                  aria-hidden={index !== 0}
                  className="w-full shrink-0"
                />
              ))}
            </div>
          </div>
          <div
            className="absolute bottom-6 left-6 flex items-center gap-2"
            role="tablist"
            aria-label="Showcase gallery"
          >
            {slideIndexes.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
