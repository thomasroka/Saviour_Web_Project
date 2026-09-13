import { Link } from 'react-router-dom';
import mainimage from './assets/Medicine-pana.svg';

const Background = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center p-6 md:px-12 mt-4 md:mt-12 gap-8 max-w-7xl mx-auto">
            <div className="flex-1 flex flex-col gap-6 pt-8 md:pt-0">
                <div className='flex flex-col gap-4'>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900">
                        The Right Doctor.<br/>Anytime. Anywhere.
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        Connect with top-rated medical professionals in your area. Book appointments instantly, consult securely online, and get the care you need without the wait.
                    </p>
                </div>
                <Link to="/finddoctor" className="h-14 w-full md:w-64 bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center rounded-xl text-base font-semibold transition shadow-md shadow-blue-500/25">
                    Book Your Appointment
                </Link>
            </div>
            <div className='flex-1 flex justify-center mt-8 md:mt-0'>
                <img className='w-full max-w-md lg:max-w-lg' src={mainimage} alt="Medicine Illustration" />
            </div>
        </div>
    );
};

export default Background;