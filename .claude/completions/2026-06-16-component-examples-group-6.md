# Component Examples Group 6

## Task
Generate one additional Example object for each component in group 6 for the react-n-design documentation site.

## Components covered
- ScrollArea
- Segmented
- Slider
- Statistic
- Steps
- StreamingText
- SuggestionChips

## Work performed
- Read existing examples in `site/src/data/componentExamples.tsx`.
- Read component prop definitions from `site/src/data/componentProps.json` and source files under `src/components/<Name>/<Name>.tsx`.
- Verified valid props and avoided invented props.
- Produced controlled examples for Segmented and Slider using the required `Controlled<Name>Example` pattern.
- Produced variant examples for the remaining components:
  - ScrollArea: horizontal scrolling
  - Statistic: trend indicators + precision
  - Steps: vertical layout
  - StreamingText: Markdown rendering
  - SuggestionChips: typed suggestions with bulk actions

## Output
Returned a JSON object with a single `additions` key mapping each component name to an array containing exactly one Example object.
