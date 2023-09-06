const btns = document.querySelectorAll(".btn");

btns.forEach(btnEle => {
  btnEle.addEventListener("mousemove", e => {
    const x = e.offsetX,
          y = e.offsetY;
          btnWidth = btnEle.clientWidth,
          btnHeight = btnEle.clientHeight,
          transX = x - btnWidth / 2,
          transY = y - btnHeight / 2;
    btnEle.style.transform = `translateX(${transX}px) translateY(${transY}px)`;

    const mx = e.pageX - btnEle.offsetLeft,
          my = e.pageY - btnEle.offsetTop;
    
    btnEle.style.setProperty("--x", mx + "px");
    btnEle.style.setProperty("--y", my + "px");
  });

  btnEle.addEventListener("mouseout", () => {
    btnEle.style.transform = "";
  })
})