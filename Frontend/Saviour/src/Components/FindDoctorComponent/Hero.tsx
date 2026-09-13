import SearchHero from "./SearchHero";

interface HeroProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    locationTerm: string;
    setLocationTerm: (location: string) => void;
}

const Hero = ({
    searchTerm,
    setSearchTerm,
    locationTerm,
    setLocationTerm,
}: HeroProps) => {
    return (
        <div className="w-full bg-blue-100/70 text-center flex flex-col items-center py-14 px-4">
            <h1 className="font-bold text-3xl md:text-4xl text-slate-800 mb-2">
                Find the right care, right now
            </h1>
            <p className="text-slate-600 mb-8 max-w-lg">
                Search thousands of verified healthcare professionals based on specialty,
                location, and patient reviews.
            </p>
            <SearchHero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                locationTerm={locationTerm}
                setLocationTerm={setLocationTerm}
            />
        </div>
    );
};

export default Hero;