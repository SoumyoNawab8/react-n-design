import type { Meta, StoryObj } from '@storybook/react';
import { FaCheckCircle, FaClock, FaStar, FaExclamationCircle, FaUser, FaCalendar, FaBell, FaUpload } from 'react-icons/fa';
import { Timeline } from '../src/components/Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'react-n-design/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['left', 'right', 'alternate'],
      description: 'Layout mode for positioning items',
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the order of items',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

// Basic timeline with left mode (default)
const basicItems = [
  {
    label: '2024-01-15',
    children: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Project Started</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary, #666)' }}>Initial planning and setup completed</p>
      </div>
    ),
    color: '#6d5dfc',
  },
  {
    label: '2024-01-22',
    children: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>First Milestone</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary, #666)' }}>Core functionality implemented</p>
      </div>
    ),
    color: '#38a169',
  },
  {
    label: '2024-02-10',
    children: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Review Phase</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary, #666)' }}>Code review and testing in progress</p>
      </div>
    ),
    color: '#dd6b20',
  },
  {
    label: '2024-02-28',
    children: (
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>Launch</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary, #666)' }}>Production deployment</p>
      </div>
    ),
    color: '#38a169',
  },
];

export const Basic: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    reverse: false,
  },
};

// Timeline with icons
export const WithIcons: Story = {
  args: {
    items: [
      {
        label: '09:00 AM',
        children: <div style={{ fontSize: '14px' }}>Started work day</div>,
        dot: <FaClock />,
        color: '#6d5dfc',
      },
      {
        label: '11:30 AM',
        children: <div style={{ fontSize: '14px' }}>Meeting with team</div>,
        dot: <FaUser />,
        color: '#38a169',
      },
      {
        label: '01:00 PM',
        children: <div style={{ fontSize: '14px' }}>Lunch break</div>,
        dot: <FaCalendar />,
        color: '#dd6b20',
      },
      {
        label: '05:00 PM',
        children: <div style={{ fontSize: '14px' }}>Tasks completed</div>,
        dot: <FaCheckCircle />,
        color: '#38a169',
      },
    ],
    mode: 'left',
    reverse: false,
  },
};

// Right mode timeline
export const RightMode: Story = {
  args: {
    items: basicItems,
    mode: 'right',
    reverse: false,
  },
};

// Alternate mode timeline
export const AlternateMode: Story = {
  args: {
    items: basicItems,
    mode: 'alternate',
    reverse: false,
  },
};

// Timeline with custom colors per item
export const CustomColors: Story = {
  args: {
    items: [
      {
        label: 'Order Placed',
        children: (
          <div>
            <p style={{ margin: '0 0 4px 0' }}><strong>Order #12345</strong></p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Payment confirmed</p>
          </div>
        ),
        dot: <FaCheckCircle />,
        color: '#38a169',
      },
      {
        label: 'Processing',
        children: (
          <div>
            <p style={{ margin: '0 0 4px 0' }}><strong>Packing Items</strong></p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Preparing for shipment</p>
          </div>
        ),
        dot: <FaBell />,
        color: '#dd6b20',
      },
      {
        label: 'Shipped',
        children: (
          <div>
            <p style={{ margin: '0 0 4px 0' }}><strong>On The Way</strong></p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Expected arrival: Tomorrow</p>
          </div>
        ),
        dot: <FaUpload />,
        color: '#3182ce',
      },
      {
        label: 'Delivered',
        children: (
          <div>
            <p style={{ margin: '0 0 4px 0' }}><strong>Package Arrived</strong></p>
            <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Left at front door</p>
          </div>
        ),
        dot: <FaStar />,
        color: '#38a169',
      },
    ],
    mode: 'left',
    reverse: false,
  },
};

// E-commerce order status example
export const OrderStatus: Story = {
  args: {
    items: [
      {
        label: 'Order Placed',
        children: <span style={{ fontSize: '14px' }}>Your order has been confirmed</span>,
        dot: <FaCheckCircle />,
        color: '#38a169',
      },
      {
        label: 'Processing',
        children: <span style={{ fontSize: '14px' }}>Order is being prepared</span>,
        dot: <FaClock />,
        color: '#dd6b20',
      },
      {
        label: 'Shipped',
        children: <span style={{ fontSize: '14px' }}>Order has been dispatched</span>,
        color: '#6d5dfc',
      },
      {
        label: 'Delivered',
        children: <span style={{ fontSize: '14px' }}>Package has been delivered</span>,
        color: '#38a169',
      },
    ],
    mode: 'left',
    reverse: false,
  },
};

// User activity timeline
export const UserActivity: Story = {
  args: {
    items: [
      {
        children: <div>Create new project <strong>MyAwesomeApp</strong></div>,
        label: '2 hours ago',
        color: '#3182ce',
      },
      {
        children: <div>Commented on <strong>PR #456</strong></div>,
        label: '5 hours ago',
        color: '#38a169',
      },
      {
        children: <div>Pushed to <strong>main</strong> branch</div>,
        label: 'Yesterday',
        color: '#6d5dfc',
      },
      {
        children: <div>Merged <strong>feature-branch</strong></div>,
        label: '2 days ago',
        color: '#38a169',
      },
      {
        children: <div>Deployed to <strong>production</strong></div>,
        label: '3 days ago',
        color: '#38a169',
      },
    ],
    mode: 'alternate',
    reverse: false,
  },
};

// Reversed timeline
export const Reversed: Story = {
  args: {
    items: basicItems,
    mode: 'left',
    reverse: true,
  },
};

// System notifications timeline
export const Notifications: Story = {
  args: {
    items: [
      {
        label: 'Just now',
        children: <div><strong>New login</strong> from iPhone 13 Pro</div>,
        dot: <FaUser />,
        color: '#38a169',
      },
      {
        label: '10 min ago',
        children: <div><strong>Password changed</strong> successfully</div>,
        dot: <FaBell />,
        color: '#6d5dfc',
      },
      {
        label: '1 hour ago',
        children: <div><strong>Security alert</strong> - Unusual activity detected</div>,
        dot: <FaExclamationCircle />,
        color: '#e53e3e',
      },
      {
        label: '2 hours ago',
        children: <div><strong>Backup completed</strong></div>,
        dot: <FaCheckCircle />,
        color: '#38a169',
      },
      {
        label: '1 day ago',
        children: <div><strong>Account created</strong></div>,
        dot: <FaStar />,
        color: '#38a169',
      },
    ],
    mode: 'left',
    reverse: false,
  },
};

// Alternate timeline with icons
export const AlternateWithIcons: Story = {
  args: {
    items: [
      {
        label: 'Start',
        children: <div>Project kickoff</div>,
        dot: <FaStar />,
        color: '#ffd700',
      },
      {
        label: 'Design',
        children: <div>UI/UX design phase</div>,
        dot: <FaCalendar />,
        color: '#6d5dfc',
      },
      {
        label: 'Develop',
        children: <div>Implementation</div>,
        dot: <FaClock />,
        color: '#3182ce',
      },
      {
        label: 'Test',
        children: <div>QA and testing</div>,
        dot: <FaCheckCircle />,
        color: '#38a169',
      },
      {
        label: 'Launch',
        children: <div>Go live! 🚀</div>,
        dot: <FaStar />,
        color: '#38a169',
      },
    ],
    mode: 'alternate',
    reverse: false,
  },
};
