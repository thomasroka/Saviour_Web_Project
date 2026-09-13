import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useAuth, getDisplayNameFromEmail } from "../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        setIsOpen(false);
        navigate('/');
    };

    const displayName = user ? (user.name || getDisplayNameFromEmail(user.email)) : "";
    const firstInitial = displayName ? displayName.charAt(0).toUpperCase() : "U";

    return (
        <nav className="flex items-center justify-between p-4 md:px-8 bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="flex items-center gap-8">
                <Link to='/' className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Saviour
                </Link>
                <div className="hidden md:flex gap-6 font-medium text-gray-700">
                    <Link to='/finddoctor' className="hover:text-blue-600 transition-colors">Find Doctor</Link>
                    <Link to='/contact' className="hover:text-blue-600 transition-colors">Contact Us</Link>
                </div>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-4 font-medium">
                {isAuthenticated && user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 py-1.5 px-3 rounded-full hover:bg-gray-100 transition-all border border-gray-200 cursor-pointer shadow-xs"
                            aria-expanded={isProfileOpen}
                            aria-label="User profile menu"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-blue-100">
                                {firstInitial}
                            </div>
                            <span className="text-gray-800 font-semibold text-sm max-w-[120px] truncate">
                                {displayName}
                            </span>
                            <FiChevronDown
                                className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                                size={16}
                            />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base ring-2 ring-blue-100">
                                            {firstInitial}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-gray-900 truncate">{displayName}</p>
                                            <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-1">
                                    <Link
                                        to="/my-appointments"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                                    >
                                        <FiUser size={16} className="text-gray-400" />
                                        <span>My Appointments</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer text-left"
                                    >
                                        <FiLogOut size={16} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to='/login' className="px-6 py-2 text-black hover:bg-gray-100 rounded-md transition">
                            Login
                        </Link>
                        <Link to='/signup' className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition shadow-sm">
                            SignUp
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile menu button */}
            <button
                className="md:hidden p-2 text-gray-600 hover:text-black cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
            >
                {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>

            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col p-6 gap-4 md:hidden border-t border-gray-100">
                    {isAuthenticated && user && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
                                {firstInitial}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-semibold text-gray-900">{displayName}</p>
                                <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
                            </div>
                        </div>
                    )}

                    <Link to='/finddoctor' onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-800 hover:text-blue-600">
                        Find Doctor
                    </Link>
                    <Link to='/my-appointments' onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-800 hover:text-blue-600">
                        My Appointments
                    </Link>
                    <Link to='/contact' onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-800 hover:text-blue-600">
                        Contact Us
                    </Link>

                    <div className="border-t my-2"></div>

                    {isAuthenticated && user ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition cursor-pointer"
                        >
                            <FiLogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    ) : (
                        <>
                            <Link to='/login' onClick={() => setIsOpen(false)} className="px-4 py-3 bg-gray-100 text-black font-medium rounded-md text-center">
                                Login
                            </Link>
                            <Link to='/signup' onClick={() => setIsOpen(false)} className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center">
                                SignUp
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;