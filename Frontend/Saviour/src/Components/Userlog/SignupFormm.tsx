import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

const SignupFormm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const signupHandle = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setError('')
        setSuccess('')
        setLoading(true)

        try {
            await axios.post('http://localhost:8000/api/v1/auth/signup', {
                email, password,
            })
            setSuccess('Account created successfully! Redirecting to login...')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                navigate('/login')
            }, 1200)
        } catch (err: any) {
            const errMsg = err.response?.data?.message || 'Signup failed. Please try again.'
            setError(errMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full'>
            <div>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent'>Create Account</h2>
                <p className='text-sm mt-2 text-slate-500'>
                    Already have an account? <Link to="/login" className='font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'>Login</Link>
                </p>
            </div>

            {error && (
                <div className='mt-5 p-3.5 bg-red-50 border border-red-200/80 text-red-600 text-sm rounded-xl flex items-center justify-between shadow-sm'>
                    <span className="flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </span>
                    <button onClick={() => setError('')} className='text-red-400 hover:text-red-600 font-bold ml-2 text-lg leading-none'>&times;</button>
                </div>
            )}

            {success && (
                <div className='mt-5 p-3.5 bg-emerald-50 border border-emerald-200/80 text-emerald-600 text-sm rounded-xl flex items-center justify-between shadow-sm'>
                    <span className="flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4 shrink-0" />
                        {success}
                    </span>
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); signupHandle(); }} className='mt-6 flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label className='text-sm font-semibold text-slate-700 mb-1.5 tracking-wide uppercase'>Email</label>
                    <input
                        value={email}
                        className='bg-slate-50/80 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none h-12 w-full rounded-xl px-4 transition-all text-slate-800 placeholder:text-slate-400'
                        type="email"
                        placeholder='you@example.com'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-semibold text-slate-700 mb-1.5 tracking-wide uppercase'>Password</label>
                    <input
                        value={password}
                        className='bg-slate-50/80 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none h-12 w-full rounded-xl px-4 transition-all text-slate-800 placeholder:text-slate-400'
                        type="password"
                        placeholder='Create a password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-semibold text-slate-700 mb-1.5 tracking-wide uppercase'>Confirm Password</label>
                    <input
                        value={confirmPassword}
                        className='bg-slate-50/80 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none h-12 w-full rounded-xl px-4 transition-all text-slate-800 placeholder:text-slate-400'
                        type="password"
                        placeholder='Confirm your password'
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-row items-center gap-2.5 mt-1'>
                    <input type="checkbox" id="signup-terms" required className='w-4 h-4 rounded cursor-pointer accent-indigo-600' />
                    <label htmlFor="signup-terms" className='text-sm cursor-pointer text-slate-500'>I agree to Terms and conditions.</label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className='cursor-pointer h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-base hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/25 transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center active:scale-[0.98]'
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        'Sign Up'
                    )}
                </button>
            </form>

            <div className='flex flex-row items-center gap-4 my-6'>
                <div className='border-t border-slate-200 w-full'></div>
                <p className='text-slate-400 text-sm font-medium'>OR</p>
                <div className='border-t border-slate-200 w-full'></div>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
                <button
                    type="button"
                    className='h-12 w-full rounded-xl font-medium border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex justify-center items-center gap-3 cursor-pointer text-slate-600 bg-white'
                >
                    <FcGoogle size={20} />
                    <span className="text-sm">Google</span>
                </button>
                <button
                    type="button"
                    className='h-12 w-full rounded-xl font-medium border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all flex justify-center items-center gap-3 cursor-pointer text-slate-600 bg-white'
                >
                    <FaFacebook size={20} className='text-[#1877F2]' />
                    <span className="text-sm">Facebook</span>
                </button>
            </div>
        </div>
    )
}

export default SignupFormm
