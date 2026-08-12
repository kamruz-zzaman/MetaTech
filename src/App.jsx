import { SiteDataProvider } from "./context/SiteDataContext.jsx";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import TrustedBy from "./sections/TrustedBy.jsx";
import WeAre from "./sections/WeAre.jsx";

const App = () => (
  <SiteDataProvider>
    <Header />
    <main>
      <Hero />
      <TrustedBy />
      <WeAre />
    </main>
  </SiteDataProvider>
);

export default App;
