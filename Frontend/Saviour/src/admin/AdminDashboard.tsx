import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import API_URL from '../api'
import { FiLogOut, FiPlus, FiUserPlus, FiUsers, FiStar, FiMapPin, FiDollarSign, FiUpload, FiImage, FiTrash2, FiEdit3, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

interface Doctor {
    _id: string
    name: string
    specialization: string
    email: string
    phonenumber?: number
    image: string
    ratings?: number
    location: string
    fee: number
    available: string | boolean
}

interface DoctorForm {
    name: string
    specialization: string
    email: string
    phonenumber: string
    image: string
    ratings: string
    location: string
    fee: string
    available: boolean
}

const emptyForm: DoctorForm = {
    name: '',
    specialization: '',
    email: '',
    phonenumber: '',
    image: '',
    ratings: '',
    location: '',
    fee: '',
    available: true,
}

const getErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message || fallback
    }
    return fallback
}

const API_BASE_URL = API_URL.replace(/\/+$/, '')

const getImageUrl = (image?: string) => {
    if (!image) return ''
    if (image.startsWith('http') || image.startsWith('data:')) return image
    return `${API_BASE_URL}/${image.replace(/^\/+/, '')}`
}

const isDoctorAvailable = (available: string | boolean) => available === true || available === 'true'

const doctorToForm = (doctor: Doctor): DoctorForm => ({
    name: doctor.name,
    specialization: doctor.specialization,
    email: doctor.email,
    phonenumber: doctor.phonenumber?.toString() || '',
    image: doctor.image,
    ratings: doctor.ratings?.toString() || '',
    location: doctor.location,
    fee: doctor.fee.toString(),
    available: isDoctorAvailable(doctor.available),
})

const getToken = () => localStorage.getItem('admin_token') || ''

