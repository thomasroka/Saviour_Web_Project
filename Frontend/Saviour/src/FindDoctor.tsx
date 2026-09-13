import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Hero from "./Components/FindDoctorComponent/Hero";
import DoctorFilter from "./Components/FindDoctorComponent/DoctorFilter";
import DoctorCard, { type Doctor } from "./Components/FindDoctorComponent/DoctorCard";

const FindDoctor = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationTerm, setLocationTerm] = useState("");
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch doctors from backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/doctor");
                setDoctors(response.data.doctors || []);
            } catch (err) {
                console.error("Error fetching doctors:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Extract unique specialties from fetched doctors
    const specialties = useMemo(() => {
        const unique = new Set(doctors.map((d) => d.specialization).filter(Boolean));
        return Array.from(unique);
    }, [doctors]);

    // Toggle specialty selection
    const handleToggleSpecialty = (specialty: string) => {
        setSelectedSpecialties((prev) =>
            prev.includes(specialty)
                ? prev.filter((item) => item !== specialty)
                : [...prev, specialty]
        );
    };

    // Clear all active filters
    const handleClearAll = () => {
        setSearchTerm("");
        setLocationTerm("");
        setSelectedSpecialties([]);
    };

    // Filter logic
    const filteredDoctors = useMemo(() => {
        return doctors.filter((doc) => {
            const matchesSearch =
                searchTerm === "" ||
                doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLocation =
                locationTerm === "" ||
                (doc.location && doc.location.toLowerCase().includes(locationTerm.toLowerCase()));

            const matchesSpecialty =
                selectedSpecialties.length === 0 ||
                selectedSpecialties.includes(doc.specialization);

            return matchesSearch && matchesLocation && matchesSpecialty;
        });
    }, [doctors, searchTerm, locationTerm, selectedSpecialties]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Search Section */}
            <Hero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                locationTerm={locationTerm}
                setLocationTerm={setLocationTerm}
            />

            {/* Content Section: Sidebar on Left, Cards on Right */}
            <div id="doctor-results" className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8 items-start scroll-mt-6">
                <aside className="w-full md:w-64 shrink-0">
                    <DoctorFilter
                        specialties={specialties}
                        selectedSpecialties={selectedSpecialties}
                        onToggleSpecialty={handleToggleSpecialty}
                        onClearAll={handleClearAll}
                    />
                </aside>

                <main className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-slate-600 font-medium text-sm">
                            Showing <span className="font-bold text-slate-900">{filteredDoctors.length}</span> doctors
                        </p>
                    </div>

                    <DoctorCard doctors={filteredDoctors} loading={loading} />
                </main>
            </div>
        </div>
    );
};

export default FindDoctor;