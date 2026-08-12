import { useId, useState } from "react";
import Container from "@/components/Container.jsx";
import LoadingState from "@/components/LoadingState.jsx";
import ErrorState from "@/components/ErrorState.jsx";
import { useSection } from "@/hooks/useSection.js";
import logo from "@/assets/metatech-logo.svg";
import menuIcon from "@/assets/menu-icon.svg";

function MenuIcon({ open }) {
  return open ? (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  ) : (
    <img src={menuIcon} alt="" className="size-6" aria-hidden="true" />
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const { status, data, error } = useSection("home");

  if (status === "loading") {
    return (
      <header className="sticky top-0 z-30 bg-brand-dark p-5">
        <LoadingState className="text-white" />
      </header>
    );
  }

  if (status === "error") {
    return (
      <header className="sticky top-0 z-30 bg-brand-dark p-5">
        <ErrorState
          message={error?.message ?? "Couldn't load navigation."}
          className="text-red-300"
        />
      </header>
    );
  }

  const { nav } = data;

  return (
    <header className="sticky top-0 z-30 bg-brand-dark px-2.5 py-2.5 md:p-5">
      <Container className="flex items-center justify-between rounded-[5px] bg-white/25 p-4 md:rounded-[25px] md:px-5 md:py-3.75">
        <div className="flex flex-1 items-center justify-between gap-6 md:flex-initial md:justify-start md:gap-16 lg:gap-[105px]">
          <img
            src={logo}
            alt={nav.logo}
            className="h-5 w-auto md:h-[24.57px]"
          />
          <nav
            className="hidden items-center gap-[25px] md:flex"
            aria-label="Primary"
          >
            {nav.links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-body text-sm font-bold tracking-[-0.35px] text-white"
              >
                {link}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="cursor-pointer text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle menu</span>
            <MenuIcon open={menuOpen} />
          </button>
        </div>
        <a
          href="#contact"
          className="hidden shrink-0 rounded-[15px] bg-white/25 px-[25px] py-[10px] font-body text-sm font-extrabold text-white md:inline-block"
        >
          {nav.cta}
        </a>
      </Container>
      {menuOpen && (
        <nav
          id={menuId}
          aria-label="Primary"
          className="absolute inset-x-0 top-full mt-2.5 flex flex-col gap-4 rounded-[5px] bg-white/25 p-4 shadow-lg shadow-black/40 backdrop-blur-sm md:hidden"
        >
          {nav.links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm font-bold text-white"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-[15px] bg-white/25 px-[25px] py-[10px] text-center font-body text-sm font-extrabold text-white"
          >
            {nav.cta}
          </a>
        </nav>
      )}
    </header>
  );
}
