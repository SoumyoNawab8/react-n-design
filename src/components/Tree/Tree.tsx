'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import {
  TreeNodeChildren,
  TreeNodeContent,
  TreeNodeItem,
  TreeNodeToggle,
  TreeWrapper,
} from './Tree.styles';

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (keys: string[]) => void;
  onExpand?: (keys: string[]) => void;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  expandedKeys: string[];
  selectedKeys: string[];
  onToggle: (key: string) => void;
  onSelect: (key: string) => void;
  focusMap: React.MutableRefObject<Map<string, HTMLDivElement>>;
}

const TreeNodeComponent = ({
  node,
  level,
  expandedKeys,
  selectedKeys,
  onToggle,
  onSelect,
  focusMap,
}: TreeNodeProps) => {
  const hasChildren = !!(node.children && node.children.length > 0);
  const isExpanded = expandedKeys.includes(node.key);
  const isSelected = selectedKeys.includes(node.key);

  return (
    <TreeNodeItem role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <TreeNodeContent
        ref={(el) => {
          if (el) focusMap.current.set(node.key, el);
        }}
        level={level}
        isSelected={isSelected}
        disabled={node.disabled}
        tabIndex={0}
        onClick={() => {
          if (node.disabled) return;
          onSelect(node.key);
          if (hasChildren) {
            onToggle(node.key);
          }
        }}
      >
        {hasChildren && (
          <TreeNodeToggle
            isExpanded={isExpanded}
            onClick={(e) => {
              e.stopPropagation();
              if (!node.disabled) onToggle(node.key);
            }}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <FaChevronRight size={10} />
          </TreeNodeToggle>
        )}
        {!hasChildren && <span style={{ width: 20, display: 'inline-block' }} />}
        <span>{node.title}</span>
      </TreeNodeContent>
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <TreeNodeChildren
            role="group"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {node.children?.map((child) => (
              <TreeNodeComponent
                key={child.key}
                node={child}
                level={level + 1}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                onToggle={onToggle}
                onSelect={onSelect}
                focusMap={focusMap}
              />
            ))}
          </TreeNodeChildren>
        )}
      </AnimatePresence>
    </TreeNodeItem>
  );
};

/**
 * A hierarchical collapsible tree view with keyboard navigation and ARIA support.
 */
export const Tree = ({
  data,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  onSelect,
  onExpand,
}: TreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const focusMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const treeRef = useRef<HTMLUListElement>(null);

  const allKeys = useCallback((nodes: TreeNode[]): string[] => {
    let keys: string[] = [];
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(allKeys(node.children));
      }
    }
    return keys;
  }, []);

  const flatKeys = allKeys(data);

  const handleToggle = useCallback(
    (key: string) => {
      setExpandedKeys((prev) => {
        const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
        onExpand?.(next);
        return next;
      });
    },
    [onExpand]
  );

  const handleSelect = useCallback(
    (key: string) => {
      setSelectedKeys((prev) => {
        const next = prev.includes(key) ? [] : [key];
        onSelect?.(next);
        return next;
      });
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;
      const currentKey = Array.from(focusMap.current.entries()).find(
        ([, el]) => el === active
      )?.[0];
      if (!currentKey) return;

      const idx = flatKeys.indexOf(currentKey);
      if (idx === -1) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          const next = flatKeys[idx + 1];
          if (next) focusMap.current.get(next)?.focus();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const prev = flatKeys[idx - 1];
          if (prev) focusMap.current.get(prev)?.focus();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          const node = findNode(data, currentKey);
          if (node?.children && node.children.length > 0) {
            if (!expandedKeys.includes(currentKey)) {
              handleToggle(currentKey);
            } else {
              const firstChild = flatKeys[idx + 1];
              if (firstChild) focusMap.current.get(firstChild)?.focus();
            }
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (expandedKeys.includes(currentKey)) {
            handleToggle(currentKey);
          } else {
            const parentKey = findParentKey(data, currentKey);
            if (parentKey) focusMap.current.get(parentKey)?.focus();
          }
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          const node = findNode(data, currentKey);
          if (node && !node.disabled) {
            if (node.children && node.children.length > 0) {
              handleToggle(currentKey);
            }
            handleSelect(currentKey);
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          const first = flatKeys[0];
          if (first) focusMap.current.get(first)?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          const last = flatKeys[flatKeys.length - 1];
          if (last) focusMap.current.get(last)?.focus();
          break;
        }
      }
    },
    [data, flatKeys, expandedKeys, handleToggle, handleSelect]
  );

  return (
    <TreeWrapper ref={treeRef} role="tree" aria-label="Tree" onKeyDown={handleKeyDown}>
      {data.map((node) => (
        <TreeNodeComponent
          key={node.key}
          node={node}
          level={0}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onToggle={handleToggle}
          onSelect={handleSelect}
          focusMap={focusMap}
        />
      ))}
    </TreeWrapper>
  );
};

function findNode(nodes: TreeNode[], key: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return undefined;
}

function findParentKey(nodes: TreeNode[], key: string, parentKey?: string): string | undefined {
  for (const node of nodes) {
    if (node.key === key) return parentKey;
    if (node.children) {
      const found = findParentKey(node.children, key, node.key);
      if (found) return found;
    }
  }
  return undefined;
}
