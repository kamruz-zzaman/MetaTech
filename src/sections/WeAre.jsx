import Container from "../components/Container.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useSection } from "../hooks/useSection.js";

export default function WeAre() {
  const { status, data, error } = useSection("we-are");

  if (status === "loading") {
    return (
      <section className="bg-white px-5 pt-20 pb-12.5 md:py-12.5">
        <LoadingState />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-white px-5 pt-20 pb-12.5 md:py-12.5">
        <ErrorState message={error?.message ?? "Couldn't load this section."} />
      </section>
    );
  }

  const { label, boldText, regularText } = data;

  return (
    <section className="bg-white px-5 pt-20 pb-12.5 md:py-12.5">
      <Container className="flex flex-col gap-5 md:flex-row md:items-start md:gap-12 lg:gap-24 xl:gap-100">
        <p className="shrink-0 font-body text-base font-semibold tracking-[-0.45px] text-ink md:text-lg md:tracking-[-0.9px]">
          {label}
        </p>
        <p className="min-w-0 max-w-170 font-display text-xl leading-7 tracking-[-0.6px] text-ink md:text-[32px] md:leading-9.75 md:tracking-[-0.96px]">
          <span className="font-extrabold">{boldText}</span>
          <span className="font-normal">{regularText}</span>
        </p>
      </Container>
    </section>
  );
}
