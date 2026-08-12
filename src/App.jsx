import { SiteDataProvider } from "./context/SiteDataContext.jsx";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import TrustedBy from "./sections/TrustedBy.jsx";
import WeAre from "./sections/WeAre.jsx";
import Solutions from "./sections/Solutions.jsx";
import Values from "./sections/Values.jsx";

const App = () => (
  <SiteDataProvider>
    <Header />
    <main>
      <Hero />
      <TrustedBy />
      <WeAre />
      <Solutions />
      <Values />
    </main>
  </SiteDataProvider>
);

export default App;
