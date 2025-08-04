import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input as InputCompo } from '../src/components/Input';
import { FaUser, FaAt, FaSearch } from 'react-icons/fa';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Input> = {
  title: 'react-n-design/Input',
  component: InputCompo,
  tags: ['autodocs'],
};
export default meta;

const Input = (args: any) => {
  const [value, setValue] = useState(args.defaultValue || '');
  return <InputCompo {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: { placeholder: 'Enter text...' },
};

export const WithPrefixAndSuffix: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    prefix: <FaUser />,
    suffix: <FaAt />,
    placeholder: 'Username',
  },
};

export const WithAddons: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    addonBefore: 'https://',
    addonAfter: '.com',
    defaultValue: 'mysite',
  },
};

export const PasswordInput: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const WithClearButton: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    allowClear: true,
    placeholder: 'Text here will be clearable',
  },
};

export const SearchBox: StoryObj<typeof Input> = {
  render: (args) => <Input {...args} />,
  args: {
    addonAfter: <Button shape="circle" leftIcon={<FaSearch />} aria-label="Search" />,
    placeholder: 'Search...',
    allowClear: true,
  },
};