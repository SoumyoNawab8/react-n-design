import styled from 'styled-components';

export const GalleryContainer = styled.div<{
  $columns: number;
  $gap: string;
}>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: ${({ $gap }) => $gap};
  padding: ${({ $gap }) => $gap};

  @media (max-width: 640px) {
    grid-template-columns: repeat(${({ $columns }) => Math.min($columns, 2)}, 1fr);
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    grid-template-columns: repeat(${({ $columns }) => Math.min($columns, 3)}, 1fr);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: ${({ theme }) => theme.shadows.strong};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
    transition: background 0.2s ease;
    pointer-events: none;
  }

  &:hover::after {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const LightboxBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => `${theme.colors.shadowDark}f2`};
  backdrop-filter: blur(8px);
`;

export const LightboxContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const LightboxCloseButton = styled.button`
  position: absolute;
  top: -48px;
  right: 0;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.strong};
  object-fit: contain;
`;

export const LightboxCaption = styled.figcaption`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  text-align: center;
  max-width: 600px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;
