'use client';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { useCallback } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  SuggestionChipActions,
  SuggestionChipButton,
  SuggestionChipItem,
  SuggestionChipsFooter,
  SuggestionChipsFooterButton,
  SuggestionChipsList,
  SuggestionChipsWrapper,
  SuggestionChipText,
  SuggestionChipTypeIndicator,
} from './SuggestionChips.styles';

export interface SuggestionChip {
  id: string;
  text: string;
  type?: 'insert' | 'replace' | 'delete';
}

export interface SuggestionChipsProps {
  suggestions: SuggestionChip[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
}

export const SuggestionChips = ({
  suggestions,
  onAccept,
  onReject,
  onAcceptAll,
  onRejectAll,
}: SuggestionChipsProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onAccept(id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onReject(id);
      }
    },
    [onAccept, onReject]
  );

  const showFooter =
    suggestions.length > 0 && (onAcceptAll !== undefined || onRejectAll !== undefined);

  return (
    <SuggestionChipsWrapper role="region" aria-label="Inline suggestions">
      <SuggestionChipsList role="list">
        <AnimatePresence mode="popLayout">
          {suggestions.map((chip) => (
            <SuggestionChipItem
              key={chip.id}
              as={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 30 }}
              transition={{ duration: 0.2 }}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e, chip.id)}
              aria-label={`Suggestion: ${chip.text}`}
            >
              <SuggestionChipTypeIndicator chipType={chip.type} aria-hidden="true" />
              <SuggestionChipText>{chip.text}</SuggestionChipText>
              <SuggestionChipActions>
                <SuggestionChipButton
                  variant="accept"
                  onClick={() => onAccept(chip.id)}
                  aria-label="Accept suggestion"
                  title="Accept"
                >
                  <FaCheck size={12} />
                </SuggestionChipButton>
                <SuggestionChipButton
                  variant="reject"
                  onClick={() => onReject(chip.id)}
                  aria-label="Reject suggestion"
                  title="Reject"
                >
                  <FaTimes size={12} />
                </SuggestionChipButton>
              </SuggestionChipActions>
            </SuggestionChipItem>
          ))}
        </AnimatePresence>
      </SuggestionChipsList>

      {showFooter && (
        <SuggestionChipsFooter>
          {onAcceptAll && (
            <SuggestionChipsFooterButton
              variant="accept"
              onClick={onAcceptAll}
              aria-label="Accept all suggestions"
            >
              <FaCheck size={12} />
              Accept All
            </SuggestionChipsFooterButton>
          )}
          {onRejectAll && (
            <SuggestionChipsFooterButton
              variant="reject"
              onClick={onRejectAll}
              aria-label="Reject all suggestions"
            >
              <FaTimes size={12} />
              Reject All
            </SuggestionChipsFooterButton>
          )}
        </SuggestionChipsFooter>
      )}
    </SuggestionChipsWrapper>
  );
};
