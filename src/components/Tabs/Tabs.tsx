import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  TabsWrapper,
  TabsList,
  TabButton,
  TabIndicator,
  TabPanel,
  TabBarHeader,
  TabBarExtraContent,
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
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

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

  const activeTab = items.find((item) => item.key === activeKey);

  return (
    <TabsWrapper tabPosition={tabPosition}>
      <TabBarHeader>
        <TabsList
          type={type}
          tabPosition={tabPosition}
          centered={centered}
        >
          {items.map((item) => (
            <TabButton
              key={item.key}
              typeStyle={type}
              size={size}
              tabPosition={tabPosition}
              isActive={item.key === activeKey}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabClick(item.key)}
            >
              {item.label}
              {item.key === activeKey && type === 'line' && (
                <TabIndicator
                  layoutId={`tab-indicator-${tabPosition}`}
                  isVertical={tabPosition === 'left'}
                />
              )}
            </TabButton>
          ))}
        </TabsList>
        {tabBarExtraContent && (
          <TabBarExtraContent>{tabBarExtraContent}</TabBarExtraContent>
        )}
      </TabBarHeader>
      <AnimatePresence mode="wait">
        <TabPanel
          key={activeTab?.key}
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