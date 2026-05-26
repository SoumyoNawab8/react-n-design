import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, waitFor, screen } from '@storybook/test';
import { useState } from 'react';
import { FiInfo, FiCheckCircle, FiAlertCircle, FiSettings } from 'react-icons/fi';
import { Accordion, type AccordionItemProps } from '../src/components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'React-N-Design/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { 
      control: 'boolean',
      description: 'Allow multiple panels to be expanded simultaneously',
    },
    bordered: { 
      control: 'boolean',
      description: 'Show borders around accordion items',
    },
    defaultActiveKey: { 
      control: false,
      description: 'Initially active panel(s)',
    },
    activeKey: { 
      control: false,
      description: 'Controlled active panel(s)',
    },
    onChange: { 
      action: 'onChange',
      description: 'Callback when active panel(s) change',
    },
    items: {
      control: false,
      description: 'Array of accordion items',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A vertically stacked set of interactive headers used to reveal or hide content. Supports keyboard navigation (Arrow keys, Home, End, Enter, Space) and accessibility features.',
      },
    },
  },
};
export default meta;

const sampleItems: AccordionItemProps[] = [
  {
    key: '1',
    label: 'Getting Started',
    children: 'Welcome to React-N-Design! This accordion component provides a clean way to organize content into collapsible sections. It supports single and multiple expansion modes, keyboard navigation, and full accessibility compliance.',
  },
  {
    key: '2',
    label: 'Features',
    children: 'The accordion includes features like: smooth animations using Framer Motion, full keyboard accessibility, ARIA attributes for screen readers, disabled panel support, custom icons, and both bordered and borderless styles.',
  },
  {
    key: '3',
    label: 'Disabled Panel',
    children: 'This content will not be visible as the panel is disabled. Use the disabled property to prevent access to specific sections.',
    disabled: true,
  },
  {
    key: '4',
    label: 'Advanced Usage',
    children: 'You can control the accordion externally using the activeKey prop, handle changes with onChange callback, and customize the appearance with the bordered prop. The component is fully typed with TypeScript generics.',
  },
];

export const Default: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
    bordered: true,
    allowMultiple: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstHeader = canvas.getByRole('tab', { name: /getting started/i });
    
    // Verify initial state - first panel is open
    await waitFor(() => {
      expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
      expect(canvas.getByText(/welcome to react-n-design/i)).toBeVisible();
    });

    // Click second panel
    await userEvent.click(canvas.getByRole('tab', { name: /features/i }));
    await waitFor(() => {
      expect(firstHeader).toHaveAttribute('aria-expanded', 'false');
      expect(canvas.getByRole('tab', { name: /features/i })).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

export const AllowMultiple: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    defaultActiveKey: ['1', '2'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple panels can be expanded at once when allowMultiple is set to true.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Verify two panels are open
    await waitFor(() => {
      const panels = canvas.getAllByRole('tabpanel');
      expect(panels.length).toBe(2);
      expect(canvas.getByText(/welcome to react-n-design/i)).toBeVisible();
      expect(canvas.getByText(/the accordion includes features/i)).toBeVisible();
    });

    // Open a third panel
    await userEvent.click(canvas.getByRole('tab', { name: /advanced usage/i }));
    await waitFor(() => {
      const panels = canvas.getAllByRole('tabpanel');
      expect(panels.length).toBe(3);
    });
  },
};

export const Borderless: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    bordered: false,
    defaultActiveKey: '2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Remove borders for a cleaner look by setting bordered to false.',
      },
    },
  },
};

export const AllDisabled: StoryObj<typeof Accordion> = {
  args: {
    items: [
      { key: '1', label: 'Disabled Item 1', children: 'Content 1', disabled: true },
      { key: '2', label: 'Disabled Item 2', children: 'Content 2', disabled: true },
      { key: '3', label: 'Disabled Item 3', children: 'Content 3', disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'All panels can be disabled. Disabled panels cannot be expanded and are skipped during keyboard navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // All headers should be disabled
    const headers = canvas.getAllByRole('tab');
    headers.forEach((header) => {
      expect(header).toHaveAttribute('aria-disabled', 'true');
      expect(header).toHaveAttribute('tabIndex', '-1');
    });

    // No panels should be visible
    expect(canvas.queryByRole('tabpanel')).not.toBeInTheDocument();
    
    // Click should do nothing
    await userEvent.click(headers[0]);
    expect(canvas.queryByRole('tabpanel')).not.toBeInTheDocument();
  },
};

export const WithCustomIcons: StoryObj<typeof Accordion> = {
  args: {
    items: [
      {
        key: '1',
        label: 'Success Status',
        children: 'This panel uses a custom checkmark icon to indicate success.',
        icon: <FiCheckCircle style={{ color: '#52c41a' }} />,
      },
      {
        key: '2',
        label: 'Alert Status',
        children: 'This panel uses an alert icon for warnings and important information.',
        icon: <FiAlertCircle style={{ color: '#faad14' }} />,
      },
      {
        key: '3',
        label: 'Info Status',
        children: 'This panel uses an info icon for general information.',
        icon: <FiInfo style={{ color: '#1890ff' }} />,
      },
      {
        key: '4',
        label: 'Settings',
        children: 'You can use any custom icon component as the panel indicator.',
        icon: <FiSettings />,
      },
    ],
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Each accordion item can have a custom icon that rotates 90 degrees when expanded.',
      },
    },
  },
};

