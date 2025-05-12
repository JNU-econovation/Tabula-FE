import * as React from "react"
import { Meta, StoryObj } from "@storybook/react";
import { FaSearch } from "react-icons/fa";
import { Button } from "./Button";


const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "버튼",
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const FilledGradientButton: Story = {
  args: {
    variant: "filled",
    colorScheme: "gradient",
    children: "무료로 시작하기"
  },
}

export const LineGrayButton: Story = {
  args: {
    variant: "line",
    colorScheme: "secondary",
    children: "게스트로 시작하기"
  }
}

export const LineGradientButton: Story = {
  args: {
    variant: "line",
    colorScheme: "gradient",
    icon: <FaSearch />,
    radius: "full",
    children: "Tabula 사용법 알아보기",
  },
}

export const UploadButton: Story = {
  args: {
    variant: "filled",
    colorScheme: "primary",
    radius: "md",
    children: "업로드",
  },
}

export const LoginButton: Story = {
  args: {
    variant: "filled",
    colorScheme: "secondary",
    radius: "full",
    children: "로그인",
  },
}