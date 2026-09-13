import Testimo from "./Testimo";
import person1 from '../assets/LandingPage/person1.jpg';
import person2 from '../assets/LandingPage/person2.jpg';
import person3 from '../assets/LandingPage/person3.jpg';
import person4 from '../assets/LandingPage/person4.jpg';
import person5 from '../assets/LandingPage/person5.jpg';
import person6 from '../assets/LandingPage/person6.jpg';

const Testimonal = () => {
    const reviews = [
        { name: "Pooja Shrestha", location: "Patan, Lalitpur", comment: "The doctor was extremely patient, detailed, and reassuring. Highly recommended!", image: person2 },
        { name: "Bikash Adhikari", location: "Pokhara, Kaski", comment: "Booking hospital visits used to take hours. Now it is seamless and stress-free.", image: person1 },
        { name: "Sneha KC", location: "Thamel, Kathmandu", comment: "Verified reviews helped me choose the right dermatologist with complete peace of mind.", image: person3 },
        { name: "Deepak Gurung", location: "Dharan, Sunsari", comment: "The emergency appointment booking connected me with a physician late at night.", image: person4 },
        { name: "Ram Aryal", location: "Basundhara, Kathmandu", comment: "Saviour made finding a specialist effortless. I booked in under 2 minutes.", image: person5 },
        { name: "Aarati Magar", location: "Butwal, Rupandehi", comment: "Clean interface, fast loading, and highly professional medical practitioners.", image: person6 }
    ];

    return (
        <section className="my-20">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto px-6 mb-12">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold tracking-wider uppercase mb-3">
                    Happy Patients
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                    What Our Patients Are Saying
                </h2>
                <p className="text-gray-600 text-base">
                    Real stories and feedback from patients who found quality care with Saviour.
                </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="overflow-hidden space-y-6">
                <div className="flex w-max gap-8 animate-scroll-left">
                    <div className="flex gap-16 pr-8">
                        {reviews.map((rev, i) => <Testimo key={i} {...rev} />)}
                    </div>
                    <div className="flex gap-16 pr-8">
                        {reviews.map((rev, i) => <Testimo key={`duplicate-${i}`} {...rev} />)}
                    </div>
                </div>
                <div className="flex w-max gap-8 animate-scroll-right">
                    <div className="flex gap-16 pr-8">
                        {reviews.map((rev, i) => <Testimo key={`right1-${i}`} {...rev} />)}
                    </div>
                    <div className="flex gap-16 pr-8">
                        {reviews.map((rev, i) => <Testimo key={`right2-${i}`} {...rev} />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonal;