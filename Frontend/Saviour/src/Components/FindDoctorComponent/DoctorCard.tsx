import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import API_URL from "../../api";

export interface Doctor {
    _id?: string;
    name: string;
    specialization: string;
    image: string;
    ratings?: number;
    location?: string;
    fee?: number;
    available?: boolean | string;
}

interface DoctorCardProps {
    doctors: Doctor[];
    loading?: boolean;
}

const DoctorCard = ({ doctors, loading }: DoctorCardProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (doctors.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
                <p className="text-xl font-bold text-slate-700 mb-2">No doctors found</p>
                <p className="text-slate-500 text-sm">
                    Try adjusting your search keywords or clearing some filters.
                </p>
            </div>
        );
    }

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((item, index) => {
                    const imageSrc = item.image?.startsWith("http")
                        ? item.image
                        : item.image
                            ? `${API_URL}${item.image}`
                            : "https://via.placeholder.com/300x300?text=Doctor";

                    return (
                        <div
                            key={item._id || index}
                            className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
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
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.available !== false && item.available !== "false"
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
                                    <span className="text-slate-500">{item.location || "Hospital"}</span>
                                    {item.fee && (
                                        <span className="font-semibold text-slate-800">${item.fee}</span>
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
        </section>
    );
};

export default DoctorCard;