import { useEffect, useState } from "react";
import { fetchSection } from "@/api/client.js";
import { SiteDataContext } from "./siteDataContext.js";

const SECTION_KEYS = [
  "home",
  "trusted-by",
  "we-are",
  "solutions",
  "values",
  "showcase",
  "tech-stack",
  "footer",
];

const initialState = Object.fromEntries(
  SECTION_KEYS.map((key) => [key, { status: "loading", data: null, error: null }]),
);

export function SiteDataProvider({ children }) {
  const [sections, setSections] = useState(initialState);

  useEffect(() => {
    SECTION_KEYS.forEach((key) => {
      fetchSection(key)
        .then((data) => setSections((prev) => ({ ...prev, [key]: { status: "success", data, error: null } })))
        .catch((error) => setSections((prev) => ({ ...prev, [key]: { status: "error", data: null, error } })));
    });
  }, []);

  return <SiteDataContext.Provider value={sections}>{children}</SiteDataContext.Provider>;
}
