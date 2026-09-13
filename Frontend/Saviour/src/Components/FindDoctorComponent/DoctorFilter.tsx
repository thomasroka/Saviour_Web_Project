import Filter from "./Filter";
import FilterYear from "./FilterYear";

interface DoctorFilterProps {
    specialties: string[];
    selectedSpecialties: string[];
    onToggleSpecialty: (specialty: string) => void;
    onClearAll: () => void;
}

const DoctorFilter = ({
    specialties,
    selectedSpecialties,
    onToggleSpecialty,
    onClearAll,
}: DoctorFilterProps) => {
    const hasActiveFilters = selectedSpecialties.length > 0;

    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm w-full">
            <div className="pb-3 border-b border-slate-200 flex justify-between items-center mb-4">
                <span className="font-bold text-slate-800 text-base">Filter</span>
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <Filter
                specialties={specialties}
                selectedSpecialties={selectedSpecialties}
                onToggleSpecialty={onToggleSpecialty}
            />

            <FilterYear />
        </div>
    );
};

export default DoctorFilter;