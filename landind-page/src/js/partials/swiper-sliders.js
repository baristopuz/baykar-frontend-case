// import { Swiper } from "swiper";
import Swiper from "swiper/bundle";
window.Swiper = Swiper;

export function initSliders() {
    const sliders = {
        thumb: [],
        normal: []
    };

    const initializedSliders = {
        thumb: [],
        normal: []
    };

    const sliderSelector = '.js-swiper-container';
    const defaultOptions = {
        slidesPerView: 1,
        spaceBetween: 15,
        centeredSlides: false,
        loop: false,
        autoHeight: false,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: false,
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        on: {
            init: () => {
                console.log('Swiper initialized');
            }
        }
    };

    const swiperTemplates = {
        blog: {
            slidesPerView: 1.2,
            spaceBetween: 15,
            grabCursor: true,
            autoplay: {
                delay: 5500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2.2
                },
                768: {
                    slidesPerView: 3.1
                },
                1024: {
                    slidesPerView: 3.2
                }
            },
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        }
    };

    const sliderElements = document.querySelectorAll(sliderSelector);

    sliderElements.forEach((sliderElement, index) => {
        const data = sliderElement.getAttribute('data-swiper') || {};
        const dataTemplate = sliderElement.getAttribute('data-swiper-template') || null;
        const swiperType = sliderElement.getAttribute('data-swiper-type') || null;
        let dataOptions = null;

        if (dataTemplate && dataTemplate in swiperTemplates) {
            dataOptions = swiperTemplates[dataTemplate];
        } else {
            dataOptions = JSON.parse(data);
        }

        const options = { ...defaultOptions, ...dataOptions };
        sliderElement.options = options;

        const createdSlider = {
            element: sliderElement,
            options: options,
            title: sliderElement.getAttribute('data-swiper-title') || null
        };

        if (swiperType === 'thumb') {
            sliders.thumb.push(createdSlider);
        } else {
            sliders.normal.push(createdSlider);
        }
    });

    sliders.thumb.forEach((item, index) => {
        const swiper = new Swiper(item.element, item.options);
        initializedSliders.thumb.push({
            swiper: swiper,
            title: item.title
        });
    });

    sliders.normal.forEach((item, index) => {
        if (item.options.thumbSwiperTitle) {
            const thumbSwiper = initializedSliders.thumb.find(thumbItem => thumbItem.title === item.options.thumbSwiperTitle);
            if (thumbSwiper) {
                item.options.thumbs = {
                    swiper: thumbSwiper.swiper
                };
            }
        }

        const swiper = new Swiper(item.element, item.options);
        initializedSliders.normal.push({
            swiper: swiper,
            title: item.title
        });
    });
}
