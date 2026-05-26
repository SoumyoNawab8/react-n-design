'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  TabBarExtraContent,
  TabBarHeader,
  TabButton,
  TabIndicator,
  TabPanel,
  TabsList,
  TabsWrapper,
} from './Tabs.styles';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
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
   * The position of the tabs.
   */
  tabPosition?: 'top' | 'left';
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
}

/**
 * An advanced component for organizing content into switchable views,
 * with support for multiple types, positions, and sizes.
 */
export const Tabs = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onTabChange,
  type = 'line',
  tabPosition = 'top',
  size = 'medium',
  centered = false,
  tabBarExtraContent,
}: TabsProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (isControlled) {
      setInternalActiveKey(controlledActiveKey);
    }
  }, [controlledActiveKey, isControlled]);

  const handleTabClick = (key: string) => {
    if (onTabChange) {
      onTabChange(key);
    }
    if (!isControlled) {
      setInternalActiveKey(key);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const tabs = tabRefs.current.filter(Boolean) as HTMLButtonElement[];
      let nextIndex = index;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (index + 1) % tabs.length;
          while (items[nextIndex]?.disabled && nextIndex !== index) {
            nextIndex = (nextIndex + 1) % tabs.length;
          }
          handleTabClick(items[nextIndex].key);
          tabs[nextIndex]?.focus();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          while (items[nextIndex]?.disabled && nextIndex !== index) {
            nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
          }
          handleTabClick(items[nextIndex].key);
          tabs[nextIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          while (items[nextIndex]?.disabled && nextIndex < tabs.length - 1) {
            nextIndex++;
          }
          handleTabClick(items[nextIndex].key);
          tabs[nextIndex]?.focus();
          break;
        case 'End':
          e.preventDefault();
          nextIndex = tabs.length - 1;
          while (items[nextIndex]?.disabled && nextIndex > 0) {
            nextIndex--;
          }
          handleTabClick(items[nextIndex].key);
          tabs[nextIndex]?.focus();
          break;
      }
    },
    [items, handleTabClick]
  );

  const activeTab = items.find((item) => item.key === activeKey);

  return (
    <TabsWrapper tabPosition={tabPosition}>
      <TabBarHeader>
        <TabsList role="tablist" type={type} tabPosition={tabPosition} centered={centered}>
          {items.map((item, index) => {
            const tabId = `tab-${item.key}`;
            const panelId = `tabpanel-${item.key}`;
            const isActive = item.key === activeKey;
            return (
              <TabButton
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
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
              >
                {item.label}
                {isActive && type === 'line' && (
                  <TabIndicator
                    layoutId={`tab-indicator-${tabPosition}`}
                    isVertical={tabPosition === 'left'}
                  />
                )}
              </TabButton>
            );
          })}
        </TabsList>
        {tabBarExtraContent && <TabBarExtraContent>{tabBarExtraContent}</TabBarExtraContent>}
      </TabBarHeader>
      <AnimatePresence mode="wait">
        <TabPanel
          key={activeTab?.key}
          role="tabpanel"
          id={activeTab ? `tabpanel-${activeTab.key}` : undefined}
          aria-labelledby={activeTab ? `tab-${activeTab.key}` : undefined}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab?.children}
        </TabPanel>
      </AnimatePresence>
    </TabsWrapper>
  );
};
