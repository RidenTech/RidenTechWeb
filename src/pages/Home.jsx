import Hero from '@/components/Hero'
import About from '@/components/About';
import Services from '@/components/Services';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import MarqueeSection from '@/components/MarqueeSection';

export default function Home() {
    return (
        <>
            <Hero />
            <MarqueeSection />
            <About />
            <Services />
            <Blog />
            <FAQ />
        </>
    );
}
