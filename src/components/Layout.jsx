import { Helmet } from 'react-helmet-async';
import Navbar from "./Navbar";
import Footer from './Footer';
import CTA from "./CTA";

export default function Layout({ children }) {
    return (
        <>
            <Helmet>
                <title>RidenTech - Innovative Software Solutions</title>
                <meta name="description" content="RidenTech delivers cutting-edge software solutions including custom development, web & PWA engineering, mobile apps, cloud architecture, and AI/ML integration. Transform your business with our expert team." />
                <meta name="keywords" content="software development, web development, mobile app development, cloud architecture, AI machine learning, UI UX design, API integration, DevOps automation, digital solutions, technology consulting" />
                <meta name="theme-color" content="#000000" />

                {/* Open Graph */}
                <meta property="og:title" content="RidenTech - Innovative Software Solutions" />
                <meta property="og:description" content="Transform your business with cutting-edge software solutions from RidenTech. Expert team delivering custom development, cloud architecture, AI/ML, and more." />
                <meta property="og:url" content="https://ridentech.ca" />
                <meta property="og:site_name" content="RidenTech" />
                <meta property="og:type" content="website" />

                {/* Additional meta tags */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="RidenTech" />
            </Helmet>

            <div className="font-instrument antialiased">
                <Navbar />
                <main className="pt-20">{children}</main>
                <CTA />
                <Footer />
            </div>
        </>
    );
}
