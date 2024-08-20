import React, { useState } from 'react';
import img from "../../img/comidafondo.jpg";
import img2 from "../../img/buffetfoto.jpg";
import "../../SASS/style.css";
 
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        img,
        img2,
        img,
        img2,
        img
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div 
            id="indicators-carousel" 
            style={{
                width: '100%',
                height: '75vh', // Ajusta el valor para cambiar la altura
                position: 'relative'
            }}
        >
            {/* Carousel wrapper */}
            <div 
                style={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '0.5rem'
                }}
            >
                {slides.map((src, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            transition: 'opacity 0.7s ease-in-out',
                            opacity: index === currentIndex ? 1 : 0
                        }}
                    >
                        <img id='img'
                            src={src} 
                            alt={`Slide ${index + 1}`} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                backgroundSize: 'cover'
                            }} 
                        />
                    </div>
                ))}
            </div>
            {/* Slider indicators */}
            <div 
                style={{
                    position: 'absolute',
                    zIndex: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    bottom: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        style={{
                            width: '0.75rem',
                            height: '0.75rem',
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? '#3b82f6' : '#d1d5db',
                            margin: '0 0.25rem'
                        }}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => handleIndicatorClick(index)}
                    ></button>
                ))}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '1rem',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                }}
                onClick={handlePrev}
            >
                <span 
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        transition: 'background-color 0.3s',
                        ':hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }
                    }}
                >
                    <svg 
                        style={{
                            width: '1rem',
                            height: '1rem',
                            color: 'white'
                        }} 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 6 10"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 1 1 5l4 4" 
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '1rem',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                }}
                onClick={handleNext}
            >
                <span 
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        transition: 'background-color 0.3s',
                        ':hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }
                    }}
                >
                    <svg 
                        style={{
                            width: '1rem',
                            height: '1rem',
                            color: 'white'
                        }} 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 6 10"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="m1 9 4-4-4-4" 
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
