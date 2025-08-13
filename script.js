// script.js

document.querySelectorAll('.slider-container').forEach(container => {
    const slides = container.querySelector('.slides');
    const cards = slides.querySelectorAll('.card');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let currentIndex = 0;

    function getVisibleCards() {
        if (window.innerWidth > 1024) {
            return 3;
        } else if (window.innerWidth > 768) {
            return 2;
        } else {
            return 1;
        }
    }

    function goToSlide(index) {
        const visibleCards = getVisibleCards();
        const maxIndex = cards.length - visibleCards;
        if (index < 0) {
            index = 0;
        } else if (index > maxIndex) {
            index = maxIndex;
        }
        // Get gap value safely
        let gap = 0;
        const style = window.getComputedStyle(slides);
        if (style.gap) {
            gap = parseFloat(style.gap) || 0;
        }
        const cardWidth = cards[0].offsetWidth + gap;
        slides.style.transform = `translateX(-${index * cardWidth}px)`;
        currentIndex = index;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    window.addEventListener('resize', () => goToSlide(currentIndex));
    goToSlide(0);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slides.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            goToSlide(currentIndex - 1);
        }
    });
});