const imgElements = document.querySelectorAll('.image-box');

let zIndex = 1;

imgElements.forEach(ele => {
  ele.addEventListener("click", () => {
    zIndex++;
    
    ele.style.right = "50rem";
    ele.style.zIndex = zIndex;
    ele.style.transform = "rotate(0deg)";
    ele.style.transition = "all 0.3s";

    console.log(zIndex);
    setTimeout(() => {
      zIndex -= 3;
 
      ele.style.right = "";
      ele.style.zIndex = zIndex;
      ele.style.transform = ""; 

      setTimeout(() => {
        ele.style.transition = "";
      }, 300);
    }, 1000);
  });
});
