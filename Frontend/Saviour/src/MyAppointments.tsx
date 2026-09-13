import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
    FiCalendar, 
    FiMapPin, 
    FiUser, 
    FiPhone, 
    FiMail, 
    FiCheckCircle, 
    FiTrash2, 
    FiRefreshCw, 
    FiPlus
} from "react-icons/fi";
import Navbar from "./Components/Navbar";
import { useAuth } from "./context/AuthContext";

interface DoctorData {
    _id: string;
    name: string;
    specialization: string;
    image?: string;
    location?: string;
    fee?: number;
}

interface AppointmentItem {
    _id: string;
    name: string;
    dob?: string;
    email: string;
    phone: string;
    appointmentdate: string;
    address?: string;
    gender?: string;
    doctorId?: DoctorData | string;
    createdAt?: string;
}

const MyAppointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    const fetchAppointments = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("user_token") || localStorage.getItem("token") || "";
            const userEmail = user?.email || "";
            
            const params = userEmail ? { email: userEmail } : {};
            const response = await axios.get("http://localhost:8000/api/v1/patient", {
                params,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });

            setAppointments(response.data?.patients || []);
        } catch (err: any) {
            console.error("Error fetching appointments:", err);
            setError(err.response?.data?.message || "Failed to load your appointments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [user?.email]);

    const handleCancelAppointment = async (id: string, patientName: string) => {
        if (!window.confirm(`Are you sure you want to cancel the appointment for ${patientName}?`)) {
            return;
        }

        setCancellingId(id);
        try {
            await axios.delete(`http://localhost:8000/api/v1/patient/${id}`);
            setAppointments((prev) => prev.filter((item) => item._id !== id));
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to cancel appointment.");
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-2">
                            <FiCheckCircle size={13} />
                            <span>Confirmed Bookings</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            My Appointments
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base mt-1">
                            {user?.email 
                                ? `Showing all confirmed appointments registered under ${user.email}` 
                                : "View and manage all your scheduled doctor appointments."}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={fetchAppointments}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition cursor-pointer shadow-2xs disabled:opacity-50"
                        >
                            <FiRefreshCw className={loading ? "animate-spin" : ""} size={15} />
                            <span>Refresh</span>
                        </button>
                        <Link
                            to="/finddoctor"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-xs cursor-pointer"
                        >
                            <FiPlus size={16} />
                            <span>Book New</span>
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center justify-between shadow-xs">
                        <span>{error}</span>
                        <button
                            type="button"
                            onClick={fetchAppointments}
                            className="text-xs font-bold underline hover:text-red-900 ml-3"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Content Section */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
                        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-500 font-medium text-sm mt-4">Loading your confirmed appointments...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="text-center py-20 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                            <FiCalendar size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No appointments found</h3>
                        <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto">
                            {user?.email 
                                ? "You haven't scheduled any doctor visits yet." 
                                : "No confirmed appointments were found. Book your first appointment today!"}
                        </p>
                        <Link
                            to="/finddoctor"
                            className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
                        >
                            <FiPlus size={16} />
                            <span>Find a Doctor & Book</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appointments.map((app) => {
                            const doctor = typeof app.doctorId === "object" ? app.doctorId : null;
                            const doctorImage = doctor?.image
                                ? doctor.image.startsWith("http")
                                    ? doctor.image
                                    : `http://localhost:8000${doctor.image}`
                                : null;

                            return (
                                <div
                                    key={app._id}
                                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Card Header & Status */}
                                    <div className="p-6 pb-4">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                    {doctorImage ? (
                                                        <img
                                                            src={doctorImage}
                                                            alt={doctor?.name || "Doctor"}
                                                            className="w-full h-full object-cover object-top"
                                                        />
                                                    ) : (
                                                        <FiUser className="text-blue-600" size={22} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                                                        {doctor?.name || "Specialist Doctor"}
                                                    </h3>
                                                    <p className="text-xs text-blue-600 font-medium">
                                                        {doctor?.specialization || "Medical Consultation"}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold shrink-0">
                                                <FiCheckCircle size={12} />
                                                <span>Confirmed</span>
                                            </span>
                                        </div>

                                        {/* Appointment Date & Location Badge */}
                                        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2 text-xs">
                                            <div className="flex items-center gap-2 text-slate-800 font-semibold">
                                                <FiCalendar className="text-blue-600 shrink-0" size={15} />
                                                <span>{app.appointmentdate}</span>
                                            </div>
                                            {(doctor?.location || app.address) && (
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <FiMapPin className="text-slate-400 shrink-0" size={15} />
                                                    <span className="truncate">{doctor?.location || app.address}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Patient Details */}
                                        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <FiUser className="text-slate-400 shrink-0" size={13} />
                                                <span className="truncate"><strong className="text-slate-700">Patient:</strong> {app.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiPhone className="text-slate-400 shrink-0" size={13} />
                                                <span className="truncate"><strong className="text-slate-700">Phone:</strong> {app.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:col-span-2">
                                                <FiMail className="text-slate-400 shrink-0" size={13} />
                                                <span className="truncate"><strong className="text-slate-700">Email:</strong> {app.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer / Actions */}
                                    <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                                        <span className="font-mono text-slate-400">
                                            ID: #{app._id.slice(-8).toUpperCase()}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => handleCancelAppointment(app._id, app.name)}
                                            disabled={cancellingId === app._id}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition cursor-pointer disabled:opacity-50"
                                        >
                                            {cancellingId === app._id ? (
                                                <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <FiTrash2 size={13} />
                                                    <span>Cancel</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyAppointments;
