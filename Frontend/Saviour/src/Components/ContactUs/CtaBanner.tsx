import { Link } from "react-router-dom";

const CtaBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl">
        {/* Background dot pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            Connecting you with trusted doctors & top hospitals across Nepal
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-8 max-w-xl">
            From Kathmandu to Pokhara, Chitwan, and all 7 provinces — access verified doctors anytime.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/finddoctor"
              className="px-6 py-3.5 bg-white text-blue-700 hover:bg-gray-100 font-bold text-sm sm:text-base rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
