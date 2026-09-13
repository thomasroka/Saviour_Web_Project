interface FilterProps {
    specialties: string[];
    selectedSpecialties: string[];
    onToggleSpecialty: (specialty: string) => void;
}

const Filter = ({
    specialties,
    selectedSpecialties,
    onToggleSpecialty,
}: FilterProps) => {
    return (
        <div className="pb-6 border-b border-slate-200">
            <div className="font-semibold text-slate-800 mb-3 text-sm">Specialities</div>
            <div className="w-full flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
                {specialties.length === 0 ? (
                    <p className="text-xs text-slate-400">No specialties found</p>
                ) : (
                    specialties.map((spec) => (
                        <label
                            key={spec}
                            className="flex items-center text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                checked={selectedSpecialties.includes(spec)}
                                onChange={() => onToggleSpecialty(spec)}
                                className="mr-3 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span>{spec}</span>
                        </label>
                    ))
                )}
            </div>
        </div>
    );
};

export default Filter;