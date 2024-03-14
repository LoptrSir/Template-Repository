// Image Slider Display
// JS components
//adjust values as needed

//  ****SLIDE Management Logic****
//Declarations
const imageSlider = document.querySelector(".image-slider");
const backButton = document.querySelector("[data-back-button]");
const slides = document.querySelector(".slides");
const slide = document.querySelector(".slide");
const nextButton = document.querySelector("[data-next-button]");
const navDots = document.querySelector(".nav-dots");
const dots = document.querySelectorAll(".dot");
const slideElements = document.querySelectorAll(".slide");
const dotElements = document.querySelectorAll(".dot");
const slideIds = [];
const dotIds = [];

let currentSlideId = 0;
let timeoutId;

//Build Arrays
slideElements.forEach((slide) => {
  slideIds.push(slide.id);
});

dotElements.forEach((dot) => {
  dotIds.push(dot.id);
});

//Event Listeners
backButton.addEventListener("click", () => {
  bckButton();
});

nextButton.addEventListener("click", () => {
  fwdButton();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    let dotId = dot.id;
    dotChangeSlide(dotId);
  });
});

//Functions
function advanceSlide() {
  let newSlideIndex = (currentSlideId + 1) % slideIds.length;
  currentSlideId = newSlideIndex;
  updateSlideDisplay(currentSlideId);
  updateDotDisplay(currentSlideId);
  timeoutId = setTimeout(advanceSlide, 3000);
}

function getElementId() {
  let elementId = document.getElementById(slideIds[currentSlideId]);
  return elementId.id;
}

function updateSlideDisplay(currentSlideId) {
  for (let i = 0; i < slideIds.length; i++) {
    const slideId = slideIds[i];
    const isActive = i === currentSlideId;
    document.getElementById(slideId).style.display = isActive
      ? "block"
      : "none";
  }
  clearTimeout(timeoutId);
}

function updateDotDisplay(currentSlideIndex) {
  for (let i = 0; i < dotIds.length; i++) {
    const dotId = dotIds[i];
    const isActive = i === currentSlideIndex;
    document.getElementById(dotId).style.color = isActive ? "red" : "black";
  }
}

function dotChangeSlide(dotId) {
  let dotIndex = findDotIndex(dotId, dotIds);
  currentSlideId = dotIndex - 1;
  clearTimeout(timeoutId);
  advanceSlide();
}

function findDotIndex(dotId, dotIds) {
  return dotIds.indexOf(dotId);
}

function bckButton() {
  clearTimeout(timeoutId);
  let currentDisplayId = getElementId();
  document.getElementById(currentDisplayId).style.display = "none";
  let newSlideIndex = (currentSlideId - 2 + slideIds.length) % slideIds.length;
  currentSlideId = newSlideIndex;
  advanceSlide();
}

function fwdButton() {
  clearTimeout(timeoutId);
  advanceSlide();
}

//makes dot1 red upon load
window.onload = function () {
  document.getElementById("dot1").style.color = "red";
};

//Function Calls
getElementId();
setTimeout(advanceSlide, 3000);

//   *****END SLIDE Logic*****
