import {
    FaHeartbeat,
    FaChartLine,
    FaShoppingCart,
    FaTruck,
    FaGraduationCap,
    FaBuilding,
    FaHotel,
    FaHandsHelping,
    FaHospital,
    FaUniversity
} from "react-icons/fa";
import {
    Database, Shield, Zap, BarChart, Smartphone, Lock, Globe, Map, Settings, Award, Heart, Clock, Users, TrendingUp
} from "lucide-react";

export const industries = [
    {
        id: 1,
        number: "01",
        title: "Healthcare & Life Sciences",
        subtitle: "Smart Healthcare Solutions for Better Patient Outcomes",
        description: "We deliver HIPAA-compliant solutions, telemedicine platforms, and medical research tools that transform patient care and streamline clinical workflows. Our technology empowers healthcare providers to focus on what matters most - patient health.",
        icon: <FaHospital className="w-6 h-6" />,
        image: "/healthcare.jpg",
        fallbackImage: "https://images.pexels.com/photos/7088536/pexels-photo-7088536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-blue-900 to-blue-700",
        slug: "healthcare-life-sciences",
        align: "left",
        features: [
            { title: "Hospital Information Systems", icon: <Database className="w-4 h-4" />, description: "Integrated healthcare management" },
            { title: "Data Security & Compliance", icon: <Shield className="w-4 h-4" />, description: "HIPAA-compliant infrastructure" },
            { title: "Process Automation", icon: <Zap className="w-4 h-4" />, description: "Streamlined clinical workflows" },
            { title: "Analytics & AI", icon: <BarChart className="w-4 h-4" />, description: "Predictive healthcare insights" }
        ],
        solutions: [
            "EMR/EHR Systems", "Telemedicine Platforms", "Patient Portals",
            "Billing & Claims", "Inventory Management", "Appointment Scheduling",
            "Lab Systems", "Healthcare Analytics", "Mobile Health Apps",
            "Clinical Decision Support", "Remote Patient Monitoring", "Pharmacy Management"
        ],
        stats: [
            { value: 30, suffix: "%", label: "Faster Diagnoses", decimals: 0 },
            { value: 99.9, suffix: "%", label: "Data Accuracy", decimals: 1 },
            { value: 24, suffix: "/7", label: "Patient Access", decimals: 0 }
        ]
    },
    {
        id: 2,
        number: "02",
        title: "Finance & Legal",
        subtitle: "Secure, Scalable Digital Solutions for Financial Institutions",
        description: "Secure banking platforms, fintech solutions, and compliance tools with enterprise-grade security for financial institutions and law firms.",
        icon: <FaUniversity className="w-6 h-6" />,
        image: "/finance.jpg",
        fallbackImage: "https://images.pexels.com/photos/4386328/pexels-photo-4386328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-emerald-900 to-emerald-700",
        slug: "finance-legal",
        align: "right",
        features: [
            { title: "Digital Banking Platforms", icon: <Smartphone className="w-4 h-4" />, description: "Modern banking experiences" },
            { title: "Risk & Compliance", icon: <Shield className="w-4 h-4" />, description: "Regulatory compliance automated" },
            { title: "Automation & AI", icon: <Zap className="w-4 h-4" />, description: "Intelligent process automation" },
            { title: "Data Security", icon: <Lock className="w-4 h-4" />, description: "Enterprise-grade protection" }
        ],
        solutions: [
            "Core Banking Systems", "Payment Gateways", "Fraud Detection",
            "Loan Management Systems", "Mobile Banking Apps", "Financial Analytics",
            "Regulatory Reporting", "Customer Identity Management", "Cloud Banking",
            "Wealth Management", "Trading Platforms", "KYC Solutions"
        ],
        stats: [
            { value: 60, suffix: "%", label: "Faster Transactions", decimals: 0 },
            { value: 100, suffix: "%", label: "Compliance", decimals: 0 },
            { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 }
        ]
    },
    {
        id: 3,
        number: "03",
        title: "Retail & E-Commerce",
        subtitle: "Transform Shopping Experiences with Digital Innovation",
        description: "Custom online stores, inventory management, and omnichannel solutions that drive sales and enhance customer experience.",
        icon: <FaShoppingCart className="w-6 h-6" />,
        image: "/commerce.jpg",
        fallbackImage: "https://images.pexels.com/photos/4498127/pexels-photo-4498127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-purple-900 to-purple-700",
        slug: "retail-ecommerce",
        align: "left",
        features: [
            { title: "Omnichannel Commerce", icon: <Globe className="w-4 h-4" />, description: "Unified shopping experience" },
            { title: "Inventory Intelligence", icon: <Database className="w-4 h-4" />, description: "Real-time stock management" },
            { title: "Personalization", icon: <Users className="w-4 h-4" />, description: "AI-driven recommendations" },
            { title: "Analytics & Insights", icon: <BarChart className="w-4 h-4" />, description: "Data-driven decisions" }
        ],
        solutions: [
            "E-Commerce Platforms", "POS Systems", "Inventory Management",
            "Customer Analytics", "Loyalty Programs", "Mobile Commerce",
            "Marketplace Integration", "Order Management", "Supply Chain Optimization",
            "AI Recommendations", "Chat Commerce", "Voice Commerce"
        ],
        stats: [
            { value: 45, suffix: "%", label: "Sales Increase", decimals: 0 },
            { value: 60, suffix: "%", label: "Cart Recovery", decimals: 0 },
            { value: 3, suffix: "x", label: "Customer Engagement", decimals: 0 }
        ]
    },
    {
        id: 4,
        number: "04",
        title: "Logistics & Supply Chain",
        subtitle: "Intelligent Solutions for Modern Supply Chains",
        description: "Fleet management, warehouse optimization, and real-time tracking solutions for maximum operational efficiency.",
        icon: <FaTruck className="w-6 h-6" />,
        image: "/logistics.jpg",
        fallbackImage: "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-amber-900 to-amber-700",
        slug: "logistics-supply-chain",
        align: "right",
        features: [
            { title: "Real-time Tracking", icon: <Globe className="w-4 h-4" />, description: "End-to-end visibility" },
            { title: "Route Optimization", icon: <Map className="w-4 h-4" />, description: "AI-powered routing" },
            { title: "Warehouse Automation", icon: <Settings className="w-4 h-4" />, description: "Smart inventory management" },
            { title: "Predictive Analytics", icon: <BarChart className="w-4 h-4" />, description: "Demand forecasting" }
        ],
        solutions: [
            "Fleet Management", "Warehouse Management", "Route Planning",
            "Inventory Optimization", "Last-Mile Delivery", "Supplier Portals",
            "Blockchain Tracking", "IoT Sensors", "Automated Documentation",
            "Cross-border Compliance", "Returns Management", "Carbon Tracking"
        ],
        stats: [
            { value: 35, suffix: "%", label: "Cost Reduction", decimals: 0 },
            { value: 50, suffix: "%", label: "Faster Delivery", decimals: 0 },
            { value: 99, suffix: "%", label: "Accuracy", decimals: 0 }
        ]
    },
    {
        id: 5,
        number: "05",
        title: "Education & EdTech",
        subtitle: "Shaping the Future of Learning",
        description: "Learning management systems, virtual classrooms, and educational platforms that engage students and facilitate modern learning.",
        icon: <FaGraduationCap className="w-6 h-6" />,
        image: "/education.jpg",
        fallbackImage: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-indigo-900 to-indigo-700",
        slug: "education-edtech",
        align: "left",
        features: [
            { title: "Virtual Learning", icon: <Globe className="w-4 h-4" />, description: "Engaging online classrooms" },
            { title: "Adaptive Learning", icon: <Zap className="w-4 h-4" />, description: "Personalized education paths" },
            { title: "Assessment Tools", icon: <Award className="w-4 h-4" />, description: "Automated testing & grading" },
            { title: "Analytics Dashboard", icon: <BarChart className="w-4 h-4" />, description: "Student performance insights" }
        ],
        solutions: [
            "Learning Management Systems", "Virtual Classrooms", "Student Portals",
            "Course Authoring", "Assessment Platforms", "Video Learning",
            "Mobile Learning Apps", "Gamification", "Parent Engagement",
            "Administrative Tools", "Library Management", "Career Counseling"
        ],
        stats: [
            { value: 40, suffix: "%", label: "Engagement Boost", decimals: 0 },
            { value: 60, suffix: "%", label: "Cost Savings", decimals: 0 },
            { value: 24, suffix: "/7", label: "Learning Access", decimals: 0 }
        ]
    },
    {
        id: 6,
        number: "06",
        title: "Real Estate & Construction",
        subtitle: "Building Tomorrow with Smart Technology",
        description: "Property management platforms, construction tracking, and real estate marketplaces that streamline operations.",
        icon: <FaBuilding className="w-6 h-6" />,
        image: "/realestate.jpg",
        fallbackImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-orange-900 to-orange-700",
        slug: "real-estate-construction",
        align: "right",
        features: [
            { title: "Property Management", icon: <Settings className="w-4 h-4" />, description: "Streamlined operations" },
            { title: "Project Tracking", icon: <Clock className="w-4 h-4" />, description: "Real-time construction monitoring" },
            { title: "Marketplace Platform", icon: <Globe className="w-4 h-4" />, description: "Digital property listings" },
            { title: "Tenant Portals", icon: <Users className="w-4 h-4" />, description: "Enhanced resident experience" }
        ],
        solutions: [
            "Property Management Systems", "Construction Management", "CRM for Real Estate",
            "Virtual Tours", "Document Management", "Maintenance Tracking",
            "Lease Management", "Tenant Portals", "Investment Analytics",
            "Smart Building Integration", "Energy Management", "Safety Compliance"
        ],
        stats: [
            { value: 50, suffix: "%", label: "Faster Leasing", decimals: 0 },
            { value: 30, suffix: "%", label: "Cost Reduction", decimals: 0 },
            { value: 99, suffix: "%", label: "Tenant Satisfaction", decimals: 0 }
        ]
    },
    {
        id: 7,
        number: "07",
        title: "Hospitality & Tourism",
        subtitle: "Creating Memorable Guest Experiences",
        description: "Booking engines, property management systems, and guest experience apps for hotels and travel companies.",
        icon: <FaHotel className="w-6 h-6" />,
        image: "/hospitality.jpg",
        fallbackImage: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-rose-900 to-rose-700",
        slug: "hospitality-tourism",
        align: "left",
        features: [
            { title: "Booking Engine", icon: <Globe className="w-4 h-4" />, description: "Direct booking optimization" },
            { title: "Guest Experience", icon: <Users className="w-4 h-4" />, description: "Personalized service" },
            { title: "Property Management", icon: <Database className="w-4 h-4" />, description: "Streamlined operations" },
            { title: "Revenue Management", icon: <TrendingUp className="w-4 h-4" />, description: "Dynamic pricing" }
        ],
        solutions: [
            "Property Management Systems", "Channel Management", "Booking Engines",
            "Guest Portals", "Loyalty Programs", "Housekeeping Apps",
            "Restaurant Management", "Event Management", "Review Analytics",
            "Concierge Apps", "Mobile Check-in", "Smart Room Controls"
        ],
        stats: [
            { value: 35, suffix: "%", label: "Direct Bookings", decimals: 0 },
            { value: 45, suffix: "%", label: "Guest Satisfaction", decimals: 0 },
            { value: 24, suffix: "/7", label: "Service Access", decimals: 0 }
        ]
    },
    {
        id: 8,
        number: "08",
        title: "Non-Profit & Government",
        subtitle: "Technology for Social Impact",
        description: "Donation platforms, grant management systems, and community engagement tools for social impact.",
        icon: <FaHandsHelping className="w-6 h-6" />,
        image: "/nonprofit.jpg",
        fallbackImage: "https://images.pexels.com/photos/6995222/pexels-photo-6995222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        color: "from-teal-900 to-teal-700",
        slug: "non-profit-government",
        align: "right",
        features: [
            { title: "Donation Platforms", icon: <Heart className="w-4 h-4" />, description: "Secure giving experiences" },
            { title: "Grant Management", icon: <Database className="w-4 h-4" />, description: "Streamlined funding" },
            { title: "Community Engagement", icon: <Users className="w-4 h-4" />, description: "Stakeholder connection" },
            { title: "Impact Reporting", icon: <BarChart className="w-4 h-4" />, description: "Transparent outcomes" }
        ],
        solutions: [
            "Donation Management", "Grant Management Systems", "Volunteer Portals",
            "Event Management", "Constituent CRM", "Program Tracking",
            "Impact Analytics", "Compliance Reporting", "Public Portals",
            "Board Management", "Fundraising Tools", "Awareness Campaigns"
        ],
        stats: [
            { value: 50, suffix: "%", label: "Donation Increase", decimals: 0 },
            { value: 40, suffix: "%", label: "Admin Efficiency", decimals: 0 },
            { value: 100, suffix: "%", label: "Transparency", decimals: 0 }
        ]
    }
];
