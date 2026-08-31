# Site Fix TODO

## Critical — Page Breakers
- [x] MultiSelect component page no longer throws a runtime error (loads and renders)
- [x] Resizable component page no longer throws a runtime error (loads and renders)

## Missing Examples — Need Curated Examples For
- [x] Accordion — added curated example with `items` prop
- [x] MultiSelect — example exists and page loads
- [x] Resizable — example exists and page loads
- [x] ColorPicker — added curated example
- [x] FileUpload — added curated example
- [x] ComboBox — added curated example
- [x] VirtualList — added curated example
- [x] OrgChart — added curated example
- [x] GanttChart — added curated example
- [x] GradientBorder — added curated example
- [x] ImageGallery — added curated example
- [x] AudioWaveform — added curated example
- [x] AvatarGroup — added curated example
- [x] RichTextEditor — added curated example
- [x] PinInput — added curated example
- [x] SkipToContent — added curated example
- [x] VisuallyHidden — added curated example
- [x] RSC — added code-only example explaining the `/rsc` entry point
- [x] AIThinking — added curated example
- [x] ThinkingBlock — added curated example
- [x] StreamingText — added curated example
- [x] ToolCallCard — added curated example
- [x] Stepper — added curated example
- [x] Menu — added curated example
- [x] ModelSelector — added curated example
- [x] PromptBuilder — added curated example
- [x] ChartLine / ChartArea — examples exist under the `Charts` entry

## Landing Page — Preview Section Fixes
- [x] Preview cards spacing improved and demo cards use consistent sizing
- [x] Card preview text fixed: "Neomorphic card" / "Subtle shadows & soft UI" now on separate lines
- [x] Modal preview button label fixed: "Open" (label below remains "Modal")
- [x] Toast preview button label fixed: "Trigger" (label below remains "Toast")
- [x] Tabs preview text color fixed to use theme `text` color for dark-mode readability
- [x] Table preview uses small bordered table and fits the card width
- [x] Badge preview placeholder uses theme-aware contrast in both modes
- [x] Preview section background now adapts to light/dark mode

## Visual Polish
- [x] ComponentDemo card padding reduced from 32px to 24px with smaller min-height
- [x] "View Code" button made smaller, subtler, and transparent
- [x] Sticky header no longer overlaps page titles (per-page top padding added)
- [x] Hero pulled flush to top of viewport; text wrapped in a glassmorphic card
- [x] 3D hero shapes repositioned so they don't overlap the title card

## Bugs Fixed
- [x] Fixed `Tooltip is not defined` import error in `componentExamples.tsx`
- [x] Refactored all stateful examples (Modal, Drawer, CommandPalette, Tour) into real components so hooks run at top level
- [x] Fixed `ThinkingBlock` and `Text` imports in `componentExamples.tsx`

## Source Code Loading
- [x] Removed broken "Source Code" section that showed "Failed to load source code"

## Done
- [x] Build passes
- [x] 88/88 component pages have curated examples and load without JS errors
- [x] Props tables render with real TypeScript data
- [x] View Code toggle works for curated examples
- [x] Removed broken Source Code section
