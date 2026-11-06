import React from 'react';
import { BookingProvider } from './context/BookingContext.jsx';
import Loader from './components/Loader.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Navbar from './components/Navbar.jsx';
import StickyCta from './components/StickyCta.jsx';
import BookingModal from './components/BookingModal.jsx';
import Marquee from './components/Marquee.jsx';

// Sections in rhythm order
import HeroSection from './sections/HeroSection.jsx';
import ReelsSection from './sections/ReelsSection.jsx';
import GallerySection from './sections/GallerySection.jsx';
import FlashSection from './sections/FlashSection.jsx';
import HealedSection from './sections/HealedSection.jsx';
import ArtistSection from './sections/ArtistSection.jsx';
import StylesSection from './sections/StylesSection.jsx';
import PricingSection from './sections/PricingSection.jsx';
import AftercareSection from './sections/AftercareSection.jsx';
import ReviewsSection from './sections/ReviewsSection.jsx';
import InstagramSection from './sections/InstagramSection.jsx';
import FooterSection from './sections/FooterSection.jsx';

export default function App() {
  return (
    <BookingProvider>
      {/* Skip Link for Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Screen Loader: Ink Counter with Split Curtain */}
      <Loader />

      {/* Fixed Scroll-Driven Progress Bar */}
      <ProgressBar />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content with strict section colour rhythm */}
      <main id="main-content">
        {/* 1. Hero (void bg) */}
        <HeroSection />

        {/* 2. Marquee (blood band) */}
        <Marquee
          items={[
            "FINE LINE",
            "BLACK & GREY",
            "BLACKWORK",
            "REALISM",
            "TRADITIONAL"
          ]}
          speed="24s"
          variant="blood"
        />

        {/* 3. Reels (char bg) */}
        <ReelsSection />

        {/* 4. Gallery (void bg) */}
        <GallerySection />

        {/* 5. Flash (paper bg) */}
        <FlashSection />

        {/* 6. Healed (void bg) */}
        <HealedSection />

        {/* 7. Artist (char bg) */}
        <ArtistSection />

        {/* 8. Styles (void bg) */}
        <StylesSection />

        {/* 9. Pricing (paper bg) */}
        <PricingSection />

        {/* 10. Aftercare (void bg) */}
        <AftercareSection />

        {/* 11. Reviews (char bg) */}
        <ReviewsSection />

        {/* 12. Instagram (void bg) */}
        <InstagramSection />
      </main>

      {/* 13. Footer / Final CTA (blood bg) */}
      <FooterSection />

      {/* Mobile/Tablet Fixed Sticky CTA */}
      <StickyCta />

      {/* Native Dialog Booking Modal */}
      <BookingModal />
    </BookingProvider>
  );
}
