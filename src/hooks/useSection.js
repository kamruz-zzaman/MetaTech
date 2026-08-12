import { useContext } from "react";
import { SiteDataContext } from "../context/siteDataContext.js";

export function useSection(key) {
  const sections = useContext(SiteDataContext);
  if (!sections) {
    throw new Error("useSection must be used within a SiteDataProvider");
  }
  return sections[key];
}
