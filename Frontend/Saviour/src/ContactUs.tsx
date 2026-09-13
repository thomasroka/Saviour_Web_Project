import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactHero from "./Components/ContactUs/ContactHero";
import ContactForm from "./Components/ContactUs/ContactForm";
import TrustedPartners from "./Components/ContactUs/TrustedPartners";
import FaqSection from "./Components/ContactUs/FaqSection";
import CtaBanner from "./Components/ContactUs/CtaBanner";

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      {/* 1. Header Navbar */}
      <Navbar />

      <main className="w-full">
        {/* 2. Contact Hero & Interactive Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <ContactHero />
            </div>
            <div className="lg:col-span-6 w-full">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* 3. Trusted Healthcare Networks */}
        <TrustedPartners />

        {/* 4. Frequently Asked Questions */}
        <FaqSection />

        {/* 5. Pre-Footer Call to Action */}
        <CtaBanner />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;