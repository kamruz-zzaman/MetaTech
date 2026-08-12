import Container from "@/components/Container.jsx";
import LoadingState from "@/components/LoadingState.jsx";
import ErrorState from "@/components/ErrorState.jsx";
import { useSection } from "@/hooks/useSection.js";

export default function Values() {
  const { status, data, error } = useSection("values");

  if (status === "loading") {
    return (
      <section className="bg-surface px-4 pt-12 pb-16 md:px-5 md:pt-16">
        <LoadingState />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-surface px-4 pt-12 pb-16 md:px-5 md:pt-16">
        <ErrorState message={error?.message ?? "Couldn't load values."} />
      </section>
    );
  }

  const { cards } = data;

  return (
    <section className="bg-surface px-4 pt-12 pb-16 md:px-5 md:pt-16">
      <Container className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex min-h-98.5 flex-col justify-between rounded-[25px] border border-white/10 bg-ink p-6 md:h-112.5 md:items-center md:justify-center md:border-border-subtle md:bg-white md:p-10"
          >
            <h2 className="font-display text-3xl font-extrabold text-brand-green md:text-center md:text-[36px] md:text-ink">
              {card.title}
            </h2>
            <p className="font-body text-base text-white md:hidden">{card.description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