const AdminDashboard = () => {
    const [form, setForm] = useState<DoctorForm>(emptyForm)
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [fetching, setFetching] = useState<boolean>(true)
    const [message, setMessage] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [uploading, setUploading] = useState<boolean>(false)
    const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null)
    const [deletingDoctorId, setDeletingDoctorId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget
        const file = input.files?.[0]
        if (!file) return

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
        if (!allowedTypes.includes(file.type)) {
            setError('Use a JPG, PNG, WEBP, GIF, or AVIF image.')
            input.value = ''
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be 5 MB or smaller.')
            input.value = ''
            return
        }

        setUploading(true)
        setError('')
        try {
            const formData = new FormData()
            formData.append('image', file)
            const token = getToken()
            const response = await axios.post(`${API_BASE_URL}/api/v1/admin/upload`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const url = response.data?.url
            if (!url) {
                throw new Error('Upload response did not include an image URL')
            }
            setForm((prev) => ({ ...prev, image: url }))
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to upload image.'))
        } finally {
            setUploading(false)
            input.value = ''
        }
    }

    useEffect(() => {
        let cancelled = false
        const token = getToken()

        axios.get(`${API_BASE_URL}/api/v1/admin/doctor`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!cancelled) {
                    setDoctors(response.data?.doctors || [])
                    setError('')
                }
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
                        navigate('/admin')
                    } else {
                        setError(getErrorMessage(err, 'Failed to load doctors.'))
                    }
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setFetching(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [navigate])

    const refreshDoctors = async () => {
        setFetching(true)
        setError('')
        try {
            const token = getToken()
            const response = await axios.get(`${API_BASE_URL}/api/v1/admin/doctor`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setDoctors(response.data?.doctors || [])
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to load doctors.'))
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setLoading(true)

        try {
            const data = {
                name: form.name,
                specialization: form.specialization,
                email: form.email,
                phonenumber: form.phonenumber ? Number(form.phonenumber) : undefined,
                image: form.image,
                ratings: Number(form.ratings) || 0,
                location: form.location,
                fee: Number(form.fee),
                available: form.available,
            }
            const token = getToken()
            if (editingDoctorId) {
                await axios.put(`${API_BASE_URL}/api/v1/admin/doctor/${editingDoctorId}`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setMessage('Doctor updated successfully!')
            } else {
                await axios.post(`${API_BASE_URL}/api/v1/admin/doctor`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setMessage('Doctor created successfully!')
            }
            setForm({ ...emptyForm })
            setEditingDoctorId(null)
            await refreshDoctors()
        } catch (err) {
            setError(getErrorMessage(err, editingDoctorId ? 'Failed to update doctor.' : 'Failed to create doctor.'))
        } finally {
            setLoading(false)
        }
    }

    const handleEditDoctor = (doctor: Doctor) => {
        setForm(doctorToForm(doctor))
        setEditingDoctorId(doctor._id)
        setMessage('')
        setError('')
        document.getElementById('doctor-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCancelEdit = () => {
        setForm({ ...emptyForm })
        setEditingDoctorId(null)
        setMessage('')
        setError('')
    }

    const handleDeleteDoctor = async (id: string, name: string) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return
        }

        setDeletingDoctorId(id)
        setMessage('')
        setError('')

        try {
            const token = getToken()
            await axios.delete(`${API_BASE_URL}/api/v1/admin/doctor/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setDoctors((prev) => prev.filter((doctor) => doctor._id !== id))
            if (editingDoctorId === id) {
                setForm({ ...emptyForm })
                setEditingDoctorId(null)
            }
            setMessage(`Doctor "${name}" deleted successfully!`)
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to delete doctor.'))
        } finally {
            setDeletingDoctorId(null)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        navigate('/admin')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-gray-900 text-white px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                        <FiUserPlus size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Admin Dashboard</h1>
                        <p className="text-xs text-gray-400">Manage doctors for Saviour</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 rounded-lg transition cursor-pointer"
                >
                    <FiLogOut size={16} />
                    Logout
                </button>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
                {/* Add Doctor Form */}
                <section id="doctor-form" className={`w-full lg:w-96 bg-white rounded-2xl shadow-sm border h-fit scroll-mt-28 ${editingDoctorId ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'}`}>
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                        {editingDoctorId ? <FiEdit3 className="text-blue-600" size={18} /> : <FiPlus className="text-blue-600" size={18} />}
                        <h2 className="font-bold text-gray-900">{editingDoctorId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-4">
                        {message && (
                            <div className='p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center justify-between'>
                                <span>{message}</span>
                                <button type="button" onClick={() => setMessage('')} className='text-green-400 hover:text-green-600 font-bold ml-2'>×</button>
                            </div>
                        )}
                        {error && (
                            <div className='p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center justify-between'>
                                <span>{error}</span>
                                <button type="button" onClick={() => setError('')} className='text-red-400 hover:text-red-600 font-bold ml-2'>×</button>
                            </div>
                        )}

                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Doctor Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='Dr. John Doe' required />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Specialization *</label>
                            <input name="specialization" value={form.specialization} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='Cardiologist' required />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Email *</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='doctor@example.com' required />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Phone Number</label>
                            <input name="phonenumber" type="tel" value={form.phonenumber} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='9800000000' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Doctor Photo *</label>
                            <div className='flex items-center gap-2'>
                                <input name="image" value={form.image} onChange={handleChange} className='flex-1 border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='Paste image link or upload below' required />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className='h-11 w-11 shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
                                    title="Upload image from your computer"
                                >
                                    {uploading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <FiImage size={20} />
                                    )}
                                </button>
                            </div>
                            <p className='text-xs text-gray-400 mt-1.5'>Tip: click the <FiUpload className='inline' size={12} /> image icon to pick a file from your computer.</p>
                            {form.image && (
                                <div className='mt-3 w-full h-40 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50'>
                                    <img
                                        className='h-full w-full object-contain object-center'
                                        src={getImageUrl(form.image)}
                                        alt="Doctor preview"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                    />
                                </div>
                            )}
                            <input type="file" accept="image/*" ref={fileInputRef} className='hidden' onChange={handleFileUpload} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold mb-1 text-gray-700'>Location *</label>
                            <input name="location" value={form.location} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='Kathmandu' required />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <label className='text-sm font-semibold mb-1 text-gray-700'>Fee (Rs) *</label>
                                <input name="fee" type="number" value={form.fee} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='500' required />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm font-semibold mb-1 text-gray-700'>Rating</label>
                                <input name="ratings" type="number" step="0.1" min="0" max="5" value={form.ratings} onChange={handleChange} className='border-2 border-gray-300 focus:border-blue-600 outline-none h-11 w-full rounded-xl px-4 transition-colors' placeholder='4.5' />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input id="available" name="available" type="checkbox" checked={form.available} onChange={handleChange} className='w-4 h-4 cursor-pointer' />
                            <label htmlFor="available" className='text-sm text-gray-700 cursor-pointer'>Currently Available</label>
                        </div>
                        <div className='flex gap-3 mt-1'>
                            <button type="submit" disabled={loading || uploading} className='cursor-pointer h-12 flex-1 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center shadow-sm'>
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : editingDoctorId ? (
                                    'Save Changes'
                                ) : (
                                    'Add Doctor'
                                )}
                            </button>
                            {editingDoctorId && (
                                <button type="button" onClick={handleCancelEdit} disabled={loading} className='cursor-pointer h-12 px-4 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2'>
                                    <FiX size={16} />
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Doctors List */}
                <section className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                        <FiUsers className="text-blue-600" size={18} />
                        <h2 className="font-bold text-gray-900">All Doctors</h2>
                        <span className="ml-auto text-sm text-gray-500">{doctors.length} registered</span>
                    </div>

                    <div className="p-6">
                        {fetching ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : doctors.length === 0 ? (
                            <div className="text-center py-16">
                                <FiUsers className="mx-auto text-gray-300 mb-3" size={40} />
                                <p className="text-gray-500 font-medium">No doctors added yet</p>
                                <p className="text-sm text-gray-400 mt-1">Fill the form to add the first doctor.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {doctors.map((doctor) => (
                                    <div key={doctor._id} className={`flex flex-col bg-slate-50 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition ${editingDoctorId === doctor._id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-100'}`}>
                                        <div className='w-full h-44 p-3 pb-0'>
                                            <img
                                                className="rounded-xl h-full w-full object-contain object-center bg-gray-100 p-2"
                                                src={getImageUrl(doctor.image)}
                                                alt={doctor.name}
                                            />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <p className="font-bold text-lg">{doctor.name}</p>
                                            <p className="text-blue-600 text-sm font-medium">{doctor.specialization}</p>
                                            <div className="flex items-center gap-1 text-gray-600 text-sm mt-3">
                                                <FiMapPin className="text-gray-400" size={14} />
                                                <span>{doctor.location}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2 text-sm">
                                                <div className="flex items-center gap-1 text-gray-700 font-semibold">
                                                    <FiDollarSign className="text-gray-400" size={14} />
                                                    <span>Rs. {doctor.fee}</span>
                                                </div>
                                                {doctor.ratings ? (
                                                    <div className="flex items-center gap-1 text-amber-500 font-semibold">
                                                        <FiStar size={14} />
                                                        <span>{doctor.ratings}</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${isDoctorAvailable(doctor.available) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                    {isDoctorAvailable(doctor.available) ? 'Available' : 'Unavailable'}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditDoctor(doctor)}
                                                        disabled={deletingDoctorId === doctor._id}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title={`Edit ${doctor.name}`}
                                                    >
                                                        <FiEdit3 size={13} />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteDoctor(doctor._id, doctor.name)}
                                                        disabled={deletingDoctorId === doctor._id}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title={`Delete ${doctor.name}`}
                                                    >
                                                        {deletingDoctorId === doctor._id ? (
                                                            <div className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <>
                                                                <FiTrash2 size={13} />
                                                                <span>Delete</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminDashboard