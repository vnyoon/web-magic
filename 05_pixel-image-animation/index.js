const IMG_W = 300;
const IMG_H = 300;
// const IMG_W = 480;
// const IMG_H = 340;
const PIXEL_W_H = 10;

const h = Math.ceil(IMG_H / PIXEL_W_H), //30组
      w = Math.ceil(IMG_W / PIXEL_W_H), //每组30个
      pixel = document.getElementById("pixel");

function pixelImg() {
  const fragment = document.createDocumentFragment();

  // for (let i = 0; i < h; i++) {
  //   for (let j = 0; j < w; j++) {
  //     const decimal = Math.random().toFixed(1);
  //     const span = document.createElement("span");

  //     // span.setAttribute("x-count", j + 1);
  //     // span.setAttribute("y-count", i + 1);
  //     // span.style.border = "1px solid #111";

  //     span.style.left = j * PIXEL_W_H + "px"; // (横向)的每个排列；
  //     span.style.top = i * PIXEL_W_H + "px"; // (竖向)的每组排列；
  //     span.style.backgroundPositionX = -j * PIXEL_W_H + "px";
  //     span.style.backgroundPositionY = -i * PIXEL_W_H + "px";

  //     span.style.animationDelay = decimal + 's'; // 每个span开始执行动画之前等待的时间 '0.1'、'0.8'、'0.2'、'0.9'、'0.6'...

  //     fragment.appendChild(span);
  //   }
  // };

  for (let i = 0; i < h * w; i++) {
    const decimal = Math.random().toFixed(1);
    const span = document.createElement("span");
  
    // 计算列数
    const col = i % w;
    // 计算行数
    const row = Math.floor(i / w);
  
    const styles = {
      left: `${col * PIXEL_W_H}px`,
      top: `${row * PIXEL_W_H}px`,
      backgroundPositionX: `${-col * PIXEL_W_H}px`,
      backgroundPositionY: `${-row * PIXEL_W_H}px`,
      animationDelay: `${decimal}s`
    };
  
    Object.assign(span.style, styles);
    fragment.appendChild(span);
  };

  pixel.appendChild(fragment);
};

pixelImg();
