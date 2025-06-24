import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { NotFound } from '../../pages/NotFound';
import { About } from '../../pages/About';
import Home from '../../pages/Home';
import { useEffect } from 'react';
import History from '../../pages/HIstory';
import Settings from '../../pages/Settings';

function ScroolTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodora" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ScroolTop />
    </BrowserRouter>
  );
}
