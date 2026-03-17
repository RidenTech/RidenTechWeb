import { Helmet } from 'react-helmet-async';
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import Technologies from "@/components/Technologies";
import Blog from "@/components/Blog";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Helmet>
                <title>About Us | RidenTech</title>
                <meta name="description" content="Learn about RidenTech's mission, team, and commitment to delivering innovative software solutions." />
            </Helmet>
            <HeroSection
                title="ABOUT US"
                subtitle="Innovating technology solutions that help businesses grow faster, operate smarter, and stay ahead in a competitive digital landscape."
                primaryCta={{ text: "Meet the Team", href: "/team" }}
            />
            <AboutUs />
            <Technologies />
            <Blog />
        </main>
    );
}
