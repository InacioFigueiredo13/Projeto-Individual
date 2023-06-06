// document.addEventListener("DOMContentLoaded", function () {
   
// });

setTimeout(() => {
    const carousel = document.querySelector(".carousel-slides");
    const carouselItems = document.querySelectorAll(".evento-card-container");
    const itemWidth = carouselItems[0].offsetWidth;

    let position = 0;

    function moveCarousel(direction) {
        const itemsToShow = Math.floor(carousel.clientWidth / itemWidth);

        if (direction === "next" && position > -(carouselItems.length - itemsToShow) * itemWidth) {
            position -= itemWidth;
        } else if (direction === "prev" && position < 0) {
            position += itemWidth;
        }

        carousel.style.transform = `translateX(${position}px)`;
    }

    document.querySelector("#carousel-prev").addEventListener("click", function () {
        moveCarousel("prev");
    });

    document.querySelector("#carousel-next").addEventListener("click", function () {
        moveCarousel("next");
    });
}, 1500);