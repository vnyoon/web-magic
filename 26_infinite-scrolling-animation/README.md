# 「绝无仅有」CSS打造吸睛的文本与图片无限滚动动画

本文将详细介绍如何使用 `HTML` 和 `CSS` 创建**文本与图片的无限滚动动画**效果。网页内容包含两个部分，一个是**标签组**滚动，另一个是**图片组**滚动，其中动画的效果主要表现为标签和图片一直横向的水平滚动，并且元素会无缝衔接从而实现无限循环，并且首尾两端有渐变蒙层效果，以造成出现和消失的过渡🎢。[showtime](https://code.juejin.cn/pen/7306108992827162651)

<p align=center>
<img
  src="./infinite-scrolling-preview.gif" 
  alt="infinite-scrolling-preview"
  width="90%"
/>
</p>

**<p align=center>图片太多了，考虑图床压力问题，替换成纯色背景块了，所以就不用在线的了🥲。</p>**

## HTML 结构
首先，`HTML` 代码部分包含了5个`.scroll`元素，这个数量取决于你网页有几个无限滚动区域。每个scroll元素都放了两个`div`(d1和d2)用于创建滚动容器，其中每个div元素都具有**相同的内容元素**，用于展示滚动内容。本案例的主要内容就是标签组`span`和图片组`img`。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Infinite Scrolling Animation</title>

  <link rel="stylesheet" href="./css/index.css">
</head>

<body>
  <div class="scroll" style="--t: 20s">
    <div>
      <span>HTML</span>
      <span>CSS</span>
      <span>JavaScript</span>
      <span>Vue</span>
      <span>React</span>
      <span>Figma</span>
      <span>Photoshop</span>
    </div>

    <div>
      <span>HTML</span>
      <span>CSS</span>
      <span>JavaScript</span>
      <span>Vue</span>
      <span>React</span>
      <span>Figma</span>
      <span>Photoshop</span>
    </div>
  </div>

  <div class="scroll" style="--t: 30s">
    <!-- 同上 -->
  </div>

  <div class="scroll" style="--t: 10s">
    <!-- 同上 -->
  </div>

  <div class="scroll" style="--t: 35s">
    <!-- 同上 -->
  </div>

  <div class="scroll img-box" style="--t: 25s">
    <div>
      <img src="./images/img_01.jpg" alt="image">
      <img src="./images/img_02.jpg" alt="image">
      <img src="./images/img_03.jpg" alt="image">
      <img src="./images/img_04.jpg" alt="image">
      <img src="./images/img_05.jpg" alt="image">
      <img src="./images/img_06.jpg" alt="image">
      <img src="./images/img_07.jpg" alt="image">
      <img src="./images/img_08.jpg" alt="image">
      <img src="./images/img_09.jpg" alt="image">
    </div>

    <div>
      <!-- 同上 -->
    </div>
  </div>
</body>

</html>
```
> 标签组和图片组里的两个div要宽度保持一致，也就是说d1和d2里的每个标签`span`要对应相同，否则两个div就会出现滚动覆盖或距离过大。
> 还有就是每个`scroll`标签的自定义变量`--t`的值不一样(又快又慢)，要想滚动效果统一的话时间调整一样就可以了。

## CSS 样式
接下来，看 `CSS` 部分设置了一些基本的全局样式，有重置样式、内容水平垂直居中布局、背景字体颜色等不做过多赘述。
```css
/* @import url('https://fonts.googleapis.com/css?family=Poppins:400,600,700,800&display=swap'); */
@import './google-fonts.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
  background-color: #222;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
}

/* ... */
```

滚动容器`scroll`有一个固定宽度，然后对于溢出的内容隐藏不可见，以及使用 `mask-image` 创建了一个线性渐变遮罩，给内容带来滚动时的淡出淡入视觉效果。
* `span`元素标签的样式设置了内联块级元素的展示方式，以及一些边距、边框、字母间距和文本转换。此外，当鼠标悬停时，还设置了背景颜色的变化。
* `img`图片的样式设置了最大宽度和灰度滤镜，当鼠标悬停在图片上时，滤镜会被移除，呈现出原始彩色图片。
两者都提供了一种交互反馈的效果。
```css

