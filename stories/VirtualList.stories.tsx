import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from '../src/components/VirtualList';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';

const meta: Meta<typeof VirtualList> = {
  title: 'react-n-design/VirtualList',
  component: VirtualList,
  tags: ['autodocs'],
  argTypes: {
    containerHeight: { control: 'number' },
    itemHeight: { control: 'number' },
    overscan: { control: 'number' },
  },
};
export default meta;

const LARGE_DATASET = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  description: `This is the description for item number ${i + 1}.`,
}));

interface DemoItem {
  id: number;
  title: string;
  description: string;
}

const renderItem = (item: DemoItem) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      height: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}
  >
    <span style={{ fontWeight: 600, marginRight: 12 }}>{item.id + 1}.</span>
    <div>
      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{item.description}</div>
    </div>
  </div>
);

export const Default: StoryObj<typeof VirtualList> = {
  args: {
    items: LARGE_DATASET,
    itemHeight: 56,
    containerHeight: 400,
    overscan: 3,
    renderItem,
  },
};

const SECTIONS = [
  { title: 'Favorites', count: 15 },
  { title: 'Recent', count: 25 },
  { title: 'All Items', count: 200 },
  { title: 'Archive', count: 100 },
];

const STICKY_ITEMS = SECTIONS.flatMap((section) =>
  Array.from({ length: section.count }, (_, i) => ({
    section: section.title,
    label: `${section.title} ${i + 1}`,
  }))
);

const STICKY_HEADERS = SECTIONS.reduce((acc, section, idx) => {
  const index = SECTIONS.slice(0, idx).reduce((sum, s) => sum + s.count, 0);
  acc.push({ index, height: 44 });
  return acc;
}, [] as { index: number; height: number }[]);

export const WithStickyHeaders: StoryObj<typeof VirtualList> = {
  args: {
    items: STICKY_ITEMS,
    itemHeight: 44,
    containerHeight: 400,
    overscan: 3,
    stickyHeaders: STICKY_HEADERS,
    renderItem: (item: { section: string; label: string }, index: number) => {
      const isHeader = STICKY_HEADERS.some((h) => h.index === index);
      if (isHeader) {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              height: '100%',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.5px',
              background: 'rgba(109, 93, 252, 0.1)',
              color: '#6d5dfc',
            }}
          >
            {item.section}
          </div>
        );
      }
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            height: '100%',
            fontSize: 14,
            borderBottom: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {item.label}
        </div>
      );
    },
  },
};

export const InfiniteScrollPattern: StoryObj<typeof VirtualList> = {
  render: () => {
    const [items, setItems] = useState(() =>
      Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)
    );
    const [loading, setLoading] = useState(false);

    const handleScroll = useCallback(
      (scrollTop: number) => {
        const totalHeight = items.length * 40;
        const containerHeight = 300;
        if (scrollTop + containerHeight >= totalHeight - 200 && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: 30 }, (_, i) =>
                `Item ${prev.length + i + 1}`
              ),
            ]);
            setLoading(false);
          }, 800);
        }
      },
      [items.length, loading]
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <VirtualList
          items={items}
          itemHeight={40}
          containerHeight={300}
          overscan={3}
          onScroll={handleScroll}
          renderItem={(item: string) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                height: '100%',
                fontSize: 14,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {item}
            </div>
          )}
        />
        {loading && (
          <Card
            style={{
              textAlign: 'center',
              padding: 12,
              fontSize: 13,
              opacity: 0.7,
            }}
          >
            Loading more...
          </Card>
        )}
      </div>
    );
  },
};
