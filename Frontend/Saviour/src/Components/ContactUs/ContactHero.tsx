import { FiMail, FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";

const ContactHero = () => {
  return (
    <div className="flex flex-col items-start justify-center pt-2">
      {/* Support Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6 shadow-2xs">
        <FiMessageSquare className="w-3.5 h-3.5" />
        <span>Contact Support</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
        How can we help you today?
      </h1>

      {/* Subtitle */}
      <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-xl">
        Our dedicated patient support and medical coordination team is here to assist you 24/7 with appointments, questions, and care navigation.
      </p>

      {/* Contact Channels */}
      <div className="space-y-6 w-full max-w-lg">
        {/* Email */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <FiMail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-1">
              Email
            </span>
            <a
              href="mailto:support@saviour.care"
              className="text-base font-bold text-gray-900 hover:text-blue-600 transition"
            >
              support@saviour.care
            </a>
          </div>
        </div>

        {/* Urgent Care Hotline */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <FiPhone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-1">
              Urgent Care Hotline
            </span>
            <a
              href="tel:+18004325847"
              className="text-base font-bold text-gray-900 hover:text-blue-600 transition"
            >
              +1 (800) 432-5847
            </a>
          </div>
        </div>

        {/* Clinical Headquarters */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <FiMapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-1">
              Clinical Headquarters
            </span>
            <p className="text-base font-bold text-gray-900 leading-snug">
              123 Medical Center Blvd, Suite 400<br />
              Silicon Valley, CA 94043 United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
