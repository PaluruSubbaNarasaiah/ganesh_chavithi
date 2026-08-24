import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Schedule from './pages/Schedule';
import Location from './pages/Location';
import Live from './pages/Live';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Competitions from './pages/Competitions';
import Committee from './pages/Committee';
import Volunteer from './pages/Volunteer';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/location" element={<Location />} />
            <Route path="/live" element={<Live />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/admin" element={<Admin />} />
            {/* Catch all for "More" menu on mobile can just link to committee or a separate page, 
                we'll map it to Home for now or handle it via Layout */}
            <Route path="/menu" element={<Committee />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
