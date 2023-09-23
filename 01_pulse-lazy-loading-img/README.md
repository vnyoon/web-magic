## 脉冲懒加载图片

<p align=center>
<img 
  src="./lazy-loading-img-preview.gif"
  alt="lazy-loading-img-preview"
  width="60%"
/>
</p>

如何像高手一样加载网页的图片？
* `<img>`设置`loading="lazy"`属性，给每张图片添加一张小的模糊占位图片，并通过`CSS`添加脉冲样式实现真正的图片加载完成前动画；
* 监听每张图片的`load`事件(加载完成时触发)或者`image.complete`属性(浏览器是否已完成对图像的加载)，触发一个事件，事件中添加加载完成标识(类名)，并通过css移除预加载相关样式，展示真正的图片；
