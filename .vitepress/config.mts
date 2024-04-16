import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "库米花前端路",
  description: "8年漫漫前端路，跌跌撞撞又一天。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端心得", link: "/experiences/" },
      { text: "算法题解", link: "/algorithms/" },
    ],

    sidebar: [
      {
        text: "前端心得",
        items: [{ text: "一点碎碎念", link: "/experiences/一点碎碎念" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/ChenBonBon" }],
  },
});
