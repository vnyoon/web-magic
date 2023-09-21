/**创建随机色 */
const randomColor = () => {
  const chars = "1234567890abcdef",
        colorLegh = 6;
  
  let color = '#';
  for (let i = 0; i < colorLegh; i++) {
    const p = Math.floor(Math.random() * chars.length);
    color += chars.substring(p, p + 1);
  };

  return color;
};

/**创建DOM */
const container = document.querySelector('.container'),
      fragment = document.createDocumentFragment();

for (let i = 0; i < 60; i++) {
  const box = document.createElement('div');
  box.style.backgroundColor = randomColor();
  box.classList.add('box');

  fragment.appendChild(box);
};
container.appendChild(fragment);


/**创建动画 */
const randomColorBlock = document.querySelectorAll('.box');

const scrollTrigger = () => { 
  randomColorBlock.forEach((box) => {
    if (box.offsetTop <= window.scrollY) {
      box.classList.add('active')
    } else {
      box.classList.remove('active')
    }
  });  
};

window.addEventListener('scroll', scrollTrigger);
