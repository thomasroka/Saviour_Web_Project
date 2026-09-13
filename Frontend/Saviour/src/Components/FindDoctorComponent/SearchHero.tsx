import type { FormEvent } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchHeroProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    locationTerm: string;
    setLocationTerm: (location: string) => void;
}

const SearchHero = ({
    searchTerm,
    setSearchTerm,
    locationTerm,
    setLocationTerm,
}: SearchHeroProps) => {
    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const resultsElement = document.getElementById("doctor-results");
        if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <form
                onSubmit={handleSearchSubmit}
                className="w-full bg-white rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row gap-3 shadow-md items-center"
            >
                {/* Doctor search */}
                <div className="relative w-full lg:flex-1">
                    <IoSearchSharp
                        size={20}
                        className="absolute top-1/2 left-4 -translate-y-1/2 opacity-60 text-gray-500"
                    />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3.5 pl-12 pr-4 outline-none border border-slate-200 rounded-xl focus:border-blue-500 transition text-sm text-slate-800"
                        placeholder="Doctor Name, Speciality or Condition"
                    />
                </div>

                {/* Location */}
                <div className="relative w-full lg:flex-1 lg:border-l lg:border-slate-200 lg:pl-3">
                    <input
                        type="text"
                        value={locationTerm}
                        onChange={(e) => setLocationTerm(e.target.value)}
                        className="w-full py-3.5 px-4 outline-none border border-slate-200 rounded-xl focus:border-blue-500 transition text-sm text-slate-800"
                        placeholder="Location (e.g. Kathmandu)"
                    />
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full lg:w-36 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition flex items-center justify-center shadow-sm hover:shadow active:scale-95 cursor-pointer"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchHero;