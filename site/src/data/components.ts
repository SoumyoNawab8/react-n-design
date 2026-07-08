export interface ComponentMeta {
  name: string;
  description: string;
  category: string;
}

export interface ComponentCategory {
  name: string;
  components: ComponentMeta[];
}

export const componentCategories: ComponentCategory[] = [
  {
    name: 'Layout',
    components: [
      { name: 'Accordion', description: 'Collapsible content panels.', category: 'Layout' },
      { name: 'Card', description: 'Flexible container with neomorphic styling.', category: 'Layout' },
      { name: 'Grid', description: 'Responsive grid system.', category: 'Layout' },
      { name: 'Stack', description: 'Vertical and horizontal stacking.', category: 'Layout' },
      { name: 'Divider', description: 'Visual content separator.', category: 'Layout' },
      { name: 'ScrollArea', description: 'Custom scrollable container.', category: 'Layout' },
      { name: 'Resizable', description: 'Drag-to-resize panels.', category: 'Layout' },
    ],
  },
  {
    name: 'Data Entry',
    components: [
      { name: 'Button', description: 'Primary interaction element.', category: 'Data Entry' },
      { name: 'Input', description: 'Text input field.', category: 'Data Entry' },
      { name: 'Select', description: 'Dropdown selection.', category: 'Data Entry' },
      { name: 'Checkbox', description: 'Binary choice input.', category: 'Data Entry' },
      { name: 'RadioGroup', description: 'Single-choice group.', category: 'Data Entry' },
      { name: 'Switch', description: 'Toggle switch.', category: 'Data Entry' },
      { name: 'Slider', description: 'Range value picker.', category: 'Data Entry' },
      { name: 'DatePicker', description: 'Calendar date selection.', category: 'Data Entry' },
      { name: 'TimePicker', description: 'Time selection control.', category: 'Data Entry' },
      { name: 'ColorPicker', description: 'Color selection.', category: 'Data Entry' },
      { name: 'PinInput', description: 'PIN code entry.', category: 'Data Entry' },
      { name: 'OTPInput', description: 'One-time password input.', category: 'Data Entry' },
      { name: 'TextArea', description: 'Multi-line text input.', category: 'Data Entry' },
      { name: 'FileUpload', description: 'File drag-and-drop upload.', category: 'Data Entry' },
      { name: 'Rating', description: 'Star rating input.', category: 'Data Entry' },
      { name: 'ComboBox', description: 'Autocomplete dropdown.', category: 'Data Entry' },
      { name: 'MultiSelect', description: 'Multiple selection dropdown.', category: 'Data Entry' },
      { name: 'Segmented', description: 'Segmented control.', category: 'Data Entry' },
      { name: 'Toggle', description: 'On/off toggle button.', category: 'Data Entry' },
      { name: 'CopyButton', description: 'Click-to-copy button.', category: 'Data Entry' },
    ],
  },
  {
    name: 'Display',
    components: [
      { name: 'AudioWaveform', description: 'Audio visualization bars.', category: 'Display' },
      { name: 'Avatar', description: 'User profile image or initials.', category: 'Display' },
      { name: 'AvatarGroup', description: 'Grouped avatar stack.', category: 'Display' },
      { name: 'Badge', description: 'Status indicator or count.', category: 'Display' },
      { name: 'Tag', description: 'Label or category tag.', category: 'Display' },
      { name: 'Statistic', description: 'Key metric display.', category: 'Display' },
      { name: 'ProgressBar', description: 'Progress indicator.', category: 'Display' },
      { name: 'Skeleton', description: 'Loading placeholder.', category: 'Display' },
      { name: 'Empty', description: 'Empty state illustration.', category: 'Display' },
      { name: 'Timeline', description: 'Chronological event list.', category: 'Display' },
      { name: 'Tree', description: 'Hierarchical data tree.', category: 'Display' },
      { name: 'OrgChart', description: 'Organizational chart.', category: 'Display' },
      { name: 'GanttChart', description: 'Project timeline chart.', category: 'Display' },
      { name: 'KanbanBoard', description: 'Kanban task board.', category: 'Display' },
      { name: 'Table', description: 'Data table with sorting.', category: 'Display' },
      { name: 'DataGrid', description: 'Advanced data grid.', category: 'Display' },
      { name: 'VirtualList', description: 'Virtualized long lists.', category: 'Display' },
      { name: 'Charts', description: 'Line, bar, and area charts.', category: 'Display' },
      { name: 'HeatmapCalendar', description: 'Activity heatmap calendar.', category: 'Display' },
      { name: 'ImageGallery', description: 'Image carousel gallery.', category: 'Display' },
      { name: 'Carousel', description: 'Sliding content carousel.', category: 'Display' },
      { name: 'Calendar', description: 'Full calendar view.', category: 'Display' },
      { name: 'Terminal', description: 'Terminal/console output.', category: 'Display' },
      { name: 'Markdown', description: 'Markdown renderer.', category: 'Display' },
      { name: 'StreamingText', description: 'Typewriter text effect.', category: 'Display' },
      { name: 'Icon', description: 'Inline SVG icon system.', category: 'Display' },
    ],
  },
  {
    name: 'Feedback',
    components: [
      { name: 'Alert', description: 'Contextual message banner.', category: 'Feedback' },
      { name: 'Toast', description: 'Temporary notification.', category: 'Feedback' },
      { name: 'Modal', description: 'Overlay dialog.', category: 'Feedback' },
      { name: 'Drawer', description: 'Side panel overlay.', category: 'Feedback' },
      { name: 'Tooltip', description: 'Hover information popup.', category: 'Feedback' },
      { name: 'Popover', description: 'Clickable content popup.', category: 'Feedback' },
      { name: 'Tour', description: 'Guided product tour.', category: 'Feedback' },
      { name: 'Result', description: 'Success/error result page.', category: 'Feedback' },
      { name: 'AIThinking', description: 'AI thinking animation.', category: 'Feedback' },
      { name: 'ThinkingBlock', description: 'Collapsible thought process.', category: 'Feedback' },
    ],
  },
  {
    name: 'Navigation',
    components: [
      { name: 'Breadcrumbs', description: 'Path navigation.', category: 'Navigation' },
      { name: 'Tabs', description: 'Tabbed content switcher.', category: 'Navigation' },
      { name: 'Steps', description: 'Step-by-step wizard.', category: 'Navigation' },
      { name: 'Stepper', description: 'Numbered step indicator.', category: 'Navigation' },
      { name: 'Pagination', description: 'Page navigation.', category: 'Navigation' },
      { name: 'Menu', description: 'Dropdown menu.', category: 'Navigation' },
      { name: 'AppBar', description: 'Top application bar.', category: 'Navigation' },
      { name: 'CommandPalette', description: 'Keyboard-driven command search.', category: 'Navigation' },
      { name: 'FloatButton', description: 'Floating action button.', category: 'Navigation' },
      { name: 'SkipToContent', description: 'Accessibility skip link.', category: 'Navigation' },
    ],
  },
  {
    name: 'AI / Chat',
    components: [
      { name: 'AIChat', description: 'Full AI chat interface.', category: 'AI / Chat' },
      { name: 'PromptInput', description: 'AI prompt text field.', category: 'AI / Chat' },
      { name: 'PromptBuilder', description: 'Structured prompt composer.', category: 'AI / Chat' },
      { name: 'ModelSelector', description: 'LLM model picker.', category: 'AI / Chat' },
      { name: 'ToolCallCard', description: 'Tool execution card.', category: 'AI / Chat' },
      { name: 'SuggestionChips', description: 'Prompt suggestion chips.', category: 'AI / Chat' },
      { name: 'MentionInput', description: '@mention autocomplete.', category: 'AI / Chat' },
      { name: 'DiffViewer', description: 'Code diff visualization.', category: 'AI / Chat' },
    ],
  },
  {
    name: 'Other',
    components: [
      { name: 'Form', description: 'Form layout and validation.', category: 'Other' },
      { name: 'GradientBorder', description: 'Gradient border container.', category: 'Other' },
      { name: 'Collapsible', description: 'Expand/collapse content.', category: 'Other' },
      { name: 'VisuallyHidden', description: 'Screen-reader only content.', category: 'Other' },
      { name: 'CodeBlock', description: 'Syntax highlighted code.', category: 'Other' },
      { name: 'RichTextEditor', description: 'Rich text WYSIWYG editor.', category: 'Other' },
      { name: 'RSC', description: 'React Server Component helpers.', category: 'Other' },
    ],
  },
];

export const allComponents = componentCategories.flatMap((c) => c.components);
