import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: (config) => {
    if(config.resolve) {
      config.resolve.alias = {
        ...(config.resolve?.alias || {}),
        "@/lib/utils": require.resolve("../src/lib/utils.ts"),
        "tailwind-merge": require.resolve("tailwind-merge"),
      };
    }
    return config;
  },
};
export default config;
