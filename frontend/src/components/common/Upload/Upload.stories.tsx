import Upload from '@/components/common/Upload/Upload';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'common/Upload',
  component: Upload,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],

  args: {},
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    height: 'md',
    width: 'md',
    processFile: (file: File) => {
      console.log('Processing file:', file);
    },
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('File selected:', e.target.files);
    },
  },
};
