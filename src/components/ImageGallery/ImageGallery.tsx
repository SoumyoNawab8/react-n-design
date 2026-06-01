'use client';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Times } from '../../icons';
import {
  GalleryContainer,
  GalleryImage,
  ImageWrapper,
  LightboxBackdrop,
  LightboxCaption,
  LightboxCloseButton,
  LightboxContent,
  LightboxImage,
  LightboxOverlay,
} from './ImageGallery.styles';

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: string;
  className?: string;
}

const clampColumns = (n: number) => Math.min(Math.max(n, 1), 4);

const ImageGalleryComponent: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = '16px',
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const safeColumns = clampColumns(columns);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    if (activeIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, closeLightbox]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeLightbox();
      }
    },
    [closeLightbox]
  );

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <GalleryContainer
        className={className}
        $columns={safeColumns}
        $gap={gap}
        role="list"
        aria-label="Image gallery"
      >
        {images.map((image, index) => (
          <ImageWrapper key={`${image.src}-${index}`} role="listitem" onClick={() => openLightbox(index)}>
            <GalleryImage
              src={image.src}
              alt={image.alt || ''}
              loading="lazy"
              data-testid={`gallery-image-${index}`}
            />
          </ImageWrapper>
        ))}
      </GalleryContainer>
      {activeImage && (
        <LightboxOverlay
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt || 'Lightbox'}
          onClick={handleBackdropClick}
        >
          <LightboxBackdrop />
          <LightboxContent>
            <LightboxCloseButton
              ref={closeButtonRef}
              aria-label="Close lightbox"
              onClick={closeLightbox}
            >
              <Times size={24} />
            </LightboxCloseButton>
            <LightboxImage
              src={activeImage.src}
              alt={activeImage.alt || ''}
            />
            {activeImage.caption && (
              <LightboxCaption>{activeImage.caption}</LightboxCaption>
            )}
          </LightboxContent>
        </LightboxOverlay>
      )}
    </>
  );
};

ImageGalleryComponent.displayName = 'ImageGallery';

export const ImageGallery = memo(ImageGalleryComponent);
