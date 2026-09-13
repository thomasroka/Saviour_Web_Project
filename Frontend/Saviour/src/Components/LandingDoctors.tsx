import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import person1 from '../assets/LandingPage/person1.jpg';
import person2 from '../assets/LandingPage/person2.jpg';
import person3 from '../assets/LandingPage/person3.jpg';
import person4 from '../assets/LandingPage/person4.jpg';
import type { Doctor } from "./FindDoctorComponent/DoctorCard";

const fallbackDoctors: Doctor[] = [
    {
        name: 'Dr. Ram Bahadur Xettri',
        specialization: 'Gastroenterologist',
        image: person1,
        ratings: 4.9,
        location: 'Kathmandu Clinic',
        fee: 500,
        available: true,
    },
    {
        name: 'Dr. Sarah Jenkins',
        specialization: 'Cardiologist',
        image: person2,
        ratings: 4.8,
        location: 'City Heart Center',
        fee: 650,
        available: true,
    },
    {
        name: 'Dr. Ananya Sharma',
        specialization: 'Dermatologist',
        image: person3,
        ratings: 5.0,
        location: 'Skin Health Hub',
        fee: 600,
        available: true,
    },
    {
        name: 'Dr. Michael Chen',
        specialization: 'Neurologist',
        image: person4,
        ratings: 4.7,
        location: 'Metro Neuro Hospital',
        fee: 750,
        available: true,
    },
];

const LandingDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>(fallbackDoctors);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        axios
            .get("http://localhost:8000/api/v1/doctor")
            .then((res) => {
                if (!isCancelled && res.data?.doctors && res.data.doctors.length > 0) {
                    setDoctors(res.data.doctors);
                }
            })
            .catch(() => {
                // fallback doctors already set
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    const updateScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
    };

    return (
        <section className="mb-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold tracking-wider uppercase mb-2">
                        Top Specialists
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Best Doctors
                    </h2>
                </div>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:flex gap-2">
                    <button
                        type="button"
                        onClick={handleScrollLeft}
                        disabled={!canScrollLeft}
                        aria-label="Previous doctors"
                        className="text-slate-700 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-700 transition cursor-pointer disabled:cursor-not-allowed active:scale-95"
                    >
                        <CiCircleChevLeft size={44} />
                    </button>
                    <button
                        type="button"
                        onClick={handleScrollRight}
                        disabled={!canScrollRight}
                        aria-label="Next doctors"
                        className="text-slate-700 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-700 transition cursor-pointer disabled:cursor-not-allowed active:scale-95"
                    >
                        <CiCircleChevRight size={44} />
                    </button>
                </div>
            </div>

            {/* Doctors Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={updateScrollButtons}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 [&::-webkit-scrollbar]:hidden"
            >
                {doctors.map((item, index) => {
                    const imageSrc = item.image?.startsWith("http") || item.image?.startsWith("data:")
                        ? item.image
                        : item.image?.startsWith("/uploads")
                        ? `http://localhost:8000${item.image}`
                        : item.image || person1;

                    return (
                        <div
                            key={item._id || index}
                            className="min-w-[280px] sm:min-w-[300px] max-w-[320px] flex-1 shrink-0 flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
                        >
                            <div className="w-full h-60 p-4 pb-0 bg-slate-50">
                                <img
                                    className="rounded-xl h-full w-full object-cover object-top"
                                    src={imageSrc}
                                    alt={item.name}
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <p className="font-bold text-lg mb-1 text-slate-800">{item.name}</p>
                                <p className="text-blue-600 font-medium text-sm mb-3">
                                    {item.specialization}
                                </p>

                                <div className="flex justify-between items-center text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                                        <FaStar className="text-amber-400 text-sm" />
                                        {item.ratings ?? 4.8}
                                    </span>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            item.available !== false && item.available !== "false"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-red-50 text-red-600"
                                        }`}
                                    >
                                        {item.available !== false && item.available !== "false"
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span className="text-slate-500 truncate mr-2">{item.location || "Hospital"}</span>
                                    {item.fee && (
                                        <span className="font-semibold text-slate-800 shrink-0">Rs. {item.fee}</span>
                                    )}
                                </div>

                                <Link
                                    to="/appointment"
                                    state={{ doctor: item }}
                                    className="mt-auto w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-center text-sm flex items-center justify-center cursor-pointer shadow-xs"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex md:hidden gap-4 justify-center mt-6">
                <button
                    type="button"
                    onClick={handleScrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Previous doctors"
                    className="text-slate-700 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer"
                >
                    <CiCircleChevLeft size={44} />
                </button>
                <button
                    type="button"
                    onClick={handleScrollRight}
                    disabled={!canScrollRight}
                    aria-label="Next doctors"
                    className="text-slate-700 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer"
                >
                    <CiCircleChevRight size={44} />
                </button>
            </div>
        </section>
    );
};

export default LandingDoctors;