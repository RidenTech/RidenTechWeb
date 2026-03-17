import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Calendar, Clock, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts, categories } from "@/data/blogData";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const badgeRef = useRef(null);
    const filterRef = useRef(null);
    const rowsRef = useRef([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, filterRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.fromTo(badgeRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            gsap.fromTo(titleRef.current,
                { y: 200, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    }
                }
            );

            gsap.fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none"
                    }
                }
            );

            gsap.fromTo(filterRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                        toggleActions: "play none none none"
                    }
                }
            );

            rowsRef.current.forEach(row => {
                if (row) {
                    gsap.set(row.children, {
                        opacity: 0,
                        y: 50
                    });
                }
            });

            rowsRef.current.forEach((row) => {
                if (row) {
                    gsap.to(row.children, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            end: "bottom 20%",
                            toggleActions: "play none none none"
                        }
                    });
                }
            });

            gsap.to(badgeRef.current, {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getRows = (posts) => {
        const rows = [];
        for (let i = 0; i < posts.length; i += 3) {
            rows.push(posts.slice(i, i + 3));
        }
        return rows;
    };

    const rows = getRows(filteredPosts);

    return (
        <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div ref={badgeRef} className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                        <span className="w-2 h-2 bg-gray-900 rounded-full mr-2"></span>
                        <span className="text-sm font-manrope text-gray-700 tracking-wide">OUR BLOG</span>
                    </div>

                    <div className="relative mb-6 flex justify-center">
                        <h1
                            ref={titleRef}
                            className="font-manrope text-[13vw] md:text-[13vw] lg:text-[13vw] font-black uppercase text-gray-900 leading-[0.85] tracking-tight"
                        >
                            NEWS & BLOG
                        </h1>
                    </div>

                    <p ref={subtitleRef} className="font-instrument text-xl text-gray-600 max-w-2xl mx-auto">
                        Insights, stories, and updates from our team
                    </p>
                </div>

                <div ref={filterRef} className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-manrope font-medium transition-all duration-300 ${activeCategory === category
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 font-manrope text-gray-900"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="space-y-8 mt-16">
                        {rows.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                ref={el => rowsRef.current[rowIndex] = el}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {row.map((post) => (
                                    <Link
                                        to={`/blogs/${post.slug}`}
                                        key={post.id}
                                        className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-gray-400"
                                    >
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-manrope font-semibold uppercase tracking-wider rounded-full shadow-lg">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-3 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm font-manrope">{post.day} {post.month}, {post.year}</span>
                                                </div>
                                            </div>

                                            <h3 className="font-marcellus text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                                                {post.title}
                                            </h3>

                                            <p className="font-instrument text-gray-600 text-sm mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-left justify-between mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                                    <span className="font-manrope text-sm font-medium">Read More</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-instrument text-xl text-gray-500">No articles found matching your criteria.</p>
                    </div>
                )}

                <div className="w-full mt-16 h-px bg-gray-200"></div>
            </div>
        </section>
    );
}
