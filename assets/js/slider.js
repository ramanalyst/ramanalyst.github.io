(function() {
    var slides = document.querySelectorAll(".slide-card");
    var nextBtn = document.querySelector(".next-btn");
    var prevBtn = document.querySelector(".prev-btn");

    if (slides.length === 0 || !nextBtn || !prevBtn) return;

    var currentIndex = 0;
    var autoPlayTimer;

    // 1. Core Speed Fix: Pre-cache ALL images directly into the browser background memory
    function preCacheAllImages() {
        slides.forEach(function(slide) {
            var img = slide.querySelector('img[data-src]');
            if (img) {
                var tempImg = new Image(); // Creates an isolated memory cache object
                tempImg.onload = function() {
                    // Instantly swap attributes the millisecond memory cache finishes loading
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                };
                tempImg.src = img.getAttribute('data-src');
            }
        });
    }

    function showSlide(index) {
        slides[currentIndex].classList.remove("active");
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(function() {
            showSlide(currentIndex + 1);
        }, 4000);
    }

    nextBtn.addEventListener("click", function() {
        showSlide(currentIndex + 1);
        resetTimer();
    });

    prevBtn.addEventListener("click", function() {
        showSlide(currentIndex - 1);
        resetTimer();
    });

    // 2. Fire execution processes instantly without rendering pauses
    preCacheAllImages();
    resetTimer();
})();