export const Controlled: StoryObj<typeof Accordion> = {
  render: function ControlledAccordion() {
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    const handleChange = (keys: string | string[]) => {
      console.log('Accordion changed:', keys);
      setActiveKeys(keys as string[]);
    };

    return (
      <div>
        <p style={{ marginBottom: '16px' }}>
          <strong>Active Panels:</strong> {activeKeys.length > 0 ? activeKeys.join(', ') : 'None'}
        </p>
        <div style={{ marginBottom: '16px' }}>
          <button 
            onClick={() => setActiveKeys(['1', '2', '3', '4'])}
            style={{ marginRight: '8px' }}
          >
            Expand All
          </button>
          <button 
            onClick={() => setActiveKeys([])}
          >
            Collapse All
          </button>
        </div>
        <Accordion
          items={sampleItems}
          activeKey={activeKeys}
          onChange={handleChange}
          allowMultiple
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'The accordion can be controlled externally using the activeKey prop. This allows external controls to expand or collapse panels.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Initially one panel open
    await waitFor(() => {
      expect(canvas.getByRole('tabpanel')).toBeInTheDocument();
    });

    // Click Expand All
    await userEvent.click(canvas.getByText('Expand All'));
    await waitFor(() => {
      const panels = canvas.getAllByRole('tabpanel');
      expect(panels.length).toBe(4);
    });

    // Click Collapse All
    await userEvent.click(canvas.getByText('Collapse All'));
    await waitFor(() => {
      expect(canvas.queryByRole('tabpanel')).not.toBeInTheDocument();
    });
  },
};

export const NestedContent: StoryObj<typeof Accordion> = {
  args: {
    items: [
      {
        key: '1',
        label: 'Panel with Rich Content',
        children: (
          <div>
            <h4>Subsections</h4>
            <ul>
              <li>Feature description 1</li>
              <li>Feature description 2</li>
              <li>Feature description 3</li>
            </ul>
            <p>Accordion panels can contain any React elements, not just text. This includes lists, links, and other components.</p>
          </div>
        ),
      },
      {
        key: '2',
        label: 'Panel with Table',
        children: (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Feature</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Supported</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Keyboard Navigation</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>✓ Yes</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Screen Reader</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>✓ Yes</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Animations</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>✓ Yes</td>
              </tr>
            </tbody>
          </table>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion panels support rich HTML content including lists, tables, and other components.',
      },
    },
  },
};

export const KeyboardNavigation: StoryObj<typeof Accordion> = {
  args: {
    items: [
      { key: '1', label: 'First Panel', children: 'Content 1' },
      { key: '2', label: 'Second Panel', children: 'Content 2' },
      { key: '3', label: 'Third Panel', children: 'Content 3', disabled: true },
      { key: '4', label: 'Fourth Panel', children: 'Content 4' },
    ],
    defaultActiveKey: '1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use Arrow Up/Down or Arrow Left/Right to navigate between panels. Home jumps to the first panel, End to the last. Enter or Space toggles the current panel. Disabled panels are skipped during navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Focus first header
    const firstHeader = canvas.getByRole('tab', { name: /first panel/i });
    firstHeader.focus();
    expect(firstHeader).toHaveFocus();

    // Navigate with ArrowDown
    await userEvent.keyboard('{ArrowDown}');
    const secondHeader = canvas.getByRole('tab', { name: /second panel/i });
    expect(secondHeader).toHaveFocus();

    // ArrowDown should skip disabled and go to fourth
    await userEvent.keyboard('{ArrowDown}');
    const fourthHeader = canvas.getByRole('tab', { name: /fourth panel/i });
    expect(fourthHeader).toHaveFocus();

    // Test Home key
    await userEvent.keyboard('{Home}');
    expect(firstHeader).toHaveFocus();

    // Test End key
    await userEvent.keyboard('{End}');
    expect(fourthHeader).toHaveFocus();

    // Toggle with Enter
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByText('Content 4')).toBeInTheDocument();
    });
  },
};

export const ManyItems: StoryObj<typeof Accordion> = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      key: String(i + 1),
      label: `Accordion Item ${i + 1}`,
      children: `This is the detailed content for item ${i + 1}. It could contain any information relevant to this section. The accordion component handles long lists gracefully, maintaining keyboard navigation across all items.`,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance and scrolling behavior with many accordion items.',
      },
    },
  },
};

export const Responsive: StoryObj<typeof Accordion> = {
  args: {
    items: [
      {
        key: '1',
        label: 'Mobile Optimized',
        children: 'The accordion adapts to different screen sizes. On mobile devices, touch targets are large enough for comfortable interaction. The text sizes and spacing adjust appropriately.',
      },
      {
        key: '2',
        label: 'Tablet Optimized',
        children: 'On tablets, the accordion makes use of the extra width while maintaining readability.',
      },
      {
        key: '3',
        label: 'Desktop Optimized',
        children: 'On desktop screens, the accordion maintains the same functionality with optimized spacing for larger displays.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Resize your browser to see how the accordion responds to different viewport sizes.',
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
