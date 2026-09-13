import search from '../assets/LandingPage/search.png';
import review from '../assets/LandingPage/review.png';
import calendar from '../assets/LandingPage/calendar.png';

interface StepItem {
  step: string;
  title: string;
  description: string;
  picture: string;
}

const Work = () => {
  const steps: StepItem[] = [
    {
      step: 'Step 01',
      title: 'Browse Doctors',
      description: 'Search top-rated specialists by medical field, hospital, or symptoms.',
      picture: search,
    },
    {
      step: 'Step 02',
      title: 'Read Reviews',
      description: 'Check authentic patient ratings, verified reviews, and doctor profiles.',
      picture: review,
    },
    {
      step: 'Step 03',
      title: 'Book An Appointment',
      description: 'Select a convenient time slot for in-person clinic or instant online care.',
      picture: calendar,
    },
  ];

  return (
    <section className="my-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold tracking-wider uppercase mb-3">
          Simple 3-Step Process
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          How It Works
        </h2>
        <p className="text-gray-600 text-base">
          Connecting with the right healthcare professional is fast, easy, and hassle-free.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => {
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center bg-gradient-to-b from-[#F0F7FF] to-[#E3F2FD] border border-blue-100 rounded-2xl p-8 lg:p-9 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Step Pill */}
              <span className="text-xs font-bold text-blue-600 bg-white/90 px-3 py-1 rounded-full uppercase tracking-wider mb-5 shadow-2xs border border-blue-100">
                {item.step}
              </span>

              {/* Icon Frame */}
              <div className="w-24 h-24 rounded-2xl bg-white shadow-xs border border-blue-50 flex items-center justify-center p-4 mb-6 group-hover:scale-105 transition-transform duration-300">
                <img
                  className="w-14 h-14 object-contain"
                  src={item.picture}
                  alt={item.title}
                />
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;