const textEle = document.querySelector('.text');

textEle.innerHTML = textEle.textContent.replace(/\S/g, '<span>$&</span>');

const spanEle = document.querySelectorAll('span');
spanEle.forEach((ele, index) => {
  ele.style.transform = `rotate(${index * 18}deg)`
});

document.addEventListener('mousemove', e => {
  textEle.style.left = `${e.pageX}px`;
  textEle.style.top = `${e.pageY}px`;

  textEle.style.transform = `rotate(${e.pageX / 2}deg) rotate(${e.pageY / -2}deg)`;
});
