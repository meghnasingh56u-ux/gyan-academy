document.addEventListener('DOMContentLoaded', function () {
    // Admission Form Handler
    var applyButton = document.getElementById('apply-admission-btn');
    var formContainer = document.getElementById('admission-form-container');

    if (applyButton && formContainer) {
        applyButton.addEventListener('click', function () {
            formContainer.classList.remove('hidden');
            applyButton.style.display = 'none';

            var firstField = formContainer.querySelector('input, select, textarea');
            if (firstField) {
                firstField.focus();
            }

            formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        var admissionForm = document.getElementById('admission-form');
        var formStatus = document.getElementById('form-status');

        if (admissionForm && formStatus) {
            admissionForm.addEventListener('submit', function (event) {
                event.preventDefault();

                if (!admissionForm.checkValidity()) {
                    formStatus.textContent = 'Please fill in all required fields correctly.';
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }

                formStatus.textContent = 'Sending application...';
                formStatus.className = 'form-status';
                formStatus.style.display = 'block';
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Collect form data
                var formData = {
                    'entry.46245387': document.getElementById('name').value,
                    'entry.1669395904': document.getElementById('dob').value,
                    'entry.780916919': document.getElementById('grade').value,
                    'entry.1698393657': document.getElementById('father_name').value,
                    'entry.1978971168': document.getElementById('mother_name').value,
                    'entry.1561475558': document.getElementById('email').value,
                    'entry.1992450251': document.getElementById('phone').value
                };

                // Build URL with parameters
                var url = 'https://docs.google.com/forms/d/e/1FAIpQLSchoDb4W7Qvp1MDkSGn0z3qP0SJmYPmbjFB3iXPdJ0_ggfE-Q/formResponse?';
                var params = [];
                for (var key in formData) {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]));
                }
                url += params.join('&');

                // Use image beacon trick to submit (works around CORS)
                var img = new Image();
                img.src = url;

                // Show success immediately
                formStatus.textContent = 'APPLICATION SUBMITTED SUCCESSFULLY! THANK YOU.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                admissionForm.reset();
            });
        }
        setTimeout(function () {
            document.body.removeChild(iframe);
            document.body.removeChild(hiddenForm);
        }, 1000);
    }, 500);
            });
        }
    }

// Image Carousel Handler
var allImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image7.jpg',
    'images/image8.jpg',
    'images/image9.jpg',
    'images/image10.png',
    'images/image11.jpg',
    'images/image12.jpg',
    'images/image13.jpg',
];

var carouselImage = document.getElementById('carousel-image');
var indicatorsContainer = document.getElementById('carousel-indicators');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');

if (!carouselImage || !indicatorsContainer) {
    return;
}

var currentImageIndex = 0;
var autoPlayInterval;
var autoPlayDelay = 3000; // Change image every 3 seconds

// Create indicator dots
function createIndicators() {
    indicatorsContainer.innerHTML = '';
    allImages.forEach(function (_, index) {
        var dot = document.createElement('button');
        dot.className = 'indicator-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', function () {
            currentImageIndex = index;
            updateCarousel();
            resetAutoPlay();
        });
        indicatorsContainer.appendChild(dot);
    });
}

// Update carousel display
function updateCarousel() {
    carouselImage.src = allImages[currentImageIndex];

    // Update active indicator
    var dots = document.querySelectorAll('.indicator-dot');
    dots.forEach(function (dot, index) {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateCarousel();
}

// Previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateCarousel();
}

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(nextImage, autoPlayDelay);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Event listeners
if (nextBtn) {
    nextBtn.addEventListener('click', function () {
        nextImage();
        resetAutoPlay();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function () {
        prevImage();
        resetAutoPlay();
    });
}

// Pause on hover
var carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

// Initialize carousel
createIndicators();
updateCarousel();
startAutoPlay();
});
