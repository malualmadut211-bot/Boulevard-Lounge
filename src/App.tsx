import { Routes, Route, useLocation } from "react-router-dom";
import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "./components/providers/PageTransitionProvider";
import { Preloader } from "./components/layout/Preloader";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { BackToTop } from "./components/ui/BackToTop";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import LoungeBar from "./pages/LoungeBar";
import SpaPool from "./pages/SpaPool";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";

export default function App() {
  const location = useLocation();

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      
      <div className="flex flex-col min-h-screen">
        <Navigation />
        
        <main className="flex-grow">
          <PageTransitionProvider>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/lounge-bar" element={<LoungeBar />} />
              <Route path="/spa-pool" element={<SpaPool />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservations" element={<Reservations />} />
            </Routes>
          </PageTransitionProvider>
        </main>

        <Footer />
      </div>
      
      <BackToTop />
    </SmoothScrollProvider>
  );
}
