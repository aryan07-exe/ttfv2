import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ThreeDCarousel.css';

// Import images
import img1 from '../images/bali1.jpg';
import img2 from '../images/bali2.jpg';
import img3 from '../images/adv1.jpg';
import img4 from '../images/adv2.jpg';
import img5 from '../images/adv3.jpg';
import img6 from '../images/adv4.jpg';
import img7 from '../images/adv5.jpg';
import img8 from '../images/japan1.jpg';
import img9 from '../images/japan2.jpg';
import img10 from '../images/k1.jpg';

gsap.registerPlugin(ScrollTrigger);

const ThreeDCarousel = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const finaleRef = useRef(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const cellCount = images.length;
  const radius = 600; // Distance from center

  useEffect(() => {
    const carousel = carouselRef.current;
    const cells = carousel.querySelectorAll('.carousel__cell');
    
    // Position each cell in a 3D circle
    cells.forEach((cell, i) => {
      const angle = (360 / cellCount) * i;
      cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // Create the scroll-linked timeline with maximum smoothness
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=900%', // Optimized length: long enough for smooth spin, but ends right after reveal
        pin: true,
        scrub: 4, 
        anticipatePin: 1, 
      }
    });

    // 1. Spinning & Tilting Animation - Integrated Journey
    tl.to(carousel, {
      rotationY: -720,  // Continuous spin throughout
      z: -1000,
      duration: 1, 
      ease: 'power1.inOut', 
    }, 0);

    // Subtle tilt change during middle
    tl.to(carousel, {
      rotationX: -15,
      rotationZ: 8,
      duration: 0.5,
      ease: "sine.inOut"
    }, 0.2);

    // 2. Individual Card Dynamic Lighting
    cells.forEach((cell, i) => {
      const card = cell.querySelector('.card');
      tl.fromTo(card, 
        { filter: 'brightness(0.3) contrast(1.2) scale(0.9)' },
        { 
          filter: 'brightness(1.8) contrast(1) scale(1)',
          duration: 0.12, 
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut"
        }, 
        (i / cellCount) * 0.65
      );
    });

    // 3. THE FINALE: Seamless Horizontal Tilt & Reveal
    // Start tilting much earlier but slower to avoid jarring movement
    tl.to(carousel, {
        rotationX: -95, 
        z: -2000,
        duration: 0.45,
        ease: "power2.inOut"
    }, 0.55); 

    tl.fromTo(finaleRef.current,
        { opacity: 0, scale: 1.2, y: 150, filter: 'blur(40px)' },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 0.35, 
          ease: "power4.out" 
        },
        0.65 // Reveal starts mid-tilt for a dynamic feel
    );


    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [cellCount]);

  return (
    <div className="three-d-carousel-container" ref={containerRef}>
      <div className="scene">
        <div className="carousel" ref={carouselRef}>
          {images.map((img, i) => (
            <div key={`cell-${i}`} className="carousel__cell">
              <div className="card">
                <img src={img} alt={`Slide ${i}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="final-logo-overlay" ref={finaleRef}>
        <h1 className="final-logo-title">
          <span className="logo-main">Ttf</span>
          <span className="logo-accent">Holidays</span>
        </h1>
        <p className="final-logo-subtitle">Elevating Your Journey</p>
      </div>

      <div className="scroll-hint">
        <span>Scroll to spin</span>
        <div className="scroll-bar"></div>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
