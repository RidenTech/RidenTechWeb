import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import Blog from "@/components/Blog";
import Technologies from "@/components/Technologies";
import WhyChooseUs from "@/components/WhyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "software-development",
        number: "01",
        title: "Software Development",
        description: "Custom software solutions built with modern frameworks like React, Next.js, and Node.js. Scalable architecture that grows with your business and user base.",
        image: "/softdev.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
        color: "from-blue-900 to-blue-700",
        slug: "software-development",
        category: "Development",
        align: "left"
    },
    {
        id: "website-development",
        number: "02",
        title: "Website Development",
        description: "Progressive Web Apps that work offline and load instantly on any device. Responsive designs that provide a native app-like experience in the browser.",
        image: "/webdev.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
        color: "from-emerald-900 to-emerald-700",
        slug: "website-development",
        category: "Development",
        align: "right"
    },
    {
        id: "mobile-app-development",
        number: "03",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android. Seamless user experiences with smooth animations and intuitive interfaces.",
        image: "/mobdev.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
        color: "from-purple-900 to-purple-700",
        slug: "mobile-app-development",
        category: "Development",
        align: "left"
    },
    {
        id: "api-systems-integration",
        number: "04",
        title: "API & Systems Integration",
        description: "Connect your applications with third-party services and internal systems. RESTful and GraphQL APIs designed for scalability and security.",
        image: "/api.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        color: "from-amber-900 to-amber-700",
        slug: "api-systems-integration",
        category: "Development",
        align: "right"
    },
    {
        id: "ai-machine-learning",
        number: "05",
        title: "AI & Machine Learning",
        description: "Integrate powerful AI features into your applications. Custom machine learning models tailored to your specific business needs.",
        image: "/aiml.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        color: "from-indigo-900 to-indigo-700",
        slug: "ai-machine-learning",
        category: "Development",
        align: "left"
    },
    {
        id: "cloud-architecture",
        number: "06",
        title: "Cloud Architecture",
        description: "Scalable cloud infrastructure on AWS, Google Cloud, or Azure. Cost-effective solutions with high availability and global distribution.",
        image: "/cloud.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop",
        color: "from-sky-900 to-sky-700",
        slug: "cloud-architecture",
        category: "Cloud & Infrastructure",
        align: "right"
    },
    {
        id: "devops-automation",
        number: "07",
        title: "DevOps & Automation",
        description: "Streamlined development pipelines for faster deployments. Automated testing and continuous integration for reliable environments.",
        image: "/devops.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2070&auto=format&fit=crop",
        color: "from-orange-900 to-orange-700",
        slug: "devops-automation",
        category: "Cloud & Infrastructure",
        align: "left"
    },
    {
        id: "cloud-workspace-management",
        number: "08",
        title: "Cloud Workspace Management",
        description: "Efficient management of cloud-based workspaces and virtual environments. Secure remote access solutions for distributed teams.",
        image: "/cloudwork.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        color: "from-teal-900 to-teal-700",
        slug: "cloud-workspace-management",
        category: "Cloud & Infrastructure",
        align: "right"
    },
    {
        id: "managed-it-services",
        number: "09",
        title: "Managed IT Services",
        description: "Comprehensive IT infrastructure management and support. Proactive monitoring and maintenance to prevent downtime.",
        image: "/maintain.jpg",
        fallbackImage: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-gray-900 to-gray-700",
        slug: "managed-it-services",
        category: "Cloud & Infrastructure",
        align: "left"
    },
    {
        id: "database-architecture",
        number: "10",
        title: "Database Architecture",
        description: "Efficient database design for optimal performance and scalability. SQL and NoSQL solutions based on your data requirements.",
        image: "/database.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
        color: "from-cyan-900 to-cyan-700",
        slug: "database-architecture",
        category: "Cloud & Infrastructure",
        align: "right"
    },
    {
        id: "ui-ux-design",
        number: "11",
        title: "UI/UX Design",
        description: "Beautiful, intuitive designs that users love to interact with. User-centered design approach focused on conversion and engagement.",
        image: "/uxui.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1964&auto=format&fit=crop",
        color: "from-rose-900 to-rose-700",
        slug: "ui-ux-design",
        category: "Design & Marketing",
        align: "left"
    },
    {
        id: "social-media-management",
        number: "12",
        title: "Social Media Management",
        description: "Strategic social media presence building and management. Engaging content creation and community management.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
        fallbackImage: "https://images.unsplash.com/photo-1611926653458-09294b3152ea?q=80&w=2070&auto=format&fit=crop",
        color: "from-pink-900 to-pink-700",
        slug: "social-media-management",
        category: "Design & Marketing",
        align: "right"
    },
    {
        id: "seo-growth-strategy",
        number: "13",
        title: "SEO & Growth Strategy",
        description: "Data-driven SEO strategies to improve search rankings. Content optimization and keyword research for organic growth.",
        image: "/seo.png",
        fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        color: "from-green-900 to-green-700",
        slug: "seo-growth-strategy",
        category: "Design & Marketing",
        align: "left"
    },
    {
        id: "digital-marketing",
        number: "14",
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategies tailored to your goals. PPC campaigns, email marketing, and conversion optimization.",
        image: "/marketing.png",
        fallbackImage: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2006&auto=format&fit=crop",
        color: "from-red-900 to-red-700",
        slug: "digital-marketing",
        category: "Design & Marketing",
        align: "right"
    },
    {
        id: "content-writing",
        number: "15",
        title: "Content Writing",
        description: "Strategic content creation that engages and converts. SEO-optimized blog posts, articles, and web copy.",
        image: "/content.png",
        fallbackImage: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop",
        color: "from-yellow-900 to-yellow-700",
        slug: "content-writing",
        category: "Design & Marketing",
        align: "left"
    },
    {
        id: "ecommerce-solutions",
        number: "16",
        title: "E-Commerce Solutions",
        description: "Custom online stores with secure payment processing. Inventory management, order tracking, and customer accounts.",
        image: "/ecommerce.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
        color: "from-violet-900 to-violet-700",
        slug: "ecommerce-solutions",
        category: "Business Solutions",
        align: "right"
    },
    {
        id: "business-process-outsourcing",
        number: "17",
        title: "Business Process Outsourcing",
        description: "Streamline operations with expert BPO services. Cost-effective solutions for non-core business functions.",
        image: "/cta.png",
        fallbackImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
        color: "from-fuchsia-900 to-fuchsia-700",
        slug: "business-process-outsourcing",
        category: "Business Solutions",
        align: "left"
    }
];

