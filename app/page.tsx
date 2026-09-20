import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { About } from "@/components/sections/about";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ServiceAreas } from "@/components/sections/service-areas";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { MediaWarmup } from "@/components/media-warmup";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <WhyChooseUs />
        <ServiceAreas />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MediaWarmup />
    </>
  );
}
