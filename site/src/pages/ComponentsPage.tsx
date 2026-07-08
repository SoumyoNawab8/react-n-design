import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Drawer,
  Input,
  Divider,
} from 'react-n-design';
import {
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
} from 'react-icons/fi';
import { componentCategories, allComponents } from '../data/components';
import ComponentCard from '../components/ComponentCard';
import ComponentDemo from '../components/ComponentDemo';
import PropsTable from '../components/PropsTable';

const PageWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding-top: 72px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const SidebarDesktop = styled.aside`
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  align-self: flex-start;
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileMenuButton = styled(Button)`
  margin-bottom: 16px;

  @media (min-width: 768px) {
    display: none !important;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const SearchWrapper = styled.div`
  margin-bottom: 16px;
`;

const CategoryHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: left;
`;

const ComponentLink = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  padding: 6px 12px;
  margin-left: 4px;
  background: ${({ $active, theme }) => ($active ? theme.colors.cardBg : 'transparent')};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AccordionBody = styled.div<{ $expanded: boolean }>`
  overflow: hidden;
  max-height: ${({ $expanded }) => ($expanded ? '2000px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition: max-height 0.25s ease-in-out, opacity 0.2s ease-in-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

const DetailHeader = styled.div`
  margin-bottom: 0;
`;

const DetailTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const DetailDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DrawerContent = styled.div`
  padding: 16px;
`;

type Category = (typeof componentCategories)[number];

interface SidebarContentProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredCategories: Category[];
  expanded: Set<string>;
  onToggleCategory: (catName: string) => void;
  activeName?: string;
  onGoToComponent: (componentName: string) => void;
}

const SidebarContent = React.memo<SidebarContentProps>(({
  search,
  onSearchChange,
  filteredCategories,
  expanded,
  onToggleCategory,
  activeName,
  onGoToComponent,
}) => {
  return (
    <>
      <SearchWrapper>
        <Input
          placeholder="Search components..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          prefix={<FiSearch size={16} />}
          fullWidth
        />
      </SearchWrapper>
      {filteredCategories.map((cat) => (
        <div key={cat.name}>
          <CategoryHeader onClick={() => onToggleCategory(cat.name)}>
            <span>{cat.name}</span>
            {expanded.has(cat.name) ? (
              <FiChevronUp size={16} />
            ) : (
              <FiChevronDown size={16} />
            )}
          </CategoryHeader>
          <AccordionBody $expanded={expanded.has(cat.name)}>
            {cat.components.map((c) => (
              <ComponentLink
                key={c.name}
                $active={activeName === c.name}
                onClick={() => onGoToComponent(c.name)}
              >
                {c.name}
              </ComponentLink>
            ))}
          </AccordionBody>
          <Divider />
        </div>
      ))}
    </>
  );
});
SidebarContent.displayName = 'SidebarContent';

const ComponentsPage: React.FC = () => {
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(componentCategories.map((c) => c.name))
  );
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeComponent = useMemo(() => {
    if (!name) return null;
    return allComponents.find((c) => c.name === name) || null;
  }, [name]);

  const currentIndex = useMemo(() => {
    if (!name) return -1;
    return allComponents.findIndex((c) => c.name === name);
  }, [name]);

  const prevComponent =
    currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent =
    currentIndex >= 0 && currentIndex < allComponents.length - 1
      ? allComponents[currentIndex + 1]
      : null;

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase();
    return componentCategories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.components.length > 0);
  }, [search]);

  const toggleCategory = (catName: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(catName)) {
        next.delete(catName);
      } else {
        next.add(catName);
      }
      return next;
    });
  };

  const goToComponent = (componentName: string) => {
    navigate(`/components/${componentName}`);
    setMobileDrawerOpen(false);
  };

  const sidebarProps = useMemo(
    () => ({
      search,
      onSearchChange: setSearch,
      filteredCategories,
      expanded,
      onToggleCategory: toggleCategory,
      activeName: name,
      onGoToComponent: goToComponent,
    }),
    [search, filteredCategories, expanded, name]
  );

  if (activeComponent) {
    return (
      <PageWrapper>
        <SidebarDesktop>
          <SidebarContent {...sidebarProps} />
        </SidebarDesktop>

        <MobileMenuButton
          variant="ghost"
          onClick={() => setMobileDrawerOpen(true)}
        >
          <FiMenu size={20} />
          Components
        </MobileMenuButton>

        <Drawer
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          placement="left"
          title="Components"
        >
          <DrawerContent><SidebarContent {...sidebarProps} /></DrawerContent>
        </Drawer>

        <MainContent>
          <DetailHeader>
            <DetailTitle>{activeComponent.name}</DetailTitle>
            <DetailDesc>{activeComponent.description}</DetailDesc>
          </DetailHeader>

          <section>
            <SectionTitle>Examples</SectionTitle>
            <ComponentDemo componentName={activeComponent.name} />
          </section>

          <section>
            <PropsTable componentName={activeComponent.name} />
          </section>

          <NavRow>
            <Button
              variant="ghost"
              disabled={!prevComponent}
              onClick={() =>
                prevComponent && goToComponent(prevComponent.name)
              }
              leftIcon={<FiChevronLeft size={16} />}
            >
              {prevComponent ? prevComponent.name : 'Previous'}
            </Button>
            <Button
              variant="ghost"
              disabled={!nextComponent}
              onClick={() =>
                nextComponent && goToComponent(nextComponent.name)
              }
              rightIcon={<FiChevronRight size={16} />}
            >
              {nextComponent ? nextComponent.name : 'Next'}
            </Button>
          </NavRow>
        </MainContent>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <SidebarDesktop>
        <SidebarContent {...sidebarProps} />
      </SidebarDesktop>

      <MobileMenuButton
        variant="ghost"
        onClick={() => setMobileDrawerOpen(true)}
      >
        <FiMenu size={20} />
        Components
      </MobileMenuButton>

      <Drawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        placement="left"
        title="Components"
      >
        <DrawerContent><SidebarContent {...sidebarProps} /></DrawerContent>
      </Drawer>

      <MainContent>
        <DetailTitle>Components</DetailTitle>
        <DetailDesc>
          {allComponents.length} components across {componentCategories.length}{' '}
          categories.
        </DetailDesc>
        {filteredCategories.length === 0 ? (
          <EmptyState>No components match your search.</EmptyState>
        ) : (
          <Grid>
            {filteredCategories.flatMap((cat) =>
              cat.components.map((c) => (
                <ComponentCard
                  key={c.name}
                  name={c.name}
                  description={c.description}
                  onClick={() => goToComponent(c.name)}
                />
              ))
            )}
          </Grid>
        )}
      </MainContent>
    </PageWrapper>
  );
};

export default ComponentsPage;
