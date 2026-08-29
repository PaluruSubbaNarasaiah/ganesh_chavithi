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

const basename = import.meta.env.VITE_BASE_PATH || '/';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
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
            <Route path="/menu" element={<Committee />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
