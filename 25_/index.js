const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.onmousemove = (event) => {
    const { pageX, pageY } = event;

    const x = pageX - card.offsetLeft,
      y = pageY - card.offsetTop;

    card.style.setProperty('--x', x + 'px');
    card.style.setProperty('--y', y + 'px');
  }
});
