import { useState } from "react";
import Container from "@/components/Container.jsx";
import LoadingState from "@/components/LoadingState.jsx";
import ErrorState from "@/components/ErrorState.jsx";
import { useSection } from "@/hooks/useSection.js";

export default function Solutions() {
  const { status, data, error } = useSection("solutions");
  const [activeKey, setActiveKey] = useState(null);

  if (status === "loading") {
    return (
      <section className="bg-surface px-4 py-16 md:px-5">
        <LoadingState />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="bg-surface px-4 py-16 md:px-5">
        <ErrorState message={error?.message ?? "Couldn't load solutions."} />
      </section>
    );
  }

  const { tabs } = data;
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  return (
    <section className="bg-surface">
      <Container className="px-4 md:flex md:justify-center md:px-5 md:pt-7.5">
        <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pt-8 pb-1 md:h-17.5 md:w-full md:max-w-153 md:items-center md:gap-1 md:overflow-visible md:rounded-[15px] md:bg-white md:px-2.5 md:py-0">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                aria-pressed={isActive}
                className={`flex h-15 shrink-0 cursor-pointer items-center justify-center rounded-2xl px-6 font-body text-base font-bold tracking-[-0.45px] whitespace-nowrap transition-colors md:w-50 md:rounded-[10px] md:text-lg md:tracking-[-0.9px] ${
                  isActive ? "bg-ink text-[#06ff70]" : "bg-white text-ink md:bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Container>
      <Container className="px-4 py-12 md:px-5 md:py-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-20">
          <span className="font-display text-6xl font-extrabold text-ink md:text-[130px]" aria-hidden="true">
            {activeTab.number}
          </span>
          <div className="flex flex-col items-start gap-5 md:max-w-153">
            <div className="flex flex-col items-start gap-5">
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.8px] text-ink md:text-[32px] md:tracking-[-1.6px]">
                {activeTab.heading}
              </h2>
              <p className="font-body text-base leading-6.75 tracking-[-0.35px] text-ink md:text-lg md:tracking-[-0.54px]">
                {activeTab.description}
              </p>
            </div>
            <a
              href="#contact"
              className="rounded-[15px] bg-ink px-8.75 py-2.5 font-body text-sm font-bold tracking-[-0.35px] text-[#efefef]"
            >
              {activeTab.cta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
