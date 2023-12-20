# 丰富的CSS Loading动画，给网页注入活力

当用户正在浏览网站网页时，为了更好的用户体验，经常会使用 **加载中** 文字或者动画来表示正在 *加载数据* 或 *执行某项操作*。而使用动画不仅能够吸引用户的注意力，同时也能够传达信息"系统正在工作中"，需要一些时间来完成任务。本文将详细介绍如何通过 `CSS` 创建一个 **加载中** 动画效果🧱。[showtime](https://code.juejin.cn/pen/7312013495585734671)！

<p align=center>
<img
  src="./simple-loader-preview.gif" 
  alt="./simple-loader-preview" 
  width="80%" 
/>
</p>

## HTML 结构
首先，看 `HTML` 部分代码结构。创建了一个类名为"loader"的 `<div>` 元素，内部包含了九个空的`<span>`元素。这些`<span>`元素就是用于呈现加载动画效果的，通过添加适当的CSS样式，`<span>`元素会以一定的顺序播放动画。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Loader Animation</title>

  <link rel="stylesheet" href="./index.css">
</head>

<body>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>

    <span></span>
    <span></span>
    <span></span>

    <span></span>
    <span></span>
    <span></span>
  </div>
</body>

</html>
```

## CSS 样式
接下来，使用 `CSS` 代码实现加载器的动画。老规矩对网页先做了一下初始化样式，然后把实际要输出的内容布局到网页水平垂直居中展示。

`.loader` 使用 **Grid** 布局，将九个 `<span>` 元素排列成一个 `3x3` 的网格布局，然后旋转45度(歪头)。
* 使用 `:nth-child` 伪类选择器以及逻辑运算符，为每组(3个) `<span>` 元素指定不同的背景色，创建了三种不同的颜色方块，以添加加载动画的视觉效果。
* 使用 `@keyframes` 定义 `loading` 动画的关键帧。通过两个关键帧的透明度和缩放变化，实现了加载动画的无限循环效果。
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background-color: #151320;

  display: flex;
  justify-content: center;
  align-items: center; 
}

.loader {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 5px;

  transform: rotate(45deg);
}

.loader span {
  background-color: #fff;
  border-radius: 8px;

  /* animation: loading 1.5s ease-in-out infinite; */
}
@keyframes loading {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }

  35%, 65% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 1~3 */
.loader span:nth-child(-n+3) {
  background-color: #4bc8eb;
}
/* 4~6 */
.loader span:nth-child(n+4):nth-child(-n+6) {
  background-color: #f13a8f;
}
/* 7~9 */
.loader span:nth-child(n+7):nth-child(-n+9) {
  background-color: #36f372;
}

/* ... */
```
此外，还通过使用 `animation-delay` 属性为每列方块设置不同的延迟时间，可以实现方块按照一定的顺序逐个出现。
* 第一**列**方块（span7）具有 `0.6` 秒的延迟。
* 第二**列**方块（span4和8）具有 `0.7` 秒的延迟。
* 第三**列**方块（span1、5和9）具有 `0.8` 秒的延迟。
* 第四**列**方块（span2和6）具有 `0.9` 秒的延迟。
* 第五**列**方块（span3）具有 `1` 秒的延迟。
```css

/* 第一列 */
.loader span:nth-child(7) {
  animation-delay: 0.6s;
}

/* 第二列 */
.loader span:nth-child(4), 
.loader span:nth-child(8) {
  animation-delay: 0.7s;
}

/* 第三列 */
.loader span:nth-child(1), 
.loader span:nth-child(5), 
.loader span:nth-child(9) {
  animation-delay: 0.8s;
}

/* 第四列 */
.loader span:nth-child(2), 
.loader span:nth-child(6) {
  animation-delay: 0.9s;
}

/* 第五列 */
.loader span:nth-child(3) {
  animation-delay: 1s;
}
```
这样，当加载动画运行时，方块将按照设定的延迟时间逐个出现，从而实现加载中动画效果。

### 表现
<img
  src="./simple-loader-rendering.png" 
  alt="./simple-loader-rendering" 
  width="80%" 
/>

### 参考
关于减少长时间等待的焦虑感，相关 **加载中** 动画效果的文章。
* [简单生动的屏幕预加载动画效果](https://juejin.cn/post/7308001278419206163)
* [很酷的CSS Loading动画，让网页加载更有趣](https://juejin.cn/post/7296404570949173298)

## 最后
本文中，使用 `CSS` 创建了一个 **简单但有效的加载中** 动画。通过关键帧动画和选择器特性，实现了元素的 **逐渐加载** 效果，并添加了不同的颜色和延迟时间，使动画更加丰富。加载中动画不仅能够提供视觉上的反馈，告诉用户系统正在工作中，还能够改善用户体验，减少长时间等待的焦虑感。

你也可以根据自己的需求进行调整，进一步改善和扩展这个效果。希望这篇文章对你在开发类似交互动画效果时有所帮助！如果你对这个案列还有任何问题，欢迎在评论区留言或联系(私信)我。码字不易🥲，不要忘了三连鼓励🤟，谢谢阅读，Happy Coding🎉！

源码我放在了[GitHub](https://github.com/vnyoon/web-magic)，里面还有一些酷炫的效果、动画案列，喜欢的话不要忘了 `starred` 不迷路！
