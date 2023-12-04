/**进度 */
let i = 0;

const body = document.querySelector('body'),
      aquaEle = document.querySelector('.aqua'),
      percentBarEle = document.querySelector('.percent-bar'),
      numberEle = document.querySelector('.number'),
      welcEle = document.querySelector('h2');
      
let interval = setInterval(() => {
  const text = `${i}%`;

  numberEle.textContent = text;
  percentBarEle.style.width = text;

  i+=2;

  if (i > 100) {
    clearInterval(interval);

    /**隐藏加载 */
    aquaEle.style.opacity = '0';
    aquaEle.style.visibility = 'hidden';

    /**改变背色 */
    body.style.backgroundColor = `var(--primary-color)`;
    
    /**显示文字 */
    welcEle.style.opacity = '1';
    welcEle.style.visibility = 'visible';
  }
}, 50);