export default function ServicesPage() {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const [imageErrors, setImageErrors] = useState({});
    const [activeHoverIndex, setActiveHoverIndex] = useState(null);
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);
    const hoverTl = useRef({});

    useEffect(() => {
        setMounted(true);

        if (window.location.hash) {
            const serviceId = window.location.hash.replace('#', '');
            setTimeout(() => {
                scrollToService(serviceId);
            }, 500);
        }
    }, []);

    const scrollToService = (serviceId) => {
        const element = document.getElementById(serviceId);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            element.style.transition = 'all 0.3s ease';
            element.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1), 0 0 0 4px rgba(59,130,246,0.5)';
            setTimeout(() => {
                element.style.boxShadow = '';
            }, 2000);
        }
    };

    const handleImageError = (serviceId) => {
        setImageErrors(prev => ({
            ...prev,
            [serviceId]: true
        }));
    };

    const getImageSource = (service) => {
        if (imageErrors[service.id]) {
            return service.fallbackImage;
        }
        return service.image;
    };

    const groupedServices = services.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {});

    const resetAllCards = (excludeIndex = null) => {
        itemsRef.current.forEach((card, idx) => {
            if (excludeIndex !== null && idx === excludeIndex) return;
            if (!card) return;

            const image = card.querySelector('.card-image');
            const number = card.querySelector('.service-number');
            const content = card.querySelector('.card-content');
            const title = card.querySelector('.service-title');
            const button = card.querySelector('.explore-button');
            const arrow = card.querySelector('.arrow-icon');

            if (hoverTl.current[idx]) {
                hoverTl.current[idx].kill();
            }

            const tl = gsap.timeline();

            if (image) tl.to(image, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (number) tl.to(number, { opacity: 0.2, scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (content) tl.to(content, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
            if (title) tl.to(title, { color: "#111827", duration: 0.3, ease: "power1.out" }, 0);
            if (button) tl.to(button, { backgroundColor: "#111827", scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            if (arrow) tl.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" }, 0);

            tl.to(card, {
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderColor: "#E5E7EB",
                duration: 0.3,
                ease: "power2.out"
            }, 0);

            hoverTl.current[idx] = tl;
        });
    };

    const handleMouseEnter = (index) => {
        resetAllCards(index);
        setActiveHoverIndex(index);

        const card = itemsRef.current[index];
        if (!card) return;

        const image = card.querySelector('.card-image');
        const number = card.querySelector('.service-number');
        const content = card.querySelector('.card-content');
        const title = card.querySelector('.service-title');
        const button = card.querySelector('.explore-button');
        const arrow = card.querySelector('.arrow-icon');

        if (hoverTl.current[index]) {
            hoverTl.current[index].kill();
        }

        const tl = gsap.timeline();

        if (image) tl.to(image, { scale: 1.15, duration: 0.5, ease: "power2.out" }, 0);
        if (number) tl.to(number, { opacity: 0.3, scale: 1.1, duration: 0.4, ease: "power2.out" }, 0);
        if (content) tl.to(content, { y: -5, duration: 0.4, ease: "power2.out" }, 0);
        if (title) tl.to(title, { color: "#4B5563", duration: 0.3, ease: "power1.out" }, 0);
        if (button) tl.to(button, { backgroundColor: "#1F2937", scale: 1.05, duration: 0.3, ease: "back.out(1.2)" }, 0.1);
        if (arrow) tl.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" }, 0.1);

        tl.to(card, {
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderColor: "#9CA3AF",
            duration: 0.3,
            ease: "power2.out"
        }, 0);

        hoverTl.current[index] = tl;
    };

    const handleMouseLeave = () => {
        // Let the next hover handle reset
    };

    const handleCardClick = (serviceTitle, serviceId) => {
        navigate(`/contact?service=${encodeURIComponent(serviceTitle)}&id=${serviceId}`);
    };

    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            const validItems = itemsRef.current.filter(Boolean);
            if (validItems.length > 0) {
                gsap.set(validItems, { opacity: 1, y: 0 });
                gsap.fromTo(validItems,
                    { y: 60, opacity: 1 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-white">
            <Helmet>
                <title>Our Services | RidenTech</title>
                <meta name="description" content="Explore our wide range of software development, cloud architecture, and digital marketing services." />
            </Helmet>
            <HeroSection
                title="WHAT WE DO"
                subtitle="Transforming ideas into exceptional digital experiences"
            />

            <section ref={sectionRef} className="pb-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {Object.entries(groupedServices).map(([category, categoryServices]) => (
                        <div key={category} className="mb-12 last:mb-0">
                            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                                {categoryServices.map((service) => {
                                    const globalIndex = services.findIndex(s => s.id === service.id);
                                    const isEven = globalIndex % 2 === 0;

                                    return (
                                        <div
                                            id={service.id}
                                            key={service.id}
                                            ref={el => itemsRef.current[globalIndex] = el}
                                            className={`group relative bg-white rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-gray-200 cursor-pointer transition-all duration-300 ${activeHoverIndex === globalIndex ? 'z-10 shadow-xl' : 'z-0'
                                                }`}
                                            onClick={() => handleCardClick(service.title, service.id)}
                                            onMouseEnter={() => handleMouseEnter(globalIndex)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                                <div className="relative w-full lg:w-5/12 h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[300px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                                    <img
                                                        src={getImageSource(service)}
                                                        alt={service.title}
                                                        className="card-image w-full h-full object-cover object-center"
                                                        onError={() => handleImageError(service.id)}
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-60 mix-blend-multiply`}></div>
                                                    <div className={`service-number absolute bottom-2 md:bottom-3 ${isEven ? 'right-2 md:right-3' : 'left-2 md:left-3'}`}>
                                                        <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-marcellus font-black text-white/20">
                                                            {service.number}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="card-content w-full lg:w-7/12 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col justify-center bg-white">
                                                    <h3 className="service-title font-marcellus text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 mb-2">
                                                        {service.title}
                                                    </h3>
                                                    <p className="font-instrument text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                                                        {service.description}
                                                    </p>
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center pt-4">
                                                        <Link
                                                            to={`/contact?service=${encodeURIComponent(service.title)}&id=${service.id}`}
                                                            className="explore-button flex items-center gap-2 font-semibold text-xs bg-gray-900 text-white px-3 py-3 sm:px-4 sm:py-4 rounded-full hover:bg-gray-800 transition-colors duration-300"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <span className="font-manrope whitespace-nowrap">Discuss This Service</span>
                                                            <div className="arrow-icon w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                                <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-900" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <WhyChooseUs />
            <Technologies />
            <Blog />
        </main>
    );
}
