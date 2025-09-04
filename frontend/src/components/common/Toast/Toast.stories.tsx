import { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";
import { useToastStore } from "@/stores/toastStore";

type ToastArgs = {
  text: string;
  type: 'error' | 'default';
  sec: number;
};

const meta: Meta<ToastArgs> = {
  title: 'common/Toast',
  component: Toast,
  parameters: {
    layout: '',
    docs: {
      story: {
        inline: false,
        iframeHeight: 300,
      }
    }
  },
  tags: ['autodocs'],
  args:{
    text: '부정확한 이미지입니다. 다시 촬영 후 첨부해주세요!',
    type: 'error',
    sec: 3,
  },
  argTypes: {
    text: { control: 'text', description: 'Toast 메세지' },
    type: {
      control: 'radio',
      options: ['error', 'default'],
      description: 'Toast 타입'
    },
    sec: {
      control: 'number',
      description: 'Toast 지속 시간 (초)'
    }
  },
  render: (args) => {
    const addToast = useToastStore.getState().addToast;

    const duration = args.sec ?? 3;

    return (
      <div className="space-y-2">
        <button
          onClick={() => addToast(args.text, args.sec, args.type)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
            토스트 생성
        </button>
        <Toast />
      </div>
    )

  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    text: '부정확한 이미지입니다. 다시 촬영 후 첨부해주세요!',
    type: 'error',
    sec: 3,
  }
};

export const Default: Story = {
  args: {
    text: '전달할 메세지입니다.',
    type: 'default',
    sec: 5,
  }
}