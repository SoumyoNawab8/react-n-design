'use client';
import type React from 'react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';
import { FaChevronDown, FaCheck, FaCircle } from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import { createPortal } from 'react-dom';
import {
  MenuDivider,
  MenuDropdown,
  MenuDropdownMobile,
  MenuDrawerOverlay,
  MenuItem,
  MenuItemBadge,
  MenuItemCheckbox,
  MenuItemContent,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemRadio,
  MenuLabel,
  MenuTrigger,
  MenuWrapper,
} from './Menu.styles';

export type MenuItemType = 'item' | 'divider' | 'label';
export type MenuCheckableType = 'checkbox' | 'radio';

export interface MenuItemDef {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  checked?: boolean;
  checkable?: 'checkbox' | 'radio';
  badge?: React.ReactNode;
  badgeColor?: string;
}

export interface MenuDividerDef {
  type: 'divider';
}

export interface MenuLabelDef {
  type: 'label';
  label: string;
}

export type MenuItemData = MenuItemDef | MenuDividerDef | MenuLabelDef;

export interface MenuProps {
  trigger?: React.ReactNode;
  label?: string;
  items: MenuItemData[];
  onSelect?: (key: string) => void;
  placement?: 'bottom-left' | 'bottom-right';
  /** Mobile drawer mode when screen < 768px */
  mobileDrawer?: boolean;
  /** Full-screen menu on mobile */
  mobileFullscreen?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
  /** Custom item renderer */
  renderItem?: (
    item: MenuItemDef,
    props: {
      onClick: () => void;
      onMouseEnter: () => void;
      isActive: boolean;
      isDisabled: boolean;
    }
  ) => React.ReactNode;
}

const isItem = (item: any): item is MenuItemDef => item && typeof item.key === 'string';
const isDivider = (item: any): item is MenuDividerDef => item?.type === 'divider';
const isLabel = (item: any): item is MenuLabelDef => item?.type === 'label';

// Hook for detecting mobile viewport
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export const Menu = memo(({
  trigger,
  label = 'Menu',
  items,
  onSelect,
  placement = 'bottom-left',
  mobileDrawer = true,
  mobileFullscreen = false,
  style,
  className,
  renderItem,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  // Memoize enabled items filter
  const enabledIndices = useMemo(() =>
    items
      .map((item, i) => (isItem(item) && !item.disabled ? i : -1))
      .filter((i) => i >= 0),
    [items]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile && mobileDrawer && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [isMobile, mobileDrawer, isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsOpen(true);
          setActiveIndex(enabledIndices[0] ?? -1);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            const idx = enabledIndices.indexOf(prev);
            const next = enabledIndices[idx + 1] ?? enabledIndices[0];
            return next ?? -1;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            const idx = enabledIndices.indexOf(prev);
            const next =
              idx > 0 ? enabledIndices[idx - 1] : enabledIndices[enabledIndices.length - 1];
            return next ?? -1;
          });
          break;
        case 'Enter':
        case ' ': {
          e.preventDefault();
          const item = items[activeIndex];
          if (isItem(item) && !item.disabled) {
            handleItemClick(item);
          }
          break;
        }
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab':
          close();
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(enabledIndices[0] ?? -1);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(enabledIndices[enabledIndices.length - 1] ?? -1);
          break;
      }
    },
    [isOpen, items, enabledIndices, activeIndex, close]
  );

  // Memoized click handler
  const handleItemClick = useCallback((item: MenuItemDef) => {
    if (item.disabled) return;
    item.onClick?.();
    onSelect?.(item.key);
    if (item.checkable !== 'radio') {
      close();
    }
  }, [onSelect, close]);

  // Memoized mouse enter handler
  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {isMobile && mobileDrawer && (
            <MenuDrawerOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
          )}
          <MenuDropdown
            role="menu"
            aria-label={label}
            $isMobile={isMobile && mobileDrawer}
            $mobileFullscreen={mobileFullscreen}
            initial={isMobile && mobileDrawer
              ? { opacity: 0, y: '100%' }
              : { opacity: 0, y: -8, scale: 0.96 }
            }
            animate={isMobile && mobileDrawer
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0, scale: 1 }
            }
            exit={isMobile && mobileDrawer
              ? { opacity: 0, y: '100%' }
              : { opacity: 0, y: -8, scale: 0.96 }
            }
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={
              !isMobile || !mobileDrawer
                ? placement === 'bottom-right'
                  ? { left: 'auto', right: 0, ...style }
                  : style
                : style
            }
            className={className}
          >
            {items.map((item, index) => {
              if (isDivider(item)) {
                return (
                  <MenuDivider
                    key={`divider-${index}`}
                    role="separator"
                  />
                );
              }
              if (isLabel(item)) {
                return (
                  <MenuLabel
                    key={`label-${index}`}
                    role="presentation"
                  >
                    {item.label}
                  </MenuLabel>
                );
              }
              if (isItem(item)) {
                const isActive = index === activeIndex;
                const isCheckable = item.checkable === 'checkbox' || item.checkable === 'radio';

                if (renderItem) {
                  return (
                    <div key={item.key}>
                      {renderItem(item, {
                        onClick: () => handleItemClick(item),
                        onMouseEnter: () => handleMouseEnter(index),
                        isActive,
                        isDisabled: !!item.disabled,
                      })}
                    </div>
                  );
                }

                return (
                  <MenuItem
                    key={item.key}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    aria-checked={isCheckable ? item.checked : undefined}
                    disabled={item.disabled}
                    $active={isActive}
                    $danger={item.danger}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onKeyDown={handleKeyDown}
                  >
                    {isCheckable && item.checkable === 'checkbox' && (
                      <MenuItemCheckbox $checked={item.checked}>
                        <AnimatePresence>
                          {item.checked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              <FaCheck size={10} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </MenuItemCheckbox>
                    )}
                    {isCheckable && item.checkable === 'radio' && (
                      <MenuItemRadio $checked={item.checked}>
                        <AnimatePresence>
                          {item.checked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              <FaCircle size={6} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </MenuItemRadio>
                    )}
                    {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
                    <MenuItemLabel>{item.label}</MenuItemLabel>
                    {item.badge && (
                      <MenuItemBadge $color={item.badgeColor}>
                        {item.badge}
                      </MenuItemBadge>
                    )}
                  </MenuItem>
                );
              }
              return null;
            })}
          </MenuDropdown>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <MenuWrapper ref={wrapperRef} style={style} className={className}>
      <MenuTrigger
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={label}
        type="button"
      >
        {trigger ?? (
          <>
            {label}
            <FaChevronDown size={12} />
          </>
        )}
      </MenuTrigger>
      {isMobile && mobileDrawer && portalContainer
        ? createPortal(dropdownContent, portalContainer)
        : dropdownContent
      }
    </MenuWrapper>
  );
});

Menu.displayName = 'Menu';
