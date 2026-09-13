import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../api'
import { FiLock, FiMail, FiUserCheck } from 'react-icons/fi'

const AdminLogin = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const adminSigninHandle = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.')
            return
        }

        setError('')
        setLoading(true)

        try {
            const data = { email, password }
            const response = await axios.post(`${API_URL}/api/v1/admin/signin`, data, {
                withCredentials: true,
            })

            localStorage.setItem('admin_token', response.data?.token || '')
            navigate('/admin/dashboard')
        } catch (err) {
            const errMsg = axios.isAxiosError(err)
                ? (err.response?.data?.message || 'Failed to sign in. Please try again.')
                : 'Failed to sign in. Please try again.'
            setError(errMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gray-900 px-8 py-6 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                        <FiUserCheck size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Saviour Admin</h2>
                        <p className="text-sm text-gray-400">Sign in to manage doctors</p>
                    </div>
                </div>

                <div className="px-8 py-8">
                    {error && (
                        <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center justify-between'>
                            <span>{error}</span>
                            <button onClick={() => setError('')} className='text-red-400 hover:text-red-600 font-bold ml-2'>×</button>
                        </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); adminSigninHandle(); }} className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1.5 text-gray-700'>Admin Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    value={email}
                                    className='border-2 border-gray-300 focus:border-blue-600 outline-none h-12 w-full rounded-xl pl-11 pr-4 transition-colors'
                                    type="email"
                                    placeholder='Enter Admin Email'
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1.5 text-gray-700'>Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    value={password}
                                    className='border-2 border-gray-300 focus:border-blue-600 outline-none h-12 w-full rounded-xl pl-11 pr-4 transition-colors'
                                    type="password"
                                    placeholder='Enter Password'
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className='cursor-pointer h-12 w-full rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow-sm'
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Sign in to Dashboard'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin