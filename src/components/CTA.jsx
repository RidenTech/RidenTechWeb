// components/CTA.jsx
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animation
      tl.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Badge animation
      tl.fromTo(badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Title animation
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        "-=0.4"
      );

      // Description animation
      tl.fromTo(descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Button animation
      tl.fromTo(buttonRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.2"
      );

      // Continuous floating animation for badge
      gsap.to(badgeRef.current, {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Gradient Background Container - Black/White theme */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
        <div 
          className="w-full max-w-6xl mx-auto h-full bg-black rounded-2xl md:rounded-3xl "
          style={{ 
            minHeight: '320px',
            maxHeight: '420px',
            width: 'calc(100% - 2rem)',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-800/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gray-800/30 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="px-4 md:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div 
            ref={badgeRef}
            className="inline-flex items-center bg-gray-800 text-gray-300 rounded-full px-4 py-2 mb-6 border border-gray-700"
          >
            <Sparkles className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-xs font-manrope tracking-wider">LIMITED SPOTS</span>
          </div>

          {/* Title */}
          <h2 
            ref={titleRef}
            className="font-marcellus text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          >
            Ready to <span className="text-gray-400 italic">Launch?</span>
          </h2>

          {/* Description */}
          <p 
            ref={descriptionRef}
            className="font-instrument text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
          >
            Join 100+ founders who launched in 4 weeks. Let's build something great together.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef} className="flex justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/20 font-manrope"
            >
              <span className="relative z-10">Book Free Call</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}