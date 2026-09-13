const TrustedPartners = () => {
  return (
    <section className="w-full py-12 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">
          Trusted by leading healthcare networks and medical centers nationwide
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">

          {/* Mayo Clinic */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-bold text-xl md:text-2xl transition">
            <span className="text-2xl font-black">H</span>
            <span className="tracking-wide">MAYO CLINIC</span>
          </div>

          {/* Cleveland Clinic */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-bold text-lg md:text-xl transition">
            <div className="w-6 h-6 border-2 border-gray-700 flex items-center justify-center text-xs font-black">C</div>
            <span>Cleveland Clinic</span>
          </div>

          {/* Kaiser Permanente */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-black text-lg md:text-xl transition">
            <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-black">✚</div>
            <span className="tracking-wider uppercase">Kaiser</span>
          </div>

          {/* Johns Hopkins */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-bold text-lg md:text-xl transition">
            <span className="text-xl">⬡</span>
            <span className="tracking-wider uppercase">Johns Hopkins</span>
          </div>

          {/* Mount Sinai */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-bold text-lg md:text-xl transition">
            <span className="text-xl">▲▼</span>
            <span className="tracking-wide">Mount Sinai</span>
          </div>

          {/* Stanford Health */}
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-bold text-lg md:text-xl transition">
            <span className="text-xl">🌲</span>
            <span className="tracking-wider uppercase">Stanford Health</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
