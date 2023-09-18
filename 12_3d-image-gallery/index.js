const galleries = document.querySelector('.galleries'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev');

next.onclick = () => handleGallery('next');
prev.onclick = () => handleGallery();

let degress = 0;

function handleGallery(type = 'prev') {
  type === 'next' ? degress-= 45 : degress+= 45;

  galleries.style.transform = `perspective(1000px) rotateY(${degress}deg)`
};
