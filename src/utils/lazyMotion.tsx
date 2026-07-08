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

// Common Framer Motion props that should never be forwarded to a plain DOM fallback.
// Keeping these off the fallback element prevents React 19 "unknown prop" warnings.
const MOTION_PROP_DENYLIST = new Set<string>([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'whileInView',
  'layout',
  'layoutId',
  'layoutScroll',
  'layoutRoot',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragPropagation',
  'dragControls',
  'dragListener',
  'dragSnapToOrigin',
  'onHoverStart',
  'onHoverEnd',
  'onTap',
  'onTapStart',
  'onTapCancel',
  'onPan',
  'onPanStart',
  'onPanEnd',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onDragTransitionEnd',
  'viewport',
  'onViewportEnter',
  'onViewportLeave',
  'custom',
  'transformTemplate',
  'transformValues',
  'onUpdate',
  'onAnimationStart',
  'onAnimationComplete',
]);

const filterMotionProps = <P extends Record<string, unknown>>(props: P): Partial<P> => {
  const filtered: Partial<P> = {};
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key) && !MOTION_PROP_DENYLIST.has(key)) {
      filtered[key] = props[key];
    }
  }
  return filtered;
};

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
      | ComponentType<MotionProps & { ref?: React.Ref<HTMLElement> }>
      | undefined;

    if (!MotionComponent) {
      // Return plain HTML element while loading, stripping motion-only props so
      // React 19 does not warn about unknown DOM attributes.
      const Tag = tag as keyof JSX.IntrinsicElements;
      return React.createElement(Tag, {
        ...filterMotionProps(props as Record<string, unknown>),
        ref: ref as React.Ref<HTMLElement>,
      });
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
    get: (_, tag: string | symbol) => {
      if (typeof tag === 'symbol') return undefined;
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
