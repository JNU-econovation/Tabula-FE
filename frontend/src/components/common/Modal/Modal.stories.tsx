import Modal from '@/components/common/Modal/Modal';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'common/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    close: () => {},
    size: 'md',
    color: 'white',
    children: (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Modal Title</h1>
        <p className="mt-2 text-gray-600">This is a modal description.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    ),
  },
};
