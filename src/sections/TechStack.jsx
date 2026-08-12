import Container from "../components/Container.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { useSection } from "../hooks/useSection.js";
import react from "../assets/logos/techstacks/react.png";
import nextjs from "../assets/logos/techstacks/nextjs.png";
import tailwindcss from "../assets/logos/techstacks/tailwindcss.png";
import typescript from "../assets/logos/techstacks/typescript.png";
import angular from "../assets/logos/techstacks/angular.png";
import vuejs from "../assets/logos/techstacks/vuejs.png";
import go from "../assets/logos/techstacks/go.png";
import python from "../assets/logos/techstacks/python.png";
import nodejs from "../assets/logos/techstacks/nodejs.png";
import dotnet from "../assets/logos/techstacks/dotnet.png";
import ruby from "../assets/logos/techstacks/ruby.png";
import php from "../assets/logos/techstacks/php.png";
import django from "../assets/logos/techstacks/django.png";
import laravel from "../assets/logos/techstacks/laravel.png";
import flutter from "../assets/logos/techstacks/flutter.png";
import mysql from "../assets/logos/techstacks/mysql.png";
import mongodb from "../assets/logos/techstacks/mongobd.png";
import html from "../assets/logos/techstacks/html.png";

const ICON_ASSETS = {
  React: react,
  "Next.js": nextjs,
  "Tailwind CSS": tailwindcss,
  TypeScript: typescript,
  Angular: angular,
  "Vue.js": vuejs,
  Go: go,
  Python: python,
  "Node.js": nodejs,
  ".NET": dotnet,
  Ruby: ruby,
  PHP: php,
  Django: django,
  Laravel: laravel,
  Flutter: flutter,
  MySQL: mysql,
  MongoDB: mongodb,
  HTML5: html,
};

const ROW_SIZE = 6;

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden">
      <div className={`flex w-max gap-4 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {doubled.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className="flex h-25 w-40 shrink-0 items-center justify-center rounded-2xl border border-border-subtle bg-surface px-6 sm:w-50"
          >
            <img src={ICON_ASSETS[name]} alt={name} className="max-h-10 max-w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { status, data, error } = useSection("tech-stack");

  if (status === "loading") {
    return (
      <section className="bg-white px-4 py-16 md:px-5">
        <LoadingState />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-white px-4 py-16 md:px-5">
        <ErrorState message={error?.message ?? "Couldn't load tech stack."} />
      </section>
    );
  }

  const { label, heading, description, items } = data;
  const rows = [items.slice(0, ROW_SIZE), items.slice(ROW_SIZE, ROW_SIZE * 2), items.slice(ROW_SIZE * 2, ROW_SIZE * 3)];

  return (
    <section className="bg-white py-16">
      <Container className="flex flex-col gap-3 px-4 pb-12 md:flex-row md:gap-12 md:px-5 lg:gap-24 xl:gap-89.5">
        <p className="font-body text-sm font-bold text-ink md:shrink-0">{label}</p>
        <div className="flex min-w-0 flex-col gap-4 md:max-w-170">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.9px] text-ink md:text-[36px]">{heading}</h2>
          <p className="font-body text-base text-ink/80 md:text-lg">{description}</p>
        </div>
      </Container>
      <div className="flex flex-col gap-4">
        {rows.map((row, index) => (
          <MarqueeRow key={index} items={row} reverse={index === 1} />
        ))}
      </div>
    </section>
  );
}
