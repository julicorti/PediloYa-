import React, { useEffect, useState } from "react";

const CarouselProd = () => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [currentMargin, setCurrentMargin] = useState(0);
    const [slidesPerPage, setSlidesPerPage] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [prevKeyActive, setPrevKeyActive] = useState(false);
    const [nextKeyActive, setNextKeyActive] = useState(true);

    useEffect(() => {
        // Simulating document.getElementById() in React
        const container = document.getElementById('container');
        const slider = document.getElementById('slider');
        const slides = document.getElementsByClassName('slide').length;
        const buttons = document.getElementsByClassName('btn');

        function setParams(w) {
            if (w < 551) {
                setSlidesPerPage(1);
            } else if (w < 901) {
                setSlidesPerPage(2);
            } else if (w < 1101) {
                setSlidesPerPage(3);
            } else {
                setSlidesPerPage(4);
            }

            setSlidesCount(slides - slidesPerPage);

            if (currentPosition > slidesCount) {
                setCurrentPosition(currentPosition - slidesPerPage);
            }

            const newCurrentMargin = -currentPosition * (100 / slidesPerPage);
            setCurrentMargin(newCurrentMargin);

            slider.style.marginLeft = newCurrentMargin + '%';

            if (currentPosition > 0) {
                buttons[0].classList.remove('inactive');
            }

            if (currentPosition < slidesCount) {
                buttons[1].classList.remove('inactive');
            }

            if (currentPosition >= slidesCount) {
                buttons[1].classList.add('inactive');
            }
        }

        window.addEventListener("resize", () => {
            setContainerWidth(container.offsetWidth);
            setParams(containerWidth);
        });

        // Initialize the parameters
        setParams(container.offsetWidth);

        return () => {
            window.removeEventListener("resize", () => {
                setContainerWidth(container.offsetWidth);
                setParams(containerWidth);
            });
        };

    }, [currentPosition, currentPosition]);

    const slideRight = () => {
        if (currentPosition !== 0) {
            const newCurrentMargin = currentMargin + (100 / slidesPerPage);
            slider.style.marginLeft = newCurrentMargin + '%';
            setCurrentMargin(newCurrentMargin);
            setCurrentPosition(currentPosition - 1);
        }

        if (currentPosition === 0) {
            document.getElementsByClassName('btn')[0].classList.add('inactive');
        }

        if (currentPosition < slidesCount) {
            document.getElementsByClassName('btn')[1].classList.remove('inactive');
        }
    };

    const slideLeft = () => {
        if (currentPosition !== slidesCount) {
            const newCurrentMargin = currentMargin - (100 / slidesPerPage);
            slider.style.marginLeft = newCurrentMargin + '%';
            setCurrentMargin(newCurrentMargin);
            setCurrentPosition(currentPosition + 1);
        }

        if (currentPosition === slidesCount) {
            document.getElementsByClassName('btn')[1].classList.add('inactive');
        }

        if (currentPosition > 0) {
            document.getElementsByClassName('btn')[0].classList.remove('inactive');
        }
    };

    // You can return your JSX here
}

export default CarouselProd;
