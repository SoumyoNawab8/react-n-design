# Remove Duplicate Component Examples

**Date:** 2026-07-02

## Goal
Check for all duplicate component examples in the site example data and remove them.

## What was done
- Scanned `site/src/data/componentExamples.tsx` (the canonical example source) and the derived `site/src/data/exampleCode.json`.
- Detected duplicates by matching `title + description + render` after whitespace normalization.
- Found exactly one duplicate example: **"Disabled Weekends"** using `<ControlledCalendarExample />` appeared in both the `DatePicker` and `Calendar` arrays.
- Removed the duplicate entry from the `DatePicker` array in `site/src/data/componentExamples.tsx`.
- Regenerated `site/src/data/exampleCode.json` by running `node scripts/extract-example-code.js`.
- Verified no duplicate examples remain.

## Files changed
- `site/src/data/componentExamples.tsx`
- `site/src/data/exampleCode.json`

## Notes
- `site/src/data/` is currently untracked in git, so no staging or commit was performed.
- The site directory has pre-existing TypeScript errors that are unrelated to this change.
