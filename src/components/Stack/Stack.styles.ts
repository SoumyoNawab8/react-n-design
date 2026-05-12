'use client';
import styled from 'styled-components';

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

export const StyledStack = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['direction', 'gap', 'align', 'justify', 'wrap'].includes(prop),
})<{
  direction: 'row' | 'column';
  gap: number;
  align: 'start' | 'center' | 'end' | 'stretch';
  justify: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap}px;
  align-items: ${({ align }) => alignMap[align]};
  justify-content: ${({ justify }) => justifyMap[justify]};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;
