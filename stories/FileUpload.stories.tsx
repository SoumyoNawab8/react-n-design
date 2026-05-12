import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../src/components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'react-n-design/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div>
        <FileUpload {...args} onFilesChange={setFiles} />
        {files.length > 0 && (
          <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    );
  },
  args: {},
};

export const Multiple: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div>
        <FileUpload {...args} onFilesChange={setFiles} />
        {files.length > 0 && (
          <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    );
  },
  args: {
    multiple: true,
  },
};

export const WithAccept: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div>
        <FileUpload {...args} onFilesChange={setFiles} />
        {files.length > 0 && (
          <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    );
  },
  args: {
    accept: 'image/*,.pdf',
    multiple: true,
  },
};

export const WithMaxSize: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <div>
        <FileUpload {...args} onFilesChange={setFiles} />
        {files.length > 0 && (
          <p style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            {files.length} file{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    );
  },
  args: {
    multiple: true,
    maxSize: 1024 * 1024, // 1 MB
  },
};

export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});

    const handleFilesChange = (newFiles: File[]) => {
      setFiles(newFiles);
      const initial: Record<string, number> = {};
      newFiles.forEach((f) => (initial[f.name] = 0));
      setProgress(initial);

      // Simulate upload progress
      newFiles.forEach((f) => {
        let p = 0;
        const interval = setInterval(() => {
          p += Math.random() * 20;
          if (p >= 100) {
            p = 100;
            clearInterval(interval);
          }
          setProgress((prev) => ({ ...prev, [f.name]: Math.min(100, Math.round(p)) }));
        }, 400);
      });
    };

    return (
      <div>
        <FileUpload multiple onFilesChange={handleFilesChange} uploadProgress={progress} />
      </div>
    );
  },
};
