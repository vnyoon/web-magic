# CSS简单实现3D香烟动画

本文详细介绍使用`HTML`、`CSS`创建**3D香烟动画**效果，这个动画效果展示了由 *文本* 组成的点燃中的香烟，通过应用3D动画无限环绕旋转，并添加一些特殊的样式，最后形成一个真实的香烟🚬。[showtime](https://code.juejin.cn/pen/7290741048387567671)！

<p align=center>
<img
  src="./img/cigarette-preview.jpg" 
  alt="cigarette-preview"
/>
</p>

## HTML
首先，看 `HTML` 代码，内容区域由一个 `<div>` 容器 `.container` 包裹，其中有一个类名为 `.cigarette` 的元素就是用于形成香烟动画效果的。在这个元素内部：
* 有**10**个使用 `span` 标签包裹的文本内容组成香烟，每个 span 元素都有不同的内联样式自定义属性分别是1~10。
* 在 `span` 标签内包含着的是香烟的身体依次是过滤嘴、烟体、火星。银圈部分是通过伪元素实现的，具体看后面 `CSS` 部分。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">

  <title>No Smoking Animation</title>
</head>

<body>
  <div class="container">
    <div class="cigarette">
      <span style="--i: 1">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 2">
        <i>nooooo</i>smoooooooooking<i>|</i></span>

      <span style="--i: 3">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 4">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 5">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 6">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 7">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 8">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 9">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>

      <span style="--i: 10">
        <i>nooooo</i>smoooooooooking<i>|</i>
      </span>
    </div>
  </div>
</body>

</html>
```

## CSS
接下来，看 `CSS` 代码，一些基本的样式不做过多介绍(重置样式、水平垂直居中布局、背景和字体颜色的应用等)。以下是对其中部分样式属性的解释：
* `.cigarette` 元素的样式通过`transform-style: preserve-3d`定义元素的子元素在 `3D空间` 中进行转换。通过`transform: perspective(1000px)`设置该元素的透视效果(视点离屏幕的距离)。
* `span` 元素使用定位和`translate`平移使其布局在水平垂直居中，然后沿`X`轴旋转(360deg / 10 = 36deg)使其正好围绕一圈，并且元素之间间隔`translateZ(40px)`。
* 香烟各个部分样式通过`i`标签设置：
  - 第一个i标签：改变文字颜色后实现过滤嘴部分，使用`after`伪元素创建过滤嘴底部与烟体的分隔带银圈(`#ccc`)部分。
  - 第二个i标签：改变文字颜色后实现烟火部分，应用红色模糊的效果创建点燃的状态，然后为文字应用多个阴影效果实现烟灰的各个状态。
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background-color: #222;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.cigarette {
  transform-style: preserve-3d;
  transform: perspective(1000px);
  animation: animate 15s linear infinite;

  cursor: not-allowed;
  user-select: none;
}
@keyframes animate {
  0% {
    transform: perspective(1000px) rotateX(0deg);
  }

  100% {
    transform: perspective(1000px) rotateX(360deg);
  }
}

.cigarette span {
  position: absolute;

  font-size: 1.5em;
  font-weight: 900;
  text-transform: uppercase;
  transform: translate(-50%, -50%)
             rotateX(calc(var(--i) * 36deg))
             translateZ(40px);
  line-height: 1.5em;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.25);
}

.cigarette span i {
  font-style: normal;
  color: #ec9535;
}
.cigarette span i:first-child::after {
  content: "L";
  text-transform: lowercase;
  color: #ccc;
}
.cigarette span i:last-child {
  color: #f00;
  filter: blur(2px);
  text-shadow: -4px 0 2px #000,
               8px 0 20px #f00,
               8px 0 24px #f00,
               8px 0 0px #ccc,
               12px 0 #555,
               16px 0 #666,
               20px 0 #888,
               24px 0 #999;
}

```

最后通过设置 `animation` 动画(实现环绕旋转，持续时间为 15 秒，线性过渡，并且无限循环)使具活力。

> 相关文章：[3D视觉画廊展示旋转播放走马灯](https://juejin.cn/post/7279720035735830580)

## 最后
通过本篇文章的详细介绍，实现了一个具有**旋转和阴影效果的香烟**。相信能够帮助你更好地使用`CSS`来创建一个**3D香烟**动画，从而理解和应用这个效果。同时，也提醒读者，吸烟有害健康，尽量少吸烟，以保持身体健康🚭。

希望这篇文章对你在开发类似交互动画效果时有所帮助！如果你对这个案列还有任何问题，欢迎在评论区留言或联系(私信)我。码字不易🥲，不要忘了三连鼓励🤟，谢谢阅读，Happy Coding🎉！

源码我放在了[GitHub](https://github.com/vnyoon/web-magic)，里面还有一些酷炫的效果、动画案列，喜欢的话不要忘了 `starred` 不迷路！
