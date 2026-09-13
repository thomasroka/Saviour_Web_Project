import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    FiCalendar, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiArrowLeft
} from "react-icons/fi";
import Navbar from "./Components/Navbar";
import { useAuth } from "./context/AuthContext";
import type { Doctor } from "./Components/FindDoctorComponent/DoctorCard";

const defaultDoctor: Doctor = {
    name: "Dr. Sarah Jenkins, MD",
    specialization: "Board Certified Dermatologist",
    image: "",
    ratings: 4.9,
    location: "Kathmandu, Nepal",
    fee: 150,
};

const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

const AppointmentBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Doctor passed from navigation state or fallback
    const selectedDoctor: Doctor = location.state?.doctor || defaultDoctor;

    const [fullName, setFullName] = useState(user?.name || "");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(selectedDoctor.location || "Kathmandu, Nepal");
    const [gender, setGender] = useState<"male" | "female" | "other">("other");
    
    // Appointment Schedule Details
    const [appointmentDate, setAppointmentDate] = useState(getTodayString());
    const [appointmentTime, setAppointmentTime] = useState("10:00 AM - 10:30 AM");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [bookedPatient, setBookedPatient] = useState<any>(null);

    // If user logs in or changes, prefill email & name
    useEffect(() => {
        if (user) {
            if (!email && user.email) setEmail(user.email);
            if (!fullName && user.name) setFullName(user.name);
        }
    }, [user, email, fullName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!fullName.trim() || !email.trim() || !phone.trim() || !appointmentDate) {
            setError("Please fill in all required fields (Name, Email, Phone, and Appointment Date).");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("user_token") || localStorage.getItem("token") || "";
            const payload = {
                name: fullName.trim(),
                dob: dob.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
                gender,
                appointmentdate: `${appointmentDate} • ${appointmentTime}`,
                doctorId: selectedDoctor._id,
            };

            const response = await axios.post("http://localhost:8000/api/v1/patient", payload, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });

            setBookedPatient(response.data?.patient || payload);
            setSuccess(true);
        } catch (err: any) {
            console.error("Booking error:", err);
            const msg = err.response?.data?.message || "Failed to schedule appointment. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                {/* Back navigation */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition cursor-pointer"
                >
                    <FiArrowLeft size={16} />
                    <span>Back</span>
                </button>

                {/* Main Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Book an Appointment
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base mt-1.5">
                        Complete the following steps to schedule your visit.
                    </p>

                    {/* Doctor Info Pill */}
                    {selectedDoctor.name && (
                        <div className="mt-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-blue-50/80 border border-blue-100 rounded-full text-xs sm:text-sm text-blue-900 font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            <span>Doctor: <strong className="font-semibold text-blue-950">{selectedDoctor.name}</strong></span>
                            {selectedDoctor.specialization && (
                                <span className="text-blue-600">({selectedDoctor.specialization})</span>
                            )}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center justify-between shadow-xs">
                        <span className="flex items-center gap-2">
                            <FiAlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                            {error}
                        </span>
                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="text-red-400 hover:text-red-600 font-bold ml-2 text-lg leading-none cursor-pointer"
                        >
                            &times;
                        </button>
                    </div>
                )}

                {/* Patient Information Form Card */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                    {/* Section Header with Step Badge */}
                    <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm shrink-0">
                            2
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                            Patient Information
                        </h2>
                    </div>

                    <form id="appointment-form" onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Aarav Sharma"
                                        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Date of Birth (Opens Calendar) */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Date of Birth
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        onClick={(e) => e.currentTarget.showPicker?.()}
                                        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Email Address */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="aarav.sharma@example.com"
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition"
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="98XXXXXXXX / +977-9801234567"
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Appointment Date & Time Section (Opens Calendar) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                    <FiCalendar className="text-blue-600" size={14} />
                                    <span>Appointment Date *</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={getTodayString()}
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                    onClick={(e) => e.currentTarget.showPicker?.()}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition cursor-pointer font-medium"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Preferred Time Slot
                                </label>
                                <select
                                    value={appointmentTime}
                                    onChange={(e) => setAppointmentTime(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition cursor-pointer font-medium"
                                >
                                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                                    <option value="01:00 PM - 01:30 PM">01:00 PM - 01:30 PM</option>
                                    <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                                    <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
                                    <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
                                    <option value="05:00 PM - 05:30 PM">05:00 PM - 05:30 PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                            {/* Address */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Address (City, Nepal)
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Kathmandu, Nepal"
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-slate-700 mb-1.5">
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition cursor-pointer"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other / Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button Below Form */}
                        <div className="pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-base"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <span>Schedule appointment</span>
                                )}
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            {/* Success Modal Popup */}
            {success && (
                <div 
                    className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSuccess(false)}
                >
                    <div 
                        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSuccess(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
                            aria-label="Close popup"
                        >
                            &times;
                        </button>

                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
                            <FiCheckCircle size={36} />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900">
                            Appointment is Confirmed
                        </h3>
                        
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                            Your appointment has been successfully booked with <strong className="font-semibold text-slate-800">{selectedDoctor.name}</strong>.
                        </p>

                        <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs space-y-2.5">
                            {bookedPatient?._id && (
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                    <span className="text-slate-500 font-medium">Booking ID:</span>
                                    <span className="font-mono font-bold text-blue-600">#{bookedPatient._id.slice(-8).toUpperCase()}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Doctor:</span>
                                <span className="font-semibold text-slate-800">{selectedDoctor.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Date & Time:</span>
                                <span className="font-semibold text-slate-800">{appointmentDate} • {appointmentTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Patient:</span>
                                <span className="font-semibold text-slate-800">{fullName} ({phone})</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Email:</span>
                                <span className="font-semibold text-slate-800">{email}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setSuccess(false);
                                    navigate("/");
                                }}
                                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-xl transition cursor-pointer text-sm shadow-sm"
                            >
                                Go to Home
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSuccess(false);
                                    navigate("/finddoctor");
                                }}
                                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition cursor-pointer text-sm"
                            >
                                Find More Doctors
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentBooking;

