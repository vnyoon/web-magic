function generateText() {
  const letters = [];
  const numbers = [];

  const a = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(a + i));
    
    if (i < 9) {
      numbers.push(i + 1);
    }
  };

  return [...letters, ...numbers];
};

function randomText() {
  const texts = generateText();
  const text = texts[Math.floor(Math.random() * texts.length)];
  
  return text;
};

function rainEffect() {
  const cloudEle = document.querySelector(".cloud");
  const textEle = document.createElement("div");

  textEle.innerText = randomText();
  textEle.classList.add("text");

  const left = Math.floor(Math.random() * 310);
  const size = Math.random() * 1.5;
  const duration = Math.random();
  const styleSheets = {
    left: `${left}px`,
    fontSize: `${0.5 + size}em`,
    animationDuration: `${1 + duration}s`,
  };
  Object.assign(textEle.style, styleSheets);

  cloudEle.appendChild(textEle);
  setTimeout(() => {
    cloudEle.removeChild(textEle);
  }, 2000);
};

setInterval(() => rainEffect(), 20);
