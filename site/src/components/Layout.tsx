import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  AppThemeProvider,
  useTheme,
  SkipToContent,
  Drawer,
  Button,
  Divider,
} from 'react-n-design';
import { FiMenu, FiX, FiGithub } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Components', path: '/components' },
  { label: 'Get Started', path: '/get-started' },
];

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.3s ease, color 0.3s ease;
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  backdrop-filter: blur(12px) saturate(180%);
`;

const HeaderInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  letter-spacing: -0.02em;
  display: inline-flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 8px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  background: ${({ theme, $active }) => ($active ? theme.colors.cardBg : 'transparent')};
  text-decoration: none;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ThemeSelect = styled.select`
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  appearance: none;
`;

const HamburgerButton = styled(Button)`
  @media (min-width: 768px) {
    display: none !important;
  }
`;

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
`;

const StyledFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 48px 32px;
  margin-top: auto;
`;

const FooterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterBrand = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Inter', sans-serif;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterMeta = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

const IconWrap = styled.span`
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
`;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <LayoutWrapper>
      <SkipToContent targetId="main-content" />
      <StyledHeader>
        <HeaderInner>
          <Logo to="/">react-n-design</Logo>
          <Nav aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} $active={isActive(link.path)}>
                {link.label}
              </NavLink>
            ))}
            <ThemeSelect
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
              aria-label="Theme"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </ThemeSelect>
          </Nav>
          <HamburgerButton
            variant="secondary"
            size="medium"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <motion.div
              animate={{ rotate: drawerOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconWrap>
                {drawerOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </IconWrap>
            </motion.div>
          </HamburgerButton>
        </HeaderInner>
      </StyledHeader>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        title="Menu"
      >
        <DrawerNav aria-label="Mobile primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              $active={isActive(link.path)}
              onClick={() => setDrawerOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Divider />
          <ThemeSelect
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
            aria-label="Theme"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </ThemeSelect>
        </DrawerNav>
      </Drawer>

      <MainContent id="main-content" tabIndex={-1}>
        {children}
      </MainContent>

      <StyledFooter>
        <FooterInner>
          <FooterBrand>react-n-design</FooterBrand>
          <FooterLinks>
            <FooterLink
              href="https://github.com/SoumyoNawab8/react-n-design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub size={16} />
              GitHub
            </FooterLink>
            <FooterMeta>v1.2.1</FooterMeta>
            <FooterMeta>© 2026 react-n-design</FooterMeta>
          </FooterLinks>
        </FooterInner>
      </StyledFooter>
    </LayoutWrapper>
  );
};
