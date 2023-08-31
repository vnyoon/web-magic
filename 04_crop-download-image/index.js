const image = document.getElementById("image"),
      preImage = document.getElementById("preview-image"),
      previewBtn = document.getElementById("preview"),
      downloadBtn = document.getElementById("download"),
      fileInput = document.getElementById("file"),
      options = document.querySelector(".options"),
      widthInput = document.getElementById("width-input"),
      heightInput = document.getElementById("height-input"),
      aspectRatios = document.querySelectorAll(".aspect-ratio-button");

let cropper = "",
    fileName = "";

fileInput.onchange = () => {
  preImage.src = "";
  widthInput.value = 0;
  heightInput.value = 0;
  downloadBtn.classList.add("hide");

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    image.setAttribute("src", reader.result);

    if (cropper) cropper.destroy();
    cropper = new Cropper(image);

    previewBtn.classList.remove("hide");
    options.classList.remove("hide");
  }

  fileName = file.name.split(".")[0];
};

previewBtn.onclick = (e) => {
  e.preventDefault();
  downloadBtn.classList.remove("hide");
  
  const imgSrc = cropper.getCroppedCanvas().toDataURL();
  preImage.src = imgSrc;
  
  downloadBtn.setAttribute("href", imgSrc);
  downloadBtn.download = `cropped_${fileName}`;
};

widthInput.addEventListener("input", () => {
  const { width } = cropper.getImageData();
  let eleWidth = parseInt(widthInput.value);

  if (eleWidth > width) {
    eleWidth = width
  };

  cropper.setCropBoxData({
    width: eleWidth
  })
});

heightInput.addEventListener("input", () => {
  const { height } = cropper.getImageData();
  let eleHeight = parseInt(heightInput.value);

  if (eleHeight > height) {
    eleHeight = height
  };

  cropper.setCropBoxData({
    height: eleHeight
  })
});

aspectRatios.forEach(ratioEle => {
  ratioEle.onclick = () => {
    if (ratioEle.innerText === "Free") {
      cropper.setAspectRatio(NaN)
    } else {
      cropper.setAspectRatio(evaluate(ratioEle.innerText.replace(":", "/")))
    }
  }
});

function evaluate(str) {
  return Function(`return (${str})`)()
};



// const obj1 = {
//   name: "1zh",
//   age: 18
// };
// function foo(obj) {
//   return Function('"use strict";return (' + obj + ")")();
// };
// console.log(
//   foo("{name: '1zh',age:18}")
// );
