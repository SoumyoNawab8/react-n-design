import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '../src/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'react-n-design/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
};
export default meta;

const InteractiveCheckbox = (args: any) => {
  const [isChecked, setIsChecked] = useState(args.checked || false);
  return <Checkbox {...args} checked={isChecked} onChange={setIsChecked} />;
};

export const Default: StoryObj<typeof Checkbox> = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    checked: false,
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    checked: true,
    label: 'Checked checkbox',
  },
};

export const Indeterminate: StoryObj<typeof Checkbox> = {
  render: (args) => <Checkbox {...args} />,
  args: {
    checked: true,
    indeterminate: true,
    label: 'Indeterminate checkbox',
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => <Checkbox {...args} />,
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled checkbox',
  },
};

export const WithLabel: StoryObj<typeof Checkbox> = {
  render: (args) => <InteractiveCheckbox {...args} />,
  args: {
    label: 'Accept terms and conditions',
  },
};

export const CheckboxGroup: StoryObj<typeof Checkbox> = {
  render: () => {
    const [selections, setSelections] = useState<Record<string, boolean>>({
      option1: false,
      option2: true,
      option3: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          name="group"
          value="option1"
          label="Option 1"
          checked={selections.option1}
          onChange={(checked) => setSelections((prev) => ({ ...prev, option1: checked }))}
        />
        <Checkbox
          name="group"
          value="option2"
          label="Option 2"
          checked={selections.option2}
          onChange={(checked) => setSelections((prev) => ({ ...prev, option2: checked }))}
        />
        <Checkbox
          name="group"
          value="option3"
          label="Option 3"
          checked={selections.option3}
          onChange={(checked) => setSelections((prev) => ({ ...prev, option3: checked }))}
        />
      </div>
    );
  },
};
