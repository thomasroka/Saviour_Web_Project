const FilterYear = () => {
    const experienceOptions = ["10yrs+", "5yrs+", "2yrs+", "No Experience"];

    return (
        <div className="pt-6">
            <div className="font-semibold text-slate-800 mb-3 text-sm">Experience</div>
            <div className="w-full flex flex-col gap-2.5">
                {experienceOptions.map((exp, index) => (
                    <label
                        key={index}
                        className="flex items-center text-sm text-slate-600 hover:text-slate-900 cursor-pointer select-none"
                    >
                        <input
                            type="checkbox"
                            className="mr-3 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span>{exp}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterYear;