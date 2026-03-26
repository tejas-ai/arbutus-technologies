import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

// Lazy load non-critical sections to improve TTI and PageSpeed
const StatsSection = dynamic(() => import("@/components/StatsSection"), { ssr: true });
const MissionSection = dynamic(() => import("@/components/MissionSection"), { ssr: true });
import ProductLineCard from "@/components/ProductLineCard";
const DesignServices = dynamic(() => import("@/components/DesignServices"), { ssr: true });
import BrandPartners from "@/components/BrandPartners";
const TrustSection = dynamic(() => import("@/components/TrustSection"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Page() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <StatsSection />
            <MissionSection />
            <ProductLineCard />
            <DesignServices />
            <BrandPartners />
            <TrustSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
