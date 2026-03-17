import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { blogPosts } from "@/data/blogData";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function Blog() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef([]);
  const scrollContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const draggableInstance = useRef(null);

  const [scrollLength, setScrollLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const recentPosts = [...blogPosts].sort((a, b) => b.id - a.id).slice(0, 6);

  const [mounted, setMounted] = useState(false);
  const pinContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check screen size
  useEffect(() => {
    if (!mounted) return;
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [mounted]);

  // Calculate scroll width for all devices
  useEffect(() => {
    if (!mounted) return;
    const updateScrollLength = () => {
      if (!trackRef.current || !sectionRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = isMobile || isTablet
        ? window.innerWidth - 48
        : stickyRef.current
          ? sectionRef.current.offsetWidth - stickyRef.current.offsetWidth
          : sectionRef.current.offsetWidth;

      // More accurate scroll length calculation
      const newScrollLength = Math.max(0, trackWidth - containerWidth);
      setScrollLength(newScrollLength);

      // Reset position if out of bounds
      if (currentPosition < -newScrollLength) {
        setCurrentPosition(-newScrollLength);
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: -newScrollLength });
        }
      }

      ScrollTrigger.refresh();
    };

    updateScrollLength();
    window.addEventListener("resize", updateScrollLength);
    return () => window.removeEventListener("resize", updateScrollLength);
  }, [isMobile, isTablet, mounted, currentPosition]);

  // Handle side button navigation
  const scrollTo = (direction) => {
    if (!trackRef.current || !scrollContainerRef.current) return;

    const cardWidth = isMobile ? 280 : 300;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    let newPosition;
    if (direction === 'prev') {
      newPosition = Math.min(currentPosition + scrollAmount, 0);
    } else {
      newPosition = Math.max(currentPosition - scrollAmount, -scrollLength);
    }

    setCurrentPosition(newPosition);

    gsap.to(trackRef.current, {
      x: newPosition,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true // Prevent animation conflicts
    });
  };

  // GSAP animations
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      // Set initial opacity to 1 for buttons
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 1, y: 0 });
      }
      if (mobileButtonRef.current) {
        gsap.set(mobileButtonRef.current, { opacity: 1, y: 0 });
      }
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 1, y: 0 });
      }

      // Title and content animations
      const elementsToAnimate = [badgeRef.current, titleRef.current, textRef.current].filter(Boolean);

      if (elementsToAnimate.length > 0) {
        gsap.from(elementsToAnimate, {
          y: isMobile ? 20 : 60,
          opacity: 0,
          duration: isMobile ? 0.6 : 1,
          stagger: isMobile ? 0.1 : 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Animate stats separately
      if (statsRef.current.length > 0) {
        gsap.from(statsRef.current, {
          y: isMobile ? 20 : 60,
          opacity: 0,
          duration: isMobile ? 0.6 : 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Desktop horizontal scroll animation
      if (!isMobile && !isTablet && scrollLength > 0 && pinContainerRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollLength + 100}`,
          scrub: 1.2,
          pin: pinContainerRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: gsap.to(trackRef.current, {
            x: () => -scrollLength,
            ease: "none",
            overwrite: true
          })
        });
      }

      // Card entrance animations
      const cards = trackRef.current ? Array.from(trackRef.current.children).filter(Boolean) : [];
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            scale: isMobile ? 0.95 : 0.9,
            x: isMobile ? 30 : 100
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: isMobile ? 0.5 : 0.8,
            stagger: isMobile ? 0.08 : 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // Initialize draggable for mobile/tablet
      if ((isMobile || isTablet) && trackRef.current && scrollContainerRef.current) {
        // Kill any existing draggable instance
        if (draggableInstance.current) {
          draggableInstance.current.kill();
        }

        draggableInstance.current = Draggable.create(trackRef.current, {
          type: "x",
          edgeResistance: 0.65,
          bounds: {
            minX: -scrollLength,
            maxX: 0
          },
          inertia: true,
          onDrag: function () {
            setCurrentPosition(this.x);
          },
          onDragEnd: function () {
            // Smooth snap after drag
            gsap.to(trackRef.current, {
              x: this.x,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true
            });
          }
        })[0];
      }

    }, sectionRef);

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current || t.pin === pinContainerRef.current) t.kill();
      });
    };
  }, [scrollLength, isMobile, isTablet, mounted]);

  if (!mounted) return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-white to-gray-50 relative"
    >
      <div className="w-full h-screen overflow-hidden relative"></div>
    </section>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white relative"
    >
      <div
        ref={pinContainerRef}
        className={`w-full ${isMobile || isTablet ? 'py-10' : 'h-screen'} overflow-hidden relative`}
      >
        {/* Desktop Layout */}
        {!isMobile && !isTablet && (
          <div className="flex h-full relative z-10">
            {/* LEFT CONTENT - Fixed width 30vw */}
            <div
              ref={stickyRef}
              className="w-[30vw] min-w-[30vw] max-w-[30vw] px-10 sticky left-0 top-0 h-full flex flex-col justify-center bg-white z-20"
            >
              {/* Floating Badge */}
              <div
                ref={badgeRef}
                className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg w-fit"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-manrope font-medium tracking-wide">LATEST NEWS</span>
              </div>

              {/* Title */}
              <h2
                ref={titleRef}
                className="font-manrope font-bold text-5xl md:text-6xl text-gray-900 mb-4 leading-tight"
              >
                News &
                <span className="text-gray-700"> Blog</span>
              </h2>

              {/* Description */}
              <p
                ref={textRef}
                className="font-instrument text-gray-600 max-w-md mb-10 leading-relaxed text-lg"
              >
                Discover strategies, ideas, and insights from our team to help your
                brand grow, innovate, and succeed in the digital world.
              </p>

              {/* CTA Button - Desktop */}
              <Link
                ref={buttonRef}
                to="/blogs"
                className="group relative inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 font-manrope w-fit"
              >
                <span className="relative z-10">View All News</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>

            {/* BLOG CARDS - Takes remaining width */}
            <div
              ref={trackRef}
              className="flex-1 flex gap-8 ml-10 pr-40 items-center overflow-visible"
              style={{
                width: "calc(70vw - 2.5rem)", // 70vw minus ml-10 (2.5rem)
                willChange: "transform"
              }}
            >
              {recentPosts.map((post) => (
                <Link
                  to={`/blogs/${post.slug}`}
                  key={post.id}
                  className="group w-[380px] flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-gray-400"
                  style={{
                    minWidth: "380px",
                    maxWidth: "380px"
                  }}
                >
                  {/* IMAGE */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-manrope font-semibold uppercase tracking-wider rounded-full shadow-lg border border-gray-200">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col h-[220px]">
                    <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm font-manrope">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{post.day} {post.month}, {post.year}</span>
                      </div>
                    </div>

                    <h3 className="font-instrument text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="font-instrument text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        <span className="font-manrope text-sm font-medium">Read</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Layout */}
      {(isMobile || isTablet) && (
        <div className="relative z-10">
          {/* Title Section */}
          <div className="text-center mb-8 px-4">
            <div
              ref={badgeRef}
              className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg mx-auto w-fit"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-manrope font-medium tracking-wide">LATEST NEWS</span>
            </div>

            <h2
              ref={titleRef}
              className="font-manrope font-bold text-5xl md:text-6xl text-gray-900 mb-3 leading-tight"
            >
              News & <span className="text-gray-700">Blog</span>
            </h2>

            <p
              ref={textRef}
              className="font-instrument text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed text-base"
            >
              Discover expert insights, strategies, and ideas from our team to help your business grow, innovate, and succeed in the digital world.
            </p>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              ref={prevButtonRef}
              onClick={() => scrollTo('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPosition >= 0}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              ref={nextButtonRef}
              onClick={() => scrollTo('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPosition <= -scrollLength}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-hidden hide-scrollbar"
            >

              {/* Cards Track - NO CSS TRANSITION */}
              <div
                ref={trackRef}
                className="flex gap-4 px-4 cursor-grab active:cursor-grabbing"
                style={{
                  width: "fit-content",
                  transform: `translateX(${currentPosition}px)`,
                  willChange: "transform" // Optimize for animations
                  // REMOVED: transition property
                }}
              >
                {recentPosts.map((post) => (
                  <Link
                    to={`/blogs/${post.slug}`}
                    key={post.id}
                    className="group bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0"
                    style={{
                      width: isMobile ? "280px" : "300px",
                      minWidth: isMobile ? "280px" : "300px",
                      maxWidth: isMobile ? "280px" : "300px"
                    }}
                  >
                    {/* IMAGE */}
                    <div className="relative h-40 sm:h-44 w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-manrope rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col" style={{ height: "180px" }}>
                      <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-manrope">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.day} {post.month}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="font-instrument text-base font-bold text-gray-900 mb-2 line-clamp-1">
                        {post.title}
                      </h3>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-manrope text-xs text-gray-500 line-clamp-1">
                            {post.author}
                          </span>
                        </div>

                        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-700 transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button - Mobile */}
          <div className="text-center mt-10 px-4">
            <Link
              ref={mobileButtonRef}
              to="/blogs"
              className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg font-manrope"
            >
              View All Blogs
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}