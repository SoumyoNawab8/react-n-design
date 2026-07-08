import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContextProvider } from 'react-n-design';
import { FiArrowUp } from 'react-icons/fi';
import { Layout } from './components/Layout';
import { GetStarted } from './pages/GetStarted';
import Home from './pages/Home';
import ComponentsPage from './pages/ComponentsPage';

const RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = sessionStorage.getItem('spa-redirect');
    if (redirect) {
      sessionStorage.removeItem('spa-redirect');
      const target = redirect;
      const current = location.pathname + location.search + location.hash;
      if (target !== current) {
        navigate(target, { replace: true });
      }
    }
  }, [navigate, location]);

  return null;
};

const ScrollButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <ScrollButton
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <FiArrowUp size={20} />
    </ScrollButton>
  );
};

const App: React.FC = () => (
  <ThemeContextProvider>
    <RedirectHandler />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/:name" element={<ComponentsPage />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Layout>
    <ScrollToTop />
  </ThemeContextProvider>
);

export default App;
