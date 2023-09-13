const texts = document.querySelectorAll('ul li');

texts.forEach(textEle => {
  const textList = textEle.innerText.split('');

  textEle.innerHTML = textList.map((letter, i) => `<span style="transition-delay: ${i * 40}ms">${letter}</span>`).join('');
});

const cursorEle = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursorEle.style.left = e.pageX + 'px';
  cursorEle.style.top = e.pageY + 'px';
});
