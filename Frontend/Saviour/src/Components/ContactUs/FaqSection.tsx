import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiExternalLink } from "react-icons/fi";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does Saviour verify doctor credentials in Nepal?",
      answer:
        "Every medical practitioner on Saviour is strictly verified against the Nepal Medical Council (NMC) registration database, hospital appointments, and verified specialty qualifications before onboarding.",
    },
    {
      question: "Does Saviour support government health insurance or SSF (Social Security Fund)?",
      answer:
        "Yes! Many of our partner hospitals and clinics support the Nepal Health Insurance Board (Swasthya Bima Board) and SSF claims. You can view insurance eligibility on the doctor's profile.",
    },
    {
      question: "What digital payment methods are accepted in Nepal?",
      answer:
        "We support seamless digital payments via eSewa, Khalti, Fonepay / QR, and ConnectIPS, as well as direct cash payment at hospital reception counters.",
    },
    {
      question: "Can patients outside Kathmandu Valley book telemedicine consultations?",
      answer:
        "Yes, our high-definition telemedicine consultation service allows patients from all 7 provinces (Pokhara, Chitwan, Biratnagar, Butwal, Nepalgunj, Dhangadhi, and rural districts) to consult premier specialists.",
    },
    {
      question: "How do I cancel or reschedule my appointment?",
      answer:
        "You can easily cancel or reschedule your consultation with zero penalty up to 2 hours before the scheduled slot directly from your Saviour 'My Appointments' portal.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold tracking-wider uppercase mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Find answers to common questions about specialists, insurance coverage, and appointment scheduling.
          </p>
          
          <Link 
            to="/finddoctor" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm"
          >
            <span>Help Center</span>
            <FiExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? "border-blue-200 bg-white shadow-sm" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:text-blue-600 transition gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <span className="p-1 rounded-full text-gray-500 shrink-0">
                    {isOpen ? <FiMinus className="w-5 h-5 text-blue-600" /> : <FiPlus className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/60 mt-1 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
