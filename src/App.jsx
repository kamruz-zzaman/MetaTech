import { SiteDataProvider } from "./context/SiteDataContext.jsx";
import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";

const App = () => (
  <SiteDataProvider>
    <Header />
    <main>
      <Hero />
    </main>
  </SiteDataProvider>
);

export default App;
