---
layout: doc
---

# Chrome 插件使用 tailwind 的坑

现在很多公司的前端项目都使用了 `Vite` 和 `tailwind` 的组合，`Vite` 基于 ESM 快速构建的特性，`tailwind` 基于原子化 `classname` 的写法，大大提高了前端的开发速度和开发体验。

在 web 网站项目中，我们也是使用了 `React`、`Vite` 和 `tailwind` 进行开发，但是到 `Chrome` 插件时，这套组合却出问题了。

首先，我们做的是一个基于 `Content scripts` 的插件，那么什么是 `Content scripts` 呢？

## Content scripts

> 内容脚本是在网页环境中运行的文件。通过使用标准文档对象模型 (DOM)，用户能够读取浏览器所访问网页的详细信息，对这些网页进行更改，并将信息传递给父级扩展程序。

简单来说，使用 `Content scripts` 开发的插件，会向使用插件的网站的 `HTML` 中注入一段代码。所以，问题就来了。

## 样式互相影响

因为我们只能控制咱们自己的插件，不能控制使用插件的网站，所以使用 `tailwind` 这样的原子化 CSS 库的问题就出现了：太容易被外部影响了。举个例子

```jsx
export default App() {
    return <div className="flex"></div>
}
```

上面这个组件的 `div` 元素应该有 `display: flex` 的效果，但是，如果使用插件的网站重写了 `flex` 这个样式

```css
.flex {
  display: flex;
  flex: 1;
}
```

那么咱们的插件的样式就会被影响了。

## 解决方案

其实 `tailwind.config.js` 的配置中是提供了一个解决方案的

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  prefix: "me-",
};
```

当我们在为我们的代码添加前缀后，之前 `flex` 的 `className` 就会变成 `me-flex`，这样的话，除非使用插件的网站也有 `me-flex` 这个 `className`，否则很大概率不会影响到我们的代码了。

## 写在最后

除开 `Chrome` 插件，组件库应该也是一样的道理，所以在开发公用组件时，一定要记住在 `tailwind.config.js` 中配置 `prefix`。
