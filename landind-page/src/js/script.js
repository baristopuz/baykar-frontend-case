import { initSliders } from "./partials/swiper-sliders";
import { Bootstrap } from "bootstrap";

window.onload = function () {
    document.fonts.ready.then(function () {
        initSliders();
        isScroll();
        // fancybox();
        smoothScrollID();
        pageReady();

        function isScroll() {
            window.addEventListener('scroll', () => {
                if (window.scrollY >= 20) {
                    document.body.classList.add('is-scroll');
                } else {
                    document.body.classList.remove('is-scroll');
                }
            });
        }
      
        function pageReady() {
            document.body.classList.add('page-ready');
        }
    
        function smoothScrollID() {
            let scrollElements = document.querySelectorAll('[scroll-element]');
            scrollElements.forEach(scrollElement => {
                scrollElement.addEventListener('click', function (item) {
                    const element = document.querySelector(scrollElement.getAttribute('scroll-el')); // Replace 'myElement' with the actual ID of the target element.
                    const offset = element.offsetTop - 64; // Get the vertical offset of the element from the top.
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth' // Use smooth scrolling behavior.
                    });
                });
            });
        }

        function fancybox() {
            Fancybox.bind("[data-fancybox]");
        }

    });
}