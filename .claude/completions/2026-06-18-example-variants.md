# Component example variants update

**Date:** 2026-06-18
**Branch:** fix/site-component-examples

## What changed

- `site/src/data/componentExamples.tsx`
  - Added a controlled/stateful example for every form/selection component using real `React.useState` wrappers.
  - Added a second curated variant example for ~47 components that previously had only a single basic example.
  - Fixed broken/misleading examples:
    - `Toast` now uses `ToastProvider` + `useToast()` instead of `alert()`.
    - `Menu` now passes a real `trigger`.
    - `Stack` now shows horizontal and vertical examples with matching titles.
    - `Tooltip` switched from non-existent `placement` to `position`; added `trigger` examples.
    - `AudioWaveform` switched from non-existent `active` to `isActive`; added size variants.
    - `ToolCallCard` switched from the wrong `tool` shape to `toolName`/`args`/`status`; added success example.
    - `Collapsible` switched from non-existent `title` to `trigger`; added `defaultOpen` example.
    - `Stepper` switched from non-existent `current` to `activeStep`; added vertical example.
- `site/src/data/exampleCode.json` regenerated via `node scripts/extract-example-code.js`.
- Fixed `site/src/components/ComponentDemo.tsx` to use the correct `Tabs` callback prop `onTabChange` instead of `onChange`, making example tabs switchable.
- Added automation scripts:
  - `scripts/apply-example-additions.js` — applies the JSON config, controlled components, import additions, and replacements.
  - `scripts/example-additions.json` — the curated additions config.
  - `scripts/verify-example-variants.js` — Playwright screenshot + console-error verification.

## Verification

- `npm run build:site` succeeds.
- Playwright verified that tabs now switch correctly across `Switch`, `Button`, `Toast`, `Menu`, `Stack`, `Tooltip`, `Stepper`, and `ToolCallCard`.
- Playwright verification found **zero console/page errors** after the final fix.
- Screenshot files saved as `site-verify-*.png` in the repo root.

## Known limitations / follow-up

- The multi-agent workflow to generate the JSON config did not return output, so the config was written manually. The script can be reused with a future agent-generated config.
- A few components (e.g., `CommandPalette`, `Tour`, `RSC`) did not receive additional variants in this pass.
