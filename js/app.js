// Add scroll class to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Burger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Обработчик для ссылок в меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    burgerMenu.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }, 100);
            }
        });
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burgerMenu.contains(e.target) && nav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

// Slider functionality
class Slider {
    constructor(sliderId, options = {}) {
        this.slider = document.getElementById(sliderId);
        if (!this.slider) return;
        this.sliderWrapper = this.slider;
        this.slides = Array.from(this.sliderWrapper.children);
        this.container = this.slider.closest('.slider-container');
        if (!this.container) return;
        this.navigation = this.container.querySelector('.slider-navigation');
        this.prevButton = this.navigation?.querySelector('.prev-button');
        this.nextButton = this.navigation?.querySelector('.next-button');
        this.dots = this.container.querySelectorAll('.slider-dot');
        
        this.options = {
            sideNav: options.sideNav || false,
            slidesPerView: 3
        };
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        
        if (this.options.sideNav && window.innerWidth > 768) {
            this.container.classList.add('side-nav');
            this.setupNavigation();
        }
        
        this.init();
        this.setupResponsive();
        this.setupDots();
    }

    init() {
        if (window.innerWidth <= 768) return;
        this.updateSlides();
        this.updateDots();
    }

    setupNavigation() {
        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener('click', () => this.prevSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }
    }

    setupDots() {
        if (this.dots && this.dots.length) {
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.currentSlide = index;
                    this.updateSlides();
                    this.updateDots();
                });
            });
        }
    }

    updateDots() {
        if (this.dots && this.dots.length) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }
    }

    setupResponsive() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.sliderWrapper.style.transform = 'none';
                return;
            }
            this.updateSlides();
        });
    }

    updateSlides() {
        if (window.innerWidth <= 768) return;
        
        const slideWidth = 100 / this.options.slidesPerView;
        const offset = -this.currentSlide * slideWidth;
        this.sliderWrapper.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    nextSlide() {
        if (window.innerWidth <= 768) return;
        
        this.currentSlide++;
        if (this.currentSlide >= this.totalSlides - this.options.slidesPerView + 1) {
            this.currentSlide = 0;
        }
        this.updateSlides();
    }

    prevSlide() {
        if (window.innerWidth <= 768) return;
        
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - this.options.slidesPerView;
        }
        this.updateSlides();
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    new Slider('productsSlider', { sideNav: true });
    new Slider('techniquesSlider', { sideNav: true });
}); 