const Footer = () => {
    return (
        <div className="w-full mt-20 bg-[#BDE2FF] overflow-hidden relative flex flex-col pt-16">
            {/* Footer links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-8 md:px-16 z-10">
                <div>
                    <h3 className="font-bold text-xl mb-4">Saviour</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Connecting patients with trusted doctors anytime, anywhere.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Platform</h3>
                    <div className="space-y-3 text-gray-700">
                        <p className="hover:text-black cursor-pointer transition">Find Doctors</p>
                        <p className="hover:text-black cursor-pointer transition">Consultations</p>
                        <p className="hover:text-black cursor-pointer transition">Appointments</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Support</h3>
                    <div className="space-y-3 text-gray-700">
                        <p className="hover:text-black cursor-pointer transition">Help Center</p>
                        <p className="hover:text-black cursor-pointer transition">Contact Us</p>
                        <p className="hover:text-black cursor-pointer transition">FAQs</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Legal</h3>
                    <div className="space-y-3 text-gray-700">
                        <p className="hover:text-black cursor-pointer transition">Privacy Policy</p>
                        <p className="hover:text-black cursor-pointer transition">Terms of Service</p>
                    </div>
                </div>
            </div>

            {/* Giant watermark and Rights Reserved */}
            <div className="relative mt-16 md:mt-24 w-full flex flex-col items-center justify-end pb-8">
                <div className="absolute inset-x-0 bottom-0 text-[20vw] lg:text-[250px] leading-none text-center text-white/40 font-bold select-none overflow-hidden -mb-4 lg:-mb-10">
                    Saviour
                </div>
                <div className="relative z-10 w-full px-8 md:px-16 text-black mt-8 text-center md:text-left">
                    <p className="text-sm font-medium">
                        &copy; 2026 Saviour. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer