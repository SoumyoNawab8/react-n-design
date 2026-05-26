'use client';
import type React from 'react';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  OverflowShadow,
  TabBadge,
  TabBarExtraContent,
  TabBarHeader,
  TabButton,
  TabIndicator,
  TabPanel,
  TabsContainer,
  TabsList,
  TabsWrapper,
} from './Tabs.styles';

interface TabBadgeConfig {
  count?: number;
  text?: string;
  dot?: boolean;
}

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  badge?: number | string | TabBadgeConfig;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  /**
   * The key of the currently active tab. If provided, the component will be controlled.
   */
  activeKey?: string;
  /**
   * Callback executed when the active tab changes.
   */
  onTabChange?: (key: string) => void;
  /**
   * The visual style of the tabs.
   */
  type?: 'line' | 'card';
  /**
   * The position of the tabs relative to the content.
   */
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * The size of the tabs.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to center the tab buttons.
   */
  centered?: boolean;
  /**
   * Extra content to render in the tab bar.
   */
  tabBarExtraContent?: React.ReactNode;
  /**
   * CSS class name for the tabs wrapper.
   */
  className?: string;
  /**
   * Inline styles for the tabs wrapper.
   */
  style?: React.CSSProperties;
  /**
   * How to handle tab overflow.
   * - 'auto': Show scrollbar when needed
   * - 'scroll': Always show scrollbar
   * - 'wrap': Wrap tabs to next line
   */
  overflow?: 'auto' | 'scroll' | 'wrap';
  /**
   * Whether to collapse overflow tabs into a "More" menu on small screens.
   */
  collapsible?: boolean;
}

const defaultIndicatorSpring = { stiffness: 500, damping: 40 };
const defaultPanelSpring = { stiffness: 300, damping: 30 };

/**
 * An advanced component for organizing content into switchable views,
 * with support for multiple types, positions, sizes, animations, and responsive overflow.
 * 
 * v1.2.0 Features:
 * - React.memo() for performance optimization
 * - All 4 tab positions: top, bottom, left, right
 * - Overflow handling: auto, scroll, wrap
 * - Spring animations for indicator and panels
 * - Smooth scroll to active tab
 * - Touch swipe support for mobile
 * - Tab badges with customizable content
 * - Collapsible tabs for mobile screens
 * - Custom className and style props
 */
export const Tabs = memo(
  ({
    items,
    defaultActiveKey,
    activeKey: controlledActiveKey,
    onTabChange,
    type = 'line',
    tabPosition = 'top',
    size = 'medium',
    centered = false,
    tabBarExtraContent,
    className,
    style,
    overflow = 'auto',
    collapsible = false,
  }: TabsProps) => {
    const [internalActiveKey, setInternalActiveKey] = useState(
      defaultActiveKey || items[0]?.key
    );
    const [isScrolling, setIsScrolling] = useState({ start: false, end: false });
    const [collapsedTabs, setCollapsedTabs] = useState<string[]>([]);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const isControlled = controlledActiveKey !== undefined;
    const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const tabsListRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    // Memoized calculations
    const activeIndex = useMemo(
      () => items.findIndex((item) => item.key === activeKey),
      [items, activeKey]
    );
    const activeTab = useMemo(
      () => items[activeIndex],
      [items, activeIndex]
    );

    const isVertical = tabPosition === 'left' || tabPosition === 'right';

    // Sync controlled state
    useEffect(() => {
      if (isControlled) {
        setInternalActiveKey(controlledActiveKey);
      }
    }, [controlledActiveKey, isControlled]);

    // Handle collapsible tabs on resize
    useEffect(() => {
      if (!collapsible || !tabsListRef.current) return;

      const calculateCollapsed = () => {
        const container = tabsListRef.current;
        if (!container) return;

        const containerWidth = container.clientWidth;
        let totalWidth = 0;
        const collapsed: string[] = [];

        tabRefs.current.forEach((tab, index) => {
          if (tab) {
            const tabWidth = tab.offsetWidth + 8; // Include margin
            totalWidth += tabWidth;
            if (totalWidth > containerWidth - 80 && index < items.length - 1) {
              collapsed.push(items[index].key);
            }
          }
        });

        setCollapsedTabs(collapsed);
      };

      calculateCollapsed();
      window.addEventListener('resize', calculateCollapsed);
      return () => window.removeEventListener('resize', calculateCollapsed);
    }, [collapsible, items]);

    // Smooth scroll to active tab
    useLayoutEffect(() => {
      if (activeIndex >= 0 && tabRefs.current[activeIndex]) {
        const activeTabEl = tabRefs.current[activeIndex];
        if (activeTabEl && typeof activeTabEl.scrollIntoView === 'function') {
          activeTabEl.scrollIntoView({
            behavior: 'smooth',
            block: isVertical ? 'center' : undefined,
            inline: isVertical ? undefined : 'center',
          });
        }
      }
    }, [activeIndex, isVertical]);

    // Update overflow shadows
    useEffect(() => {
      const container = tabsListRef.current;
      if (!container || overflow === 'wrap') return;

      const updateShadows = () => {
        if (isVertical) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          setIsScrolling({
            start: scrollTop > 5,
            end: scrollTop < scrollHeight - clientHeight - 5,
          });
        } else {
          const { scrollLeft, scrollWidth, clientWidth } = container;
          setIsScrolling({
            start: scrollLeft > 5,
            end: scrollLeft < scrollWidth - clientWidth - 5,
          });
        }
      };

      updateShadows();
      container.addEventListener('scroll', updateShadows);
      window.addEventListener('resize', updateShadows);

      return () => {
        container.removeEventListener('scroll', updateShadows);
        window.removeEventListener('resize', updateShadows);
      };
    }, [isVertical, overflow]);

    const handleTabClick = useCallback(
      (key: string) => {
        if (onTabChange) {
          onTabChange(key);
        }
        if (!isControlled) {
          setInternalActiveKey(key);
        }
        setShowMoreMenu(false);
      },
      [onTabChange, isControlled]
    );

    // Use callback for ref assignment instead of inline function
    const setTabRefCallback = useCallback(
      (index: number) => {
        return (el: HTMLButtonElement | null) => {
          tabRefs.current[index] = el;
        };
      },
      []
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        const tabs = tabRefs.current.filter(Boolean) as HTMLButtonElement[];
        let nextIndex = index;

        switch (e.key) {
          case 'ArrowRight':
            if (!isVertical) {
              e.preventDefault();
              nextIndex = (index + 1) % tabs.length;
              while (items[nextIndex]?.disabled && nextIndex !== index) {
                nextIndex = (nextIndex + 1) % tabs.length;
              }
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
          case 'ArrowLeft':
            if (!isVertical) {
              e.preventDefault();
              nextIndex = (index - 1 + tabs.length) % tabs.length;
              while (items[nextIndex]?.disabled && nextIndex !== index) {
                nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
              }
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
          case 'ArrowDown':
            if (isVertical) {
              e.preventDefault();
              nextIndex = (index + 1) % tabs.length;
              while (items[nextIndex]?.disabled && nextIndex !== index) {
                nextIndex = (nextIndex + 1) % tabs.length;
              }
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
          case 'ArrowUp':
            if (isVertical) {
              e.preventDefault();
              nextIndex = (index - 1 + tabs.length) % tabs.length;
              while (items[nextIndex]?.disabled && nextIndex !== index) {
                nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
              }
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
          case 'Home':
            e.preventDefault();
            nextIndex = 0;
            while (items[nextIndex]?.disabled && nextIndex < tabs.length - 1) {
              nextIndex++;
            }
            if (!items[nextIndex]?.disabled) {
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
          case 'End':
            e.preventDefault();
            nextIndex = tabs.length - 1;
            while (items[nextIndex]?.disabled && nextIndex > 0) {
              nextIndex--;
            }
            if (!items[nextIndex]?.disabled) {
              handleTabClick(items[nextIndex].key);
              tabs[nextIndex]?.focus();
            }
            break;
        }
      },
      [items, isVertical, handleTabClick]
    );

    // Touch handling for swipe
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        const diffY = touchStartY.current - e.changedTouches[0].clientY;

        // Minimum swipe distance
        const minSwipe = 50;

        if (isVertical) {
          // Vertical swipe for vertical tabs
          if (Math.abs(diffY) > minSwipe && Math.abs(diffY) > Math.abs(diffX)) {
            const currentIndex = activeIndex;
            if (diffY > 0 && currentIndex < items.length - 1) {
              // Swipe up - next tab
              handleTabClick(items[currentIndex + 1].key);
            } else if (diffY < 0 && currentIndex > 0) {
              // Swipe down - previous tab
              handleTabClick(items[currentIndex - 1].key);
            }
          }
        } else {
          // Horizontal swipe for horizontal tabs
          if (Math.abs(diffX) > minSwipe && Math.abs(diffX) > Math.abs(diffY)) {
            const currentIndex = activeIndex;
            if (diffX > 0 && currentIndex < items.length - 1) {
              // Swipe left - next tab
              handleTabClick(items[currentIndex + 1].key);
            } else if (diffX < 0 && currentIndex > 0) {
              // Swipe right - previous tab
              handleTabClick(items[currentIndex - 1].key);
            }
          }
        }

        touchStartX.current = null;
        touchStartY.current = null;
      },
      [isVertical, items, activeIndex, handleTabClick]
    );

    const visibleItems = collapsible
      ? items.filter((item) => !collapsedTabs.includes(item.key))
      : items;

    const renderBadge = (itemBadge: TabItem['badge']): React.ReactNode => {
      if (!itemBadge) return null;

      let badgeContent: React.ReactNode;
      if (typeof itemBadge === 'number') {
        badgeContent = itemBadge > 99 ? '99+' : itemBadge;
      } else if (typeof itemBadge === 'string') {
        badgeContent = itemBadge;
      } else {
        // TabBadgeConfig object
        if (itemBadge.dot) {
          return (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                marginLeft: 8,
                display: 'inline-block',
              }}
            />
          );
        }
        if (itemBadge.count !== undefined) {
          badgeContent = itemBadge.count > 99 ? '99+' : itemBadge.count;
        } else if (itemBadge.text) {
          badgeContent = itemBadge.text;
        }
      }

      return badgeContent ? <TabBadge>{badgeContent}</TabBadge> : null;
    };

    const getPanelAnimationProps = () => {
      const direction = tabPosition === 'bottom' ? -1 : 1;
      return {
        initial: { opacity: 0, y: 10 * direction } as const,
        animate: { opacity: 1, y: 0 } as const,
        exit: { opacity: 0, y: -10 * direction } as const,
        transition: {
          type: 'spring' as const,
          stiffness: defaultPanelSpring.stiffness,
          damping: defaultPanelSpring.damping,
        },
      };
    };

    return (
      <TabsWrapper
        tabPosition={tabPosition}
        className={className}
        style={style}
      >
        <TabBarHeader>
          <TabsContainer>
            {isScrolling.start && overflow !== 'wrap' && (
              <OverflowShadow isVertical={isVertical} position="start" />
            )}
            <TabsList
              ref={tabsListRef}
              role="tablist"
              type={type}
              tabPosition={tabPosition}
              centered={centered}
              overflow={overflow}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {visibleItems.map((item, index) => {
                const tabId = `tab-${item.key}`;
                const panelId = `tabpanel-${item.key}`;
                const isActive = item.key === activeKey;

                return (
                  <TabButton
                    ref={setTabRefCallback(index)}
                    key={item.key}
                    id={tabId}
                    typeStyle={type}
                    size={size}
                    tabPosition={tabPosition}
                    isActive={isActive}
                    disabled={item.disabled}
                    onClick={() => !item.disabled && handleTabClick(item.key)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    aria-disabled={item.disabled}
                    tabIndex={isActive ? 0 : -1}
                    data-size={size}
                  >
                    {item.icon && (
                      <span style={{ marginRight: 8 }}>{item.icon}</span>
                    )}
                    {item.label}
                    {renderBadge(item.badge)}
                    {isActive && type === 'line' && (
                      <TabIndicator
                        layoutId={`tab-indicator-${tabPosition}`}
                        isVertical={isVertical}
                        transition={{
                          type: 'spring',
                          stiffness: defaultIndicatorSpring.stiffness,
                          damping: defaultIndicatorSpring.damping,
                        }}
                      />
                    )}
                  </TabButton>
                );
              })}

              {/* Collapsed tabs "More" button */}
              {collapsible && collapsedTabs.length > 0 && (
                <TabButton
                  ref={setTabRefCallback(items.length)}
                  typeStyle={type}
                  size={size}
                  tabPosition={tabPosition}
                  isActive={collapsedTabs.includes(activeKey)}
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  role="button"
                  aria-expanded={showMoreMenu}
                  aria-haspopup="true"
                  data-size={size}
                >
                  More ▼
                </TabButton>
              )}
            </TabsList>

            {isScrolling.end && overflow !== 'wrap' && (
              <OverflowShadow isVertical={isVertical} position="end" />
            )}
          </TabsContainer>

          {tabBarExtraContent && (
            <TabBarExtraContent>{tabBarExtraContent}</TabBarExtraContent>
          )}
        </TabBarHeader>

        {/* More menu for collapsed tabs */}
        {showMoreMenu && collapsible && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: 8,
              zIndex: 1000,
              minWidth: 180,
              padding: '8px 0',
            }}
          >
            {items
              .filter((item) => collapsedTabs.includes(item.key))
              .map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: item.key === activeKey ? '#1890ff' : 'inherit',
                    fontWeight: item.key === activeKey ? 600 : 400,
                  }}
                >
                  {item.label}
                  {item.badge && renderBadge(item.badge)}
                </button>
              ))}
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <TabPanel
            key={activeTab?.key || 'empty'}
            role="tabpanel"
            id={activeTab ? `tabpanel-${activeTab.key}` : undefined}
            aria-labelledby={activeTab ? `tab-${activeTab.key}` : undefined}
            {...getPanelAnimationProps()}
          >
            {activeTab?.children}
          </TabPanel>
        </AnimatePresence>
      </TabsWrapper>
    );
  }
);

Tabs.displayName = 'Tabs';
