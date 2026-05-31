import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { ToastProvider } from '../src/components/Toast/ToastProvider';
import { useToast } from '../src/components/Toast/useToast';
import { FaBell, FaCode, FaUser } from '../src/icons';

const meta: Meta<typeof ToastProvider> = {
  title: 'react-n-design/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'radio',
      options: [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ],
    },
    maxToasts: { control: 'number' },
    isStacked: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

const ToastDemo = () => {
  const { success, error, warning, info, promise, dismissAll, glass, user } = useToast();

  const handlePromise = () => {
    const fakePromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data saved!'), 2000);
    });
    promise(fakePromise, {
      loading: 'Saving...',
      success: (data) => `Success: ${data}`,
      error: 'Something went wrong',
    });
  };

  const sparkMultipleToasts = () => {
    setTimeout(() => info('First toast!'), 0);
    setTimeout(() => success('Second toast!'), 300);
    setTimeout(() => warning('Third toast!'), 600);
    setTimeout(() => error('Fourth toast!'), 900);
    setTimeout(() => info('Fifth toast!', { isGlass: true }), 1200);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}
    >
      <h3>Basic Variants</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => success('Changes saved successfully')}>Success</Button>
        <Button onClick={() => error('Something went wrong')}>Error</Button>
        <Button onClick={() => warning('Please review your input')}>Warning</Button>
        <Button onClick={() => info('New update available')}>Info</Button>
      </div>

      <h3>Features</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={handlePromise}>Promise Toast</Button>
        <Button variant="secondary" onClick={sparkMultipleToasts}>
          Multiple Toasts
        </Button>
      </div>

      <h3>New v1.2.0 Features</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          onClick={() =>
            glass({
              title: 'Glass Effect',
              description: 'Modern glass morphism design with blur effect',
              variant: 'info',
            })
          }
        >
          Glass Toast
        </Button>
        <Button
          onClick={() =>
            user(
              'Sarah commented on your post',
              { initials: 'SM' },
              { description: 'Check out what they said!' }
            )
          }
        >
          User Notification
        </Button>
        <Button
          onClick={() =>
            glass({
              title: 'Glass Success',
              description: 'Glass effect works with any variant',
              variant: 'success',
            })
          }
        >
          Glass Success
        </Button>
        <Button variant="secondary" onClick={dismissAll}>
          Dismiss All
        </Button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 5,
    isStacked: false,
  },
};

export const Stacked: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 5,
    isStacked: true,
  },
};

export const TopCenter: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-center',
    maxToasts: 5,
    isStacked: false,
  },
};

export const GlassVariant: Story = {
  render: () => {
    const GlassDemo = () => {
      const { glass, info } = useToast();
      return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            onClick={() =>
              glass({
                title: 'Glass Effect',
                description: 'Beautiful glass morphism with blur',
                variant: 'info',
              })
            }
          >
            Info Glass
          </Button>
          <Button
            onClick={() =>
              glass({
                title: 'Success!',
                description: 'Glass effect with success styling',
                variant: 'success',
              })
            }
          >
            Success Glass
          </Button>
          <Button
            onClick={() =>
              glass({
                title: 'Warning',
                description: 'Glass effect with warning variant',
                variant: 'warning',
              })
            }
          >
            Warning Glass
          </Button>
          <Button
            onClick={() =>
              glass({
                title: 'Error!',
                description: 'Glass effect with error styling',
                variant: 'error',
              })
            }
          >
            Error Glass
          </Button>
        </div>
      );
    };

    return (
      <ToastProvider position="top-right" maxToasts={5}>
        <GlassDemo />
      </ToastProvider>
    );
  },
};

export const AvatarNotifications: Story = {
  render: () => {
    const AvatarDemo = () => {
      const { user } = useToast();
      return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            onClick={() =>
              user(
                'John Doe mentioned you',
                { initials: 'JD' },
                { description: 'Hey, check out this new feature!' }
              )
            }
          >
            Initials Avatar
          </Button>
          <Button
            onClick={() =>
              user(
                'System notification',
                { src: '/logo.svg', alt: 'System' },
                { description: 'Maintenance scheduled for tonight', variant: 'warning' }
              )
            }
          >
            Image Avatar
          </Button>
          <Button
            onClick={() =>
              user(
                'New follower',
                { initials: 'UF' },
                { description: 'User123 started following you', variant: 'success' }
              )
            }
          >
            Success Avatar
          </Button>
        </div>
      );
    };

    return (
      <ToastProvider position="top-right" maxToasts={5}>
        <AvatarDemo />
      </ToastProvider>
    );
  },
};

export const RichContent: Story = {
  render: () => {
    const RichDemo = () => {
      const { info, glass } = useToast();
      return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            onClick={() =>
              info('New comment', {
                description: 'Sarah commented on your post',
                richContent: (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '8px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                    }}
                  >
                    This is amazing! Great work! 🤩
                  </div>
                ),
              })
            }
          >
            With Rich Content
          </Button>
          <Button
            onClick={() =>
              info('Deployment Complete', {
                description: 'Your app is live at https://example.app',
                meta: (
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    <FaCode style={{ marginRight: '4px' }}></FaCode>2 minutes ago
                  </span>
                ),
              })
            }
          >
            With Meta
          </Button>
          <Button
            onClick={() =>
              glass({
                title: 'Code Review Request',
                description: 'Pull request #42 needs your review',
                variant: 'info',
                meta: <span>From @dev-team</span>,
                richContent: (
                  <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                    feature/user-auth
                  </div>
                ),
              })
            }
          >
            Complex Example
          </Button>
        </div>
      );
    };

    return (
      <ToastProvider position="top-right" maxToasts={5}>
        <RichDemo />
      </ToastProvider>
    );
  },
};

export const MobileSwipeDemo: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => {
    const MobileDemo = () => {
      const { success, info } = useToast();
      return (
        <div style={{ padding: '20px' }}>
          <p>This demo is optimized for mobile. Swipe left/right on toasts to dismiss.</p>
          <Button onClick={() => success('Try swiping me!')} style={{ marginBottom: '8px' }} block>
            Show Toast (Swipe to Dismiss)
          </Button>
        </div>
      );
    };

    return (
      <ToastProvider position="top-center">
        <MobileDemo />
      </ToastProvider>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const CustomDemo = () => {
      const { success, error } = useToast();
      return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            onClick={() =>
              success('Custom styled toast', {
                style: { border: '3px solid #28a745', boxShadow: '0 0 20px #28a74550' },
              })
            }
          >
            Custom Style
          </Button>
          <Button
            onClick={() =>
              error('With custom class', {
                className: 'my-custom-toast',
              })
            }
          >
            Custom Class
          </Button>
        </div>
      );
    };

    return (
      <ToastProvider position="top-right" maxToasts={5}>
        <CustomDemo />
      </ToastProvider>
    );
  },
};
