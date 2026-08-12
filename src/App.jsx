import { SiteDataProvider } from "./context/SiteDataContext.jsx";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import TrustedBy from "./sections/TrustedBy.jsx";

const App = () => (
  <SiteDataProvider>
    <Header />
    <main>
      <Hero />
      <TrustedBy />
    </main>
  </SiteDataProvider>
);

export default App;
