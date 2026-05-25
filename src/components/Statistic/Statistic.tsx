'use client';
import type React from 'react';
import { motion } from '../../utils/lazyMotion';
import {
  StatisticContainer,
  StatisticTitle,
  StatisticValue,
  StatisticPrefix,
  StatisticSuffix,
  TrendIndicator,
} from './Statistic.styles';
import { FaArrowUp, FaArrowDown } from '../../icons';

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  /**
   * The title/label for the statistic.
   */
  title?: React.ReactNode;
  /**
   * The value to display.
   */
  value: React.ReactNode;
  /**
   * Content to display before the value (e.g., '$').
   */
  prefix?: React.ReactNode;
  /**
   * Content to display after the value (e.g., '%').
   */
  suffix?: React.ReactNode;
  /**
   * Decimal places for number values.
   * @default 0
   */
  precision?: number;
  /**
   * Trend direction ('up' | 'down' | null).
   * Shows an arrow indicator when set.
   */
  trend?: 'up' | 'down' | null;
  /**
   * Whether to animate the value entering.
   * @default true
   */
  animate?: boolean;
}

/**
 * A component for displaying statistics with optional trend indicators.
 * Supports prefixes, suffixes, and customizable precision for numbers.
 */
export const Statistic = ({
  title,
  value,
  prefix,
  suffix,
  precision = 0,
  trend = null,
  animate = true,
  ...props
}: StatisticProps) => {
  // Format numeric values with precision
  const formatValue = (val: React.ReactNode): React.ReactNode => {
    if (typeof val === 'number') {
      return val.toFixed(precision);
    }
    return val;
  };

  const displayedValue = formatValue(value);

  return (
    <StatisticContainer {...props}>
      {title && (
        <StatisticTitle>{title}</StatisticTitle>
      )}
      <StatisticValue>
        {prefix && <StatisticPrefix>{prefix}</StatisticPrefix>}
        {<motion.span
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {displayedValue}
        </motion.span>}
        {suffix && <StatisticSuffix>{suffix}</StatisticSuffix>}
        {trend && (
          <TrendIndicator trend={trend}>
            {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
          </TrendIndicator>
        )}
      </StatisticValue>
    </StatisticContainer>
  );
};