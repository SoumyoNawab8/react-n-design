'use client';
import type React from 'react';
import { FaChevronRight, FaHome } from "../../icons";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbsList,
  BreadcrumbsNav,
} from './Breadcrumbs.styles';

export interface BreadcrumbItemProps {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
  separator?: React.ReactNode;
  homeIcon?: React.ReactNode;
  ariaLabel?: string;
}

export const Breadcrumbs = ({
  items,
  separator = <FaChevronRight size={10} />,
  homeIcon = <FaHome size={14} />,
  ariaLabel = 'Breadcrumb',
}: BreadcrumbsProps) => {
  const totalItems = items.length;

  return (
    <BreadcrumbsNav aria-label={ariaLabel}>
      <BreadcrumbsList>
        {items.map((item, index) => {
          const isLast = index === totalItems - 1;
          const isFirst = index === 0;

          return (
            <BreadcrumbItem key={index}>
              {isFirst && item.icon === undefined && homeIcon && (
                <span style={{ display: 'inline-flex', marginRight: 4 }} aria-hidden="true">
                  {homeIcon}
                </span>
              )}
              {isLast ? (
                <BreadcrumbLink as="span" isCurrent={true} aria-current="page" tabIndex={0}>
                  {item.icon && (
                    <span style={{ display: 'inline-flex', marginRight: 6 }} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  href={item.href || '#'}
                  isCurrent={false}
                  onClick={(e) => {
                    if (!item.href) {
                      e.preventDefault();
                    }
                  }}
                >
                  {item.icon && (
                    <span style={{ display: 'inline-flex', marginRight: 6 }} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator aria-hidden="true">{separator}</BreadcrumbSeparator>}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbsList>
    </BreadcrumbsNav>
  );
};
