const list = document.querySelectorAll('.carousel .list .item'),
      carousel = document.querySelector('.carousel'),
      prev = document.getElementById('prev'),
      next = document.getElementById('next'),
      mockup = document.querySelector('.mockup');

let count = list.length;
let active = 0;
let leftMockup = 0;
let left_each_item = 100 / (list.length - 1);

let refreshInterval = setInterval(() => next.click(), 5000);
function handlePlayCarousel() {
  const hiddenOld = document.querySelector('.item.hidden');
  if (hiddenOld) hiddenOld.classList.remove('hidden');

  const activeOld = document.querySelector('.item.active');
  activeOld.classList.remove('active');
  activeOld.classList.add('hidden');

  list[active].classList.add('active');

  mockup.style.setProperty('--left', leftMockup + '%');

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => next.click(), 5000);
};

next.onclick = function() {
  active = active >= count - 1 ? 0 : active + 1;
  leftMockup = leftMockup +  left_each_item;
  carousel.classList.remove('right');

  handlePlayCarousel();
};

prev.onclick = function() {
  active = active <= 0 ? count - 1 : active - 1;
  leftMockup = leftMockup - left_each_item;
  carousel.classList.add('right');

  handlePlayCarousel();
};