.scroll {
  display: flex;
  width: 700px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
}

.scroll > div span {
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  background-color: #333;
  border-radius: 5px;

  letter-spacing: 0.2em;
  text-transform: uppercase;

  cursor: pointer;
  transition: background-color 0.5s;
}
.scroll > div span:hover {
  background-color: #4caf50;
}

.img-box img {
  max-width: 150px;
  filter: grayscale(1);
  
  cursor: pointer;
  transition: filter 0.5s;
}
.img-box img:hover {
  filter: grayscale(0);
}

/* ... */
```

### 技术实现
接着就是每个滚动容器内包裹两个一样的`div`元素，用于创建无缝衔接，下面分别简称为`d1`和`d2`。通过 `white-space: nowrap` 属性确保 `div` 内的内容不换行，从而使得内容能够水平滚动。

主要通过两个不同的关键帧动画`@keyframes`关键帧和过渡`animation`属性控制两个滚动区域实现的滚动效果。让元素以无限循环和线性动画的方式在`.scroll`滚动容器内移动。拿本案列的`img-box`元素阐释一下动画执行过程：
* 首先，它定义的CSS变量是`--t: 25s`。里面两个div元素都应用了`25s`匀速无限循环动画。
* 然后，在`d1`中应用了延迟`25s * -1 = -25s`，`animate`动画从 `transform: translateX(100%)` 开始，将元素初始位置设置在容器的右侧外部。在动画结束时，元素移动到了容器的左侧外部，即 `transform: translateX(-100%)`。
* 最后，在`d2`中应用了延迟`25s / -2 = -12.5s`，`animate2`动画从 `transform: translateX(0)` 开始，将元素初始位置设置在容器的右侧外部。在动画结束时，元素移动到了容器的左侧更远的位置，即 `transform: translateX(-200%)`。滚动的距离是比第一个d1滚动区域更远的，这样可以实现错开的滚动效果。
```css

.scroll > div {
  white-space: nowrap;
  animation: animate var(--t) linear infinite;
  animation-delay: calc(var(--t) * -1);
}
@keyframes animate {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.scroll > div:nth-child(2) {
  animation: animate2 var(--t) linear infinite;
  animation-delay: calc(var(--t) / -2);
}
@keyframes animate2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200%);
  }
}



@media screen and (max-width: 768px) {
  .scroll {
    width: 90vw;
  }

  .scroll > div span {
    background-color: #4caf50;
  }

  .img-box img {
    width: 33vw;
    filter: grayscale(0);
  }
}

```
由于`animate`延迟小于`animate2`，所以动画a2先执行，从右向左持续滚动到`x: -200%`，当滚动到`-100%`时也就是当前可见区域，此时a1开始执行动画[^a1-run]，从右向左持续滚动到`x: -100%`，当滚动到`100%`时也就是当前可见区域，a2已经到`-200%`了，接着看a1继续滚动到`-100%`，a2继续从`0到-200%`，如此循环往复。

[^a1-run]: 因为a2的延迟是-12.5s，由于是负值动画会立即开始，但它会从整个动画生命周期25s的12.5s动画点开始，接着从0到-100%过了12.5s，相当于过了一整个动画周期，a1是跳过(-25s)整个生命周期的，所以a2到-100%位置时a1就开始执行了。

> 使用 animation-play-state 属性设置当鼠标悬浮滚动容器时，div元素动画暂停。

## 最后
通过本篇文章的详细介绍，相信能够帮助你更好地使用`CSS`来创建一个**文本与图片无限滚动**动画，从而理解掌握和应用这个效果。通过 `transform` 属性的变化实现了水平滚动效果，使得 `div` 内的内容能够在容器内水平滚动，呈现出无限循环的连接效果。丰富了网页增添加了动态和交互性。

希望这篇文章对你在开发类似交互动画效果时有所帮助！如果你对这个案列还有任何问题，欢迎在评论区留言或联系(私信)我。码字不易🥲，不要忘了三连鼓励🤟，谢谢阅读，Happy Coding🎉！

源码我放在了[GitHub](https://github.com/vnyoon/web-magic)，里面还有一些酷炫的效果、动画案列，喜欢的话不要忘了 `starred` 不迷路！
