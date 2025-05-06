import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isLogin: true,
    username: '홍길동',
  },
};
