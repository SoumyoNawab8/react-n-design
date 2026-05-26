import type { Meta, StoryObj } from '@storybook/react';
import { FaArrowUp, FaDownload, FaEdit, FaPlus, FaShare, FaTrash } from 'react-icons/fa';
import { FloatButton } from '../src/components/FloatButton';

const meta: Meta<typeof FloatButton> = {
  title: 'react-n-design/FloatButton',
  component: FloatButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'The icon to display inside the button (ReactNode)',
    },
    onClick: {
      description: 'Callback function when button is clicked (without menu)',
    },
    menu: {
      description: 'Array of menu items to display when button is clicked',
    },
    position: {
      control: 'radio',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Position of the floating button on the screen',
    },
    tooltip: {
      control: 'text',
      description: 'Accessibility label for the button',
    },
  },
};
export default meta;
type Story = StoryObj<typeof FloatButton>;

export const Default: Story = {
  args: {
    icon: <FaPlus />,
    tooltip: 'Add item',
  },
};

export const WithMenu: Story = {
  args: {
    icon: <FaPlus />,
    tooltip: 'Add new',
    menu: [
      {
        icon: <FaEdit />,
        label: 'Write',
        onClick: () => console.log('Write clicked'),
      },
      {
        icon: <FaShare />,
        label: 'Share',
        onClick: () => console.log('Share clicked'),
      },
      {
        icon: <FaDownload />,
        label: 'Download',
        onClick: () => console.log('Download clicked'),
      },
    ],
  },
};

export const BottomLeftPosition: Story = {
  args: {
    icon: <FaArrowUp />,
    position: 'bottom-left',
    tooltip: 'Scroll to top',
  },
};

export const TopRightPosition: Story = {
  args: {
    icon: <FaEdit />,
    position: 'top-right',
    tooltip: 'Edit',
  },
};

export const TopLeftPosition: Story = {
  args: {
    icon: <FaTrash />,
    position: 'top-left',
    tooltip: 'Delete',
  },
};

export const MenuWithDisabledItems: Story = {
  args: {
    icon: <FaPlus />,
    tooltip: 'Actions',
    menu: [
      {
        icon: <FaEdit />,
        label: 'Edit',
        onClick: () => console.log('Edit clicked'),
      },
      {
        icon: <FaTrash />,
        label: 'Delete',
        onClick: () => console.log('Delete clicked'),
        disabled: true,
      },
      {
        icon: <FaShare />,
        label: 'Share',
        onClick: () => console.log('Share clicked'),
      },
    ],
  },
};
