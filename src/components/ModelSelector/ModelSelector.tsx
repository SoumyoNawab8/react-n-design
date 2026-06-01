'use client';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown } from '../../icons';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  EmptyState,
  EmptyStateText,
  LatencyBadge,
  ModelDropdown,
  ModelMetaItem,
  ModelOption,
  ModelOptionContent,
  ModelOptionDescription,
  ModelOptionMeta,
  ModelOptionName,
  ModelOptionProvider,
  ModelSelectorWrapper,
  ModelTrigger,
  ModelTriggerContent,
  ModelTriggerSubtext,
  ModelTriggerText,
  SelectChevron,
} from './ModelSelector.styles';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  pricePer1kTokens: number;
  latencyMs?: number;
  logo?: React.ReactNode;
  description?: string;
}

export interface ModelSelectorProps {
  models: AIModel[];
  value?: string;
  onChange: (modelId: string) => void;
  placeholder?: string;
  className?: string;
}

// Memoized click outside hook
const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handlerRef.current();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref]);
};

const formatContextWindow = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M tokens`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K tokens`;
  return `${n} tokens`;
};

const getLatencyColor = (ms: number): 'green' | 'yellow' | 'red' => {
  if (ms < 200) return 'green';
  if (ms < 500) return 'yellow';
  return 'red';
};

const ModelSelectorBase = ({
  models,
  value,
  onChange,
  placeholder = 'Select a model...',
  className,
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedModel = useMemo(() => models.find((m) => m.id === value), [models, value]);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  // Reset highlighted index when opening
  useEffect(() => {
    if (isOpen) {
      const idx = models.findIndex((m) => m.id === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, models, value]);

  const handleSelect = useCallback(
    (model: AIModel) => {
      onChange(model.id);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (models[highlightedIndex]) {
            handleSelect(models[highlightedIndex]);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          setHighlightedIndex((prev) => (prev + 1) % models.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          setHighlightedIndex((prev) => (prev - 1 + models.length) % models.length);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
          }
          break;
        case 'Home':
          e.preventDefault();
          setHighlightedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setHighlightedIndex(models.length - 1);
          break;
      }
    },
    [isOpen, highlightedIndex, models, handleSelect]
  );

  const listboxId = `model-selector-listbox-${Math.random().toString(36).substr(2, 9)}`;
  const triggerId = `${listboxId}-trigger`;

  return (
    <ModelSelectorWrapper ref={wrapperRef} className={className}>
      <ModelTrigger
        ref={triggerRef}
        id={triggerId}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={
          isOpen && models[highlightedIndex]
            ? `${listboxId}-option-${models[highlightedIndex].id}`
            : undefined
        }
        tabIndex={0}
      >
        <ModelTriggerContent>
          {selectedModel ? (
            <>
              {selectedModel.logo && (
                <span style={{ display: 'flex', alignItems: 'center' }}>{selectedModel.logo}</span>
              )}
              <ModelTriggerText>
                {selectedModel.name}
                <ModelTriggerSubtext>{selectedModel.provider}</ModelTriggerSubtext>
              </ModelTriggerText>
            </>
          ) : (
            <ModelTriggerText>{placeholder}</ModelTriggerText>
          )}
        </ModelTriggerContent>
        <SelectChevron isOpen={isOpen}>
          <FaChevronDown />
        </SelectChevron>
      </ModelTrigger>
      <AnimatePresence>
        {isOpen && (
          <ModelDropdown
            id={listboxId}
            role="listbox"
            aria-label="AI Models"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.2,
            }}
          >
            {models.length === 0 ? (
              <EmptyState>
                <EmptyStateText>No models available</EmptyStateText>
              </EmptyState>
            ) : (
              models.map((model, index) => {
                const isActive = model.id === value;
                const isHighlighted = index === highlightedIndex;
                const latencyColor =
                  model.latencyMs !== undefined ? getLatencyColor(model.latencyMs) : undefined;
                return (
                  <ModelOption
                    key={model.id}
                    id={`${listboxId}-option-${model.id}`}
                    role="option"
                    aria-selected={isActive}
                    isActive={isActive}
                    isHighlighted={isHighlighted}
                    onClick={() => handleSelect(model)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <ModelOptionContent>
                      {model.logo && (
                        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                          {model.logo}
                        </span>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <ModelOptionName>{model.name}</ModelOptionName>
                        <ModelOptionProvider>{model.provider}</ModelOptionProvider>
                        {model.description && (
                          <ModelOptionDescription>{model.description}</ModelOptionDescription>
                        )}
                        <ModelOptionMeta>
                          <ModelMetaItem>{formatContextWindow(model.contextWindow)}</ModelMetaItem>
                          <ModelMetaItem>
                            ${model.pricePer1kTokens.toFixed(4)} / 1K tokens
                          </ModelMetaItem>
                          {model.latencyMs !== undefined && (
                            <LatencyBadge color={latencyColor}>{model.latencyMs}ms</LatencyBadge>
                          )}
                        </ModelOptionMeta>
                      </div>
                    </ModelOptionContent>
                  </ModelOption>
                );
              })
            )}
          </ModelDropdown>
        )}
      </AnimatePresence>
    </ModelSelectorWrapper>
  );
};

ModelSelectorBase.displayName = 'ModelSelector';

export const ModelSelector = memo(ModelSelectorBase);
export default ModelSelector;
