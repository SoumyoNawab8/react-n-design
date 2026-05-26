import type { MotionProps } from 'framer-motion';
import React, { type ComponentType } from 'react';

// Module cache for framer-motion
let framerMotionModule: typeof import('framer-motion') | null = null;
let loadPromise: Promise<typeof import('framer-motion')> | null = null;

/**
 * Lazy load framer-motion module. Returns cached module if already loaded.
 */
export const loadFramerMotion = async (): Promise<typeof import('framer-motion')> => {
  if (framerMotionModule) {
    return framerMotionModule;
  }
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = import('framer-motion');
  framerMotionModule = await loadPromise;
  return framerMotionModule;
};

/**
 * Hook to use lazy-loaded framer-motion in components.
 * Returns null while loading, then the module.
 */
export const useFramerMotion = (): typeof import('framer-motion') | null => {
  const [module, setModule] = React.useState<typeof import('framer-motion') | null>(
    framerMotionModule
  );

  React.useEffect(() => {
    if (!module) {
      loadFramerMotion().then(setModule);
    }
  }, [module]);

  return module;
};

// Track if framer-motion is already loaded
const _isMotionLoaded = false;

// Synchronously try to get module (returns null if not loaded)
const _getMotionSync = () => framerMotionModule;

// Motion component cache to preserve reference equality
const motionComponentCache: Map<string, ComponentType<MotionProps>> = new Map();

/**
 * Creates a lazy motion component that loads framer-motion on mount.
 */
const createLazyMotionComponent = (tag: string): ComponentType<MotionProps> => {
  if (motionComponentCache.has(tag)) {
    const cachedComponent = motionComponentCache.get(tag);
    if (cachedComponent) {
      return cachedComponent;
    }
  }

  const LazyMotion = React.forwardRef<HTMLElement, MotionProps>((props, ref) => {
    const fm = useFramerMotion();
    const MotionComponent = fm?.motion[tag as keyof typeof fm.motion] as
      | ComponentType<MotionProps>
      | undefined;

    if (!MotionComponent) {
      // Return plain HTML element while loading
      const Tag = tag as keyof JSX.IntrinsicElements;
      return React.createElement(Tag, { ...props, ref: ref as React.Ref<HTMLElement> });
    }

    return React.createElement(MotionComponent, { ...props, ref });
  });

  LazyMotion.displayName = `LazyMotion.${tag}`;
  motionComponentCache.set(tag, LazyMotion);
  return LazyMotion;
};

/**
 * Motion proxy that returns lazy-loaded motion components.
 * Compatible with styled(motion.div) pattern.
 */
export const motion: typeof import('framer-motion').motion = new Proxy(
  {} as typeof import('framer-motion').motion,
  {
    get: (_, tag: string) => {
      return createLazyMotionComponent(tag);
    },
  }
);
/**
 * Lazy AnimatePresence component that loads framer-motion on first use.
 */
export const AnimatePresence: React.FC<
  React.PropsWithChildren<{ mode?: 'sync' | 'popLayout' | 'wait'; initial?: boolean }>
> = (props) => {
  const fm = useFramerMotion();
  if (!fm) {
    // Render children without animation while loading
    return React.createElement(React.Fragment, null, props.children);
  }
  return React.createElement(
    fm.AnimatePresence,
    { mode: props.mode, initial: props.initial },
    props.children
  );
};

// Re-export types for compatibility
export type { MotionProps } from 'framer-motion';
