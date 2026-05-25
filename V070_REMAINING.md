# REACT-N-DESIGN v0.7.0 - REMAINING TASKS

Current Status:
- ✅ Version: 0.7.0
- ✅ npm audit: 0 vulnerabilities
- ✅ ESM Bundle: 110.55 KB (under 150KB limit)
- ✅ Components: 55
- ✅ Components with tests: 29/55 (53%) - 26 components still need tests
- ✅ Tests: 217 passing, 2 failing

## ⚠️ CRITICAL ISSUES TO FIX

### Issue 1: CJS Bundle Size (485.96 KB - EXCEEDS 150KB LIMIT)
The CJS bundle is bundling all dependencies instead of tree-shaking.

**Fix Strategy:**
- Check rollup.config.js for external dependencies
- Ensure react, react-dom, styled-components, framer-motion are marked as external
- This should NOT bundle node_modules into CJS
- Rerun `npm run test:size` to verify

### Issue 2: 2 Failing Tests
Both are scroll-reset issues (likely async timing):

**VirtualList.test.tsx - "resets scroll position when items change"**
- Expected scrollTop: 0, Received: 500
- Component may need useEffect to reset scroll on item change

**AIChat.test.tsx - "auto-scrolls to bottom when new messages added"**
- Similar scroll timing issue

**Fix Strategy:**
- Add async wait in test after items change
- Or fix component to properly reset scroll in useEffect

## 📋 REMAINING TESTS TO CREATE (26 components)

Priority order (high impact):
1. Accordion.test.tsx
2. Avatar.test.tsx
3. Drawer.test.tsx
4. Tooltip.test.tsx
5. Toast.test.tsx
6. Slider.test.tsx
7. Menu.test.tsx
8. MultiSelect.test.tsx
9. Form.test.tsx
10. FileUpload.test.tsx

Lower priority (presentational):
11. Breadcrumbs.test.tsx
12. Carousel.test.tsx
13. ComboBox.test.tsx
14. Divider.test.tsx
15. ColorPicker.test.tsx
16. Grid.test.tsx
17. Icon.test.tsx
18. ProgressBar.test.tsx
19. Skeleton.test.tsx
20. SkipToContent.test.tsx
21. Stack.test.tsx
22. Stepper.test.tsx
23. Tag.test.tsx
24. Tree.test.tsx
25. Typography.test.tsx
26. VisuallyHidden.test.tsx

## TDD PATTERN FOR EACH COMPONENT

1. Create `ComponentName.test.tsx` FIRST
2. Test basic rendering (exists in document)
3. Test props (variants, sizes, states)
4. Test events (click, change, etc.)
5. Test accessibility (axe-core)
6. Watch tests fail
7. Fix component if needed
8. Verify tests pass

## EXAMPLE TEST SKELETON (from Button.test.tsx)

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeContextProvider } from '../../context';
import { ComponentName } from './ComponentName';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeContextProvider>{ui}</ThemeContextProvider>);
};

describe('ComponentName', () => {
  it('renders correctly', () => {
    renderWithTheme(<ComponentName />);
    expect(screen.getBy...).toBeInTheDocument();
  });
  
  it('handles props correctly', () => {
    // Test props
  });
  
  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## STARTING COMMAND

```bash
cd ~/Desktop/dev/react-n-design

# First, fix CJS bundle size
cat rollup.config.js
# Check if externals includes peer deps

# Then fix 2 failing tests
npm run test:vitest -- --run VirtualList AIChat

# Then add tests for remaining 26 components
# Priority: Accordion, Avatar, Drawer, Tooltip, Toast
```