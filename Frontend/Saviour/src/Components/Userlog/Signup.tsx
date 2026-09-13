import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Background from './Background'
import SignupFormm from './SignupFormm'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Signup = () => {
    return (
        <div>
            <div className="bg-white">
                <Navbar />
            </div>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

                <div className="flex-1 w-full px-4 py-8 sm:px-6 lg:px-10 flex items-center justify-center">
                    <div className="
                        w-full
                        max-w-6xl
                        overflow-hidden
                        rounded-[2rem]
                        bg-white/80
                        backdrop-blur-xl
                        flex
                        flex-col
                        lg:flex-row
                        shadow-[0_8px_40px_rgba(0,0,0,0.08)]
                        border
                        border-white/60
                    ">
                        {/* Background Section */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-gradient-to-br from-slate-50/80 to-blue-50/50">
                            <Background status={true} />
                        </div>

                        {/* Sign Up Section */}
                        <div className="flex w-full flex-col px-6 py-8 sm:px-10 lg:w-1/2 lg:px-12 xl:px-16 justify-center">
                            {/* Back Link */}
                            <div className="mb-8 flex items-center">
                                <Link to="/login" className="cursor-pointer text-base font-semibold transition-all flex items-center gap-2 text-slate-500 hover:text-indigo-600 group">
                                    <span className="group-hover:-translate-x-0.5 transition-transform text-slate-400 group-hover:text-indigo-600"><FiArrowLeft size={20} /></span>
                                    <span>Back to Login</span>
                                </Link>
                            </div>

                            {/* Form */}
                            <div className="w-full max-w-md mx-auto lg:max-w-none">
                                <SignupFormm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup
