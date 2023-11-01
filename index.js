const carousel = document.querySelector(".carousel");
const firstImage = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".header img");

let isDragStart = false;
let isDragging = false;

let imageWidth = firstImage.clientWidth + 20;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showIcons = () => {
    console.log(carousel.scrollLeft);
    arrowIcons[0].style.opacity = carousel.scrollLeft === 0 ? "0.5" : "1";
    arrowIcons[1].style.opacity = carousel.scrollLeft === scrollWidth ? "0.5" : "1";
}

showIcons();

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id === "left" ? -imageWidth : imageWidth;
        setTimeout(() => showIcons(), 600);
    })
})

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = e.touches[0].pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
}

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);