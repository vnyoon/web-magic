function changePageBG() {
  const randomFn = (range = 255) => Math.floor(Math.random() * range);

  const red = randomFn();
  const green = randomFn();
  const blue = randomFn();
  
  document.body.style.backgroundColor = `rgb(${red} ${green} ${blue})`;
};

setInterval(changePageBG, 1000);
