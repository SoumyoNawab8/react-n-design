'use client';
import type React from 'react';
import {
  NodeAvatar,
  NodeAvatarPlaceholder,
  NodeCard,
  NodeLabel,
  NodeRole,
  OrgChartContainer,
  OrgTree,
  OrgTreeNode,
} from './OrgChart.styles';

export interface OrgNode {
  id: string;
  label: string;
  role?: string;
  avatar?: string;
  children?: OrgNode[];
}

export interface OrgChartProps {
  root: OrgNode;
  onNodeClick?: (node: OrgNode) => void;
  className?: string;
}

const OrgChartNode: React.FC<{
  node: OrgNode;
  onNodeClick?: (node: OrgNode) => void;
  isRoot?: boolean;
}> = ({ node, onNodeClick, isRoot = false }) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    onNodeClick?.(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNodeClick?.(node);
    }
  };

  return (
    <OrgTreeNode $isRoot={isRoot}>
      <NodeCard
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`${node.label}${node.role ? `, ${node.role}` : ''}`}
      >
        {node.avatar ? (
          <NodeAvatar src={node.avatar} alt="" />
        ) : (
          <NodeAvatarPlaceholder>
            {node.label.charAt(0).toUpperCase()}
          </NodeAvatarPlaceholder>
        )}
        <NodeLabel>{node.label}</NodeLabel>
        {node.role && <NodeRole>{node.role}</NodeRole>}
      </NodeCard>
      {hasChildren && (
        <OrgTree $isRoot={false}>
          {node.children!.map((child) => (
            <OrgChartNode key={child.id} node={child} onNodeClick={onNodeClick} />
          ))}
        </OrgTree>
      )}
    </OrgTreeNode>
  );
};

export const OrgChart: React.FC<OrgChartProps> = ({ root, onNodeClick, className }) => {
  return (
    <OrgChartContainer className={className} data-testid="org-chart">
      <OrgTree $isRoot={true}>
        <OrgChartNode node={root} onNodeClick={onNodeClick} isRoot={true} />
      </OrgTree>
    </OrgChartContainer>
  );
};
