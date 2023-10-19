# 当文字成为雨滴：CSS创造炫酷的"文字(字母&数字)雨"动画！

## 简介
大家好，今天要给大家带来一个**Super Cool**的玩意儿😎！

在这篇技术文章中，将介绍如何使用`HTML`、`CSS`和`JavaScript`创建一个独特而引人注目的"文字(字母&数字)"雨🌧️动画效果。通过该动画，展现出的是**一系列随机字符将从云朵中下落**像是将文字变成雨滴从天而降，营造出与众不同的视觉效果。[showtime](https://code.juejin.cn/pen/7271088079388344332)！

<p align=center>
<img
  src="./rain-preview.gif" 
  alt="rain-preview"
  width="60%" 
/>
</p>

## HTML
创建一个基本的HTML结构，这段HTML代码定义了一个容器，其中包含了"云朵"和"雨滴"(即文字元素)。基本结构如下：
* 首先是类名为`container`的容器，表示整个动画的容器；
* 其次是类名为`cloud`的容器，表示云朵的容器；
* 接着是`cloud`容器中的文字元素，表示雨滴(即文字元素)；

然后引入外部css和js文件，可以先定义几个`text`容器，用于调整样式；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Rain Animation</title>

  <link rel="stylesheet" href="./css/style.css">
</head>
<body>
  <div class="container">
    <div class="cloud">
      <!-- <div class="text">a</div>
      <div class="text">b</div>
      <div class="text">c</div> -->
      <!-- 雨滴将会在这里出现 -->
    </div>
  </div>

  <script src="./js/main.js"></script>
</body>
</html>
```

## CSS
CSS是为文字雨效果增色添彩的关键，使动画效果更加丰富，关于一些 CSS 样式：
* 使用了自定义的颜色变量来为背景色和文本颜色提供值，有助于使代码易于维护和修改；
* 利用CSS的阴影效果和动画功能，创造逼真的"云朵"和流畅的"雨滴"动画；
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --body-color: #181c1f;
  --primary-color: #ffffff;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--body-color);
}

.container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  /* 添加一个从下往上线性渐变的镜像效果，增加视觉层次感 */
  -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, transparent, transparent, #0005);
}

.cloud {
  position: relative;
  top: 50px;
  z-index: 100;

  /* 横向云朵 */
  width: 320px;
  height: 100px;
  background-color: var(--primary-color);
  border-radius: 100px;

  /* drop-shadow函数将阴影效果应用于投影图像 */
  filter: drop-shadow(0 0 30px var(--primary-color));
}
.cloud::before {
  content: "";
  /* 左侧小云朵 */
  width: 110px;
  height: 110px;
  background-color: var(--primary-color);
  border-radius: 50%;
  position: absolute;
  top: -50px;
  left: 40px;

  /* 右侧大云朵 */
  box-shadow: 90px 0 0 30px var(--primary-color);
}

.cloud .text {
  position: absolute;
  top: 40px;
  height: 20px;
  line-height: 20px;

  text-transform: uppercase;
  color: var(--primary-color);
  /* 为文字添加阴影，看上去发光，增加视觉效果 */
  text-shadow: 0 0 5px var(--primary-color), 0 0 15px var(--primary-color), 0 0 30px var(--primary-color);
  transform-origin: bottom;
  animation: animate 2s linear forwards;
}

@keyframes animate {
  0% {
    transform: translateX(0);
  }

  70% {
    transform: translateY(290px);
  }

  100% {
    transform: translateY(290px);
  }
}
```
通过关键帧动画 @keyframes animate 定义文字运动的过程，沿着Y轴移动290px，也就是向下移动，模拟下雨的状态。当然为了让文字雨效果更加好看，还可以引入一下字体库；

> **Warning**
> 
> `-webkit-box-reflect`：可将元素内容在特定方向上进行轴对称反射；
> 
> 但是该特性是非标准的，请尽量不要在生产环境中使用它！
> 
> 目前只有`webkit`内核的浏览器支持，如：谷歌浏览器、Safari浏览器。在火狐浏览器中是不支持的；

## JavaScript
最后，使用JavaScript来实现文字雨的效果。通过动态生成并随机选择字符，可以实现让这些字符(雨滴)从.cloud(云朵)中降落的效果；

JavaScript 动画逻辑： 
  * 首先，定义函数 generateText() 并创建字符集，定义函数 randomText() 通过从给定的字符集中随机选择一个字符返回；
  * 接下来，编写 rain() 函数，在函数内部，首先选取 .cloud 元素同时创建一个新的 `<div>`元素作为字符节点，设置元素文本内容为函数返回的字符，并添加类名；
  * 然后，利用 Math.random() 方法生成一些随机值，将这些随机值应用到创建的 `<div>` 元素上，包括：
    - 字符距离左侧位置，在 .cloud 容器的宽度区间；
    - 字体大小，最大不超过32px；
    - 动画周期所需的时间(动画持续时间)，2s内；
  * 最后，将其`<div>`添加到 .cloud 元素中，使用 setTimeout() 函数在2秒后将文字节点从 .cloud 元素中移除，模拟雨滴落地消失效果；

定时器： 为了让字符(雨滴)持续下落，使用 setInterval 函数和一个时间间隔值来调用 rain() 函数。这样就是每20毫秒就会生成一个新的字符(雨滴)节点并添加到云朵中。
```js
// 生成字母和数字数组
function generateText() {
  const letters = [];
  const numbers = [];

  const a = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(a + i));
    
    if (i < 9) {
      numbers.push(i + 1);
    }
  };

  return [...letters, ...numbers];
};

// 从生成的数组中随机取出一个字符
function randomText() {
  const texts = generateText();
  const text = texts[Math.floor(Math.random() * texts.length)];
  
  return text;
};

function rainEffect() {
  const cloudEle = document.querySelector(".cloud");
  const textEle = document.createElement("div");

  textEle.innerText = randomText();
  textEle.classList.add("text");

  const left = Math.floor(Math.random() * 310);
  const size = Math.random() * 1.5;
  const duration = Math.random();
  const styleSheets = {
    left: `${left}px`,
    fontSize: `${0.5 + size}em`,
    animationDuration: `${1 + duration}s`,
  };
  Object.assign(textEle.style, styleSheets);

  cloudEle.appendChild(textEle);
  setTimeout(() => {
    cloudEle.removeChild(textEle);
  }, 2000);
};

// 每隔20ms创建一个雨滴元素
setInterval(() => rainEffect(), 20);
```
### 关于
`String`方法：
* [charCodeAt()](https://juejin.cn/post/7085925973740224543#heading-1)
* [fromCharCode()](https://juejin.cn/post/7085925973740224543#heading-2)

相关`动画效果`文章：
* [3D视觉画廊展示旋转播放](https://juejin.cn/post/7279720035735830580)
* [CSS简单实现3D香烟动画](https://juejin.cn/post/7290726887679770676)

## 结论
通过HTML、CSS和JavaScript的紧密配合，成功但不是很完美的创建了一个炫酷的"文字雨"动画效果，这个动画可以渐增加网页的 *吸引力*！不要犹豫🖐️，动手尝试一下，或者甚至你也可以根据自己的需求对文字、样式和动画参数进行调整，进一步改善和扩展这个效果；

希望这篇文章对你在开发类似动画效果时有所帮助！另外如果你对这个案例还有任何问题，欢迎在评论区留言或联系(私信)我。谢谢阅读🎉！

码字不易🥲，不要忘了三连🤟，还有一件事收藏不点赞都是耍流氓💣；
