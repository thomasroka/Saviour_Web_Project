import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactUs from './ContactUs'
import Home from './Home'
import FindDoctor from './FindDoctor'
import AppointmentBooking from './AppointmentBooking'
import MyAppointments from './MyAppointments'
import Signin from './Components/Userlog/Signin'
import Signup from './Components/Userlog/Signup'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/finddoctor' element={<FindDoctor />} />
            <Route path='/appointment' element={<AppointmentBooking />} />
            <Route path='/book-appointment' element={<AppointmentBooking />} />
            <Route path='/appointment/:id' element={<AppointmentBooking />} />
            <Route path='/my-appointments' element={<MyAppointments />} />
            <Route path='/appointments' element={<MyAppointments />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
