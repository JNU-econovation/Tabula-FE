import Loading from '@/components/common/Loading/Loading';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'common/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'progressbar',
    text: 'Loading...',
    percent: 50,
  },
};
