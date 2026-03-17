import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const headingLinesRef = useRef([]);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const imageRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial fade in for the whole section
      if (heroRef.current) {
        tl.fromTo(heroRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        );
      }

      // Badge animation
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Heading lines stagger animation
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(validHeadingLines,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power4.out"
          },
          "-=0.4"
        );
      }

      // Description animation
      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      // Buttons container fade in
      if (buttonsRef.current) {
        tl.fromTo(buttonsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.4"
        );
      }

      // Button 1 animation
      if (button1Ref.current) {
        tl.fromTo(button1Ref.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
      }

      // Button 2 animation
      if (button2Ref.current) {
        tl.fromTo(button2Ref.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }

      // Image animation with clip path reveal
      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          {
            opacity: 0,
            scale: 0.95
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          },
          "-=0.8"
        );
      }

      // Subtle floating animation for image (only on desktop)
      if (window.innerWidth >= 1024 && imageRef.current) {
        gsap.to(imageRef.current, {
          y: 10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [mounted]);

  // Initial mount trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <section ref={heroRef} className="relative bg-white overflow-hidden" />;

  return (
    <section ref={heroRef} className="relative bg-white min-h-screen lg:min-h-0 overflow-hidden">
      {/* Background decorative elements - visible on all screens */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop: side-by-side, Mobile: stacked */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="w-full space-y-4 md:space-y-6 py-12 md:py-16 lg:py-20 text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center bg-gray-100 rounded-full px-3 md:px-4 lg:px-4 py-1.5 md:py-2 lg:py-2 mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2 lg:h-2 bg-gray-900 rounded-full mr-1.5 md:mr-2 lg:mr-2"></span>
              <span className="text-xs md:text-sm lg:text-sm font-manrope text-gray-700 tracking-wide">WELCOME TO RIDEN TECH</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-manrope text-3xl font-bold md:text-4xl lg:text-6xl text-gray-900 leading-tight">
              <span ref={el => headingLinesRef.current[0] = el} className="block">Transform Your</span>
              <span ref={el => headingLinesRef.current[1] = el} className="block text-gray-700">Business with</span>
              <span ref={el => headingLinesRef.current[2] = el} className="block relative">
                Innovative Software
              </span>
            </h1>

            {/* Description */}
            <p ref={descriptionRef} className="font-instrument text-base md:text-lg lg:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              We craft cutting-edge digital solutions that drive growth, enhance efficiency, and transform complex challenges into seamless digital experiences.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 md:gap-4 lg:gap-4 justify-center lg:justify-start">
              <Link
                ref={button1Ref}
                to="/contact"
                className="group inline-flex items-center space-x-2 bg-gray-900 text-white px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 font-manrope"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                ref={button2Ref}
                to="/services"
                className="group inline-flex items-center space-x-2 bg-white text-gray-900 px-5 md:px-8 lg:px-8 py-2.5 md:py-4 lg:py-4 rounded-lg text-xs md:text-sm lg:text-sm font-medium border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg font-manrope"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Container */}
          <div className="w-full flex justify-center items-center pb-12 lg:pb-0 lg:py-8">
            <div
              className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[550px] aspect-[1.1/1]"
            >
              {/* Main Image Container with Clip Path - Now properly contained */}
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: 'url(#heroClipPath)',
                  WebkitClipPath: 'url(#heroClipPath)',
                }}
              >
                {/* IT-Related Image */}
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/hero.jpg')"
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive SVG ClipPath Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0.037 0.082 L 0.37 0.082 A 0.037 0.041 0 0 0 0.407 0.041 L 0.407 0.041 A 0.037 0.041 0 0 1 0.444 0 L 0.963 0 A 0.037 0.041 0 0 1 1 0.041 L 1 0.959 A 0.037 0.041 0 0 1 0.963 1 L 0.037 1 A 0.037 0.041 0 0 1 0 0.959 L 0 0.122 A 0.037 0.041 0 0 1 0.037 0.082 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};

export default Hero;