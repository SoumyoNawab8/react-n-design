'use client';
import React, { memo, useMemo } from 'react';
import {
  DiffColumn,
  DiffColumnHeader,
  DiffLine,
  DiffLineContent,
  DiffLineNumber,
  DiffUnifiedContainer,
  DiffViewerContainer,
  DiffViewerHeader,
} from './DiffViewer.styles';

export interface DiffViewerProps {
  oldValue: string;
  newValue: string;
  mode?: 'split' | 'unified';
  className?: string;
}

interface DiffRow {
  oldLine: string | null;
  newLine: string | null;
  lineNumber: number;
}

const DiffViewerBase = ({ oldValue, newValue, mode = 'split', className }: DiffViewerProps) => {
  const rows = useMemo(() => {
    const oldLines = oldValue.split('\n');
    const newLines = newValue.split('\n');
    const maxLen = Math.max(oldLines.length, newLines.length);
    const result: DiffRow[] = [];

    for (let i = 0; i < maxLen; i++) {
      result.push({
        oldLine: oldLines[i] ?? null,
        newLine: newLines[i] ?? null,
        lineNumber: i + 1,
      });
    }
    return result;
  }, [oldValue, newValue]);

  if (mode === 'split') {
    return (
      <DiffViewerContainer className={className} role="region" aria-label="Diff viewer">
        <DiffViewerHeader>
          <DiffColumnHeader>Old</DiffColumnHeader>
          <DiffColumnHeader>New</DiffColumnHeader>
        </DiffViewerHeader>
        <div style={{ display: 'flex', gap: '8px' }}>
          <DiffColumn>
            {rows.map((row, i) => {
              const isRemoved =
                row.oldLine !== null && (row.newLine === null || row.oldLine !== row.newLine);
              return (
                <DiffLine key={`old-${i}`} status={isRemoved ? 'removed' : 'same'}>
                  <DiffLineNumber>{row.oldLine !== null ? row.lineNumber : ''}</DiffLineNumber>
                  <DiffLineContent>{row.oldLine ?? ''}</DiffLineContent>
                </DiffLine>
              );
            })}
          </DiffColumn>
          <DiffColumn>
            {rows.map((row, i) => {
              const isAdded =
                row.newLine !== null && (row.oldLine === null || row.oldLine !== row.newLine);
              return (
                <DiffLine key={`new-${i}`} status={isAdded ? 'added' : 'same'}>
                  <DiffLineNumber>{row.newLine !== null ? row.lineNumber : ''}</DiffLineNumber>
                  <DiffLineContent>{row.newLine ?? ''}</DiffLineContent>
                </DiffLine>
              );
            })}
          </DiffColumn>
        </div>
      </DiffViewerContainer>
    );
  }

  // Unified mode
  return (
    <DiffUnifiedContainer className={className} role="region" aria-label="Diff viewer">
      <DiffViewerHeader>
        <DiffColumnHeader>Unified Diff</DiffColumnHeader>
      </DiffViewerHeader>
      {rows.map((row, i) => {
        if (row.oldLine === row.newLine) {
          return (
            <DiffLine key={`u-${i}`} status="same">
              <DiffLineNumber>{row.lineNumber}</DiffLineNumber>
              <DiffLineContent>{row.oldLine ?? ''}</DiffLineContent>
            </DiffLine>
          );
        }
        const lines: React.ReactElement[] = [];
        if (row.oldLine !== null) {
          lines.push(
            <DiffLine key={`u-${i}-old`} status="removed">
              <DiffLineNumber>{row.lineNumber}</DiffLineNumber>
              <DiffLineContent>- {row.oldLine}</DiffLineContent>
            </DiffLine>
          );
        }
        if (row.newLine !== null) {
          lines.push(
            <DiffLine key={`u-${i}-new`} status="added">
              <DiffLineNumber>{row.newLine !== null ? row.lineNumber : ''}</DiffLineNumber>
              <DiffLineContent>+ {row.newLine}</DiffLineContent>
            </DiffLine>
          );
        }
        return <React.Fragment key={`u-${i}`}>{lines}</React.Fragment>;
      })}
    </DiffUnifiedContainer>
  );
};

DiffViewerBase.displayName = 'DiffViewer';

export const DiffViewer = memo(DiffViewerBase);
export default DiffViewer;
