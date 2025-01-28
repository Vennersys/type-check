import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Type Check",
  base: "/type-check/",
  description: "Type checking and validation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "API Reference", link: "/api-reference" },
          { text: "Validate Schema", link: "/validate-schema" },
          { text: "Evaluate Schema", link: "/evaluate-schema" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/leewinter/type-check" },
    ],
  },
});
