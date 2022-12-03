let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let img = document.getElementById("img");
let uploadBtn = document.getElementById("upload");
let downloadBtn = document.getElementById("download");
let resetBtn = document.querySelector("span");
let imgBox = document.querySelector(".img-box");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.onload = function () {
  imgBox.style.display = "none";
  resetBtn.style.display = "none";
  downloadBtn.style.display = "none";
};


uploadBtn.onchange = function () {
  resetValue();
  imgBox.style.display = "block";
  resetBtn.style.display = "block";
  downloadBtn.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(uploadBtn.files[0]);
  file.onload = function () {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

let allFilters = document.querySelectorAll("ul li input");
allFilters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

function resetValue() {
  ctx.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

resetBtn.onclick = resetValue;

downloadBtn.onclick = function () {
  downloadBtn.href = canvas.toDataURL();
};