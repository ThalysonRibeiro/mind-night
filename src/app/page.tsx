import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import ParticlesBackground from "@/components/particlesBackground";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";

export default function Home() {

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <ParticlesBackground />
      <main className="relative inset-0 space-y-6 z-10 flex flex-col items-center">
        <Header />
        <Hero />
        <Features />
        <div className="w-full">
          <Pricing />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </div>
  );
}
