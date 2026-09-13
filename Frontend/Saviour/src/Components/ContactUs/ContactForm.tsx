import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+1",
          phone: "",
          message: "",
        });
      }, 4000);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100/80 p-6 sm:p-8 lg:p-10 relative">
      {submitted ? (
        <div className="py-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-600 max-w-md">
            Thank you for contacting Saviour. Our medical coordination team will review your inquiry and get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                First name<span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Billy"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Last name<span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Jhondii"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Patient / Work email<span className="text-blue-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Phone number<span className="text-blue-600">*</span>
            </label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition">
              <div className="flex items-center px-3 bg-gray-50 border-r border-gray-300 gap-1 text-sm text-gray-700 shrink-0">
                <span className="text-base leading-none">🇺🇸</span>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+977">+977</option>
                  <option value="+91">+91</option>
                  <option value="+61">+61</option>
                  <option value="+49">+49</option>
                </select>
              </div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-3.5 py-2.5 text-gray-900 placeholder-gray-400 text-sm focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Message<span className="text-blue-600">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Describe your inquiry, question, or appointment details..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
