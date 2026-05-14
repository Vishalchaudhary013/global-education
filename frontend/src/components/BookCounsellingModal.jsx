import React, { useState } from 'react';
import { useCounselling } from '../context/CounsellingContext';
import { HiXMark, HiPaperAirplane, HiOutlineArrowPath } from "react-icons/hi2";
import api from '../api';

const BookCounsellingModal = () => {
  const { isModalOpen, closeModal } = useCounselling();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    courseLevel: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/counselling', formData);
      setStatus('success');
      setTimeout(() => {
        closeModal();
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', destination: '', courseLevel: '', message: '' });
      }, 3000);
    } catch (err) {
      console.error('Error submitting request', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-indigo-600 p-6 text-white relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Free Counselling</h2>
            <p className="text-indigo-100 mt-1 text-sm">Tell us about your study abroad plans</p>
          </div>
          <button onClick={closeModal} className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiPaperAirplane className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Request Sent!</h3>
              <p className="text-slate-600">Our counsellors will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email *</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Destination</label>
                  <select name="destination" value={formData.destination} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-white">
                    <option value="">Select Destination</option>
                    <option value="uk">UK</option>
                    <option value="usa">USA</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="europe">Europe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Course Level</label>
                  <select name="courseLevel" value={formData.courseLevel} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-white">
                    <option value="">Select Level</option>
                    <option value="ug">Undergraduate</option>
                    <option value="pg">Postgraduate</option>
                    <option value="phd">PhD / Doctorate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none" placeholder="Any specific queries?"></textarea>
              </div>

              {status === 'error' && <p className="text-red-500 text-sm font-medium">Failed to submit request. Please try again.</p>}

              <button type="submit" disabled={status === 'loading'} className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 mt-4">
                {status === 'loading' ? <HiOutlineArrowPath className="h-5 w-5 animate-spin" /> : <span>Book Session Now</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCounsellingModal;
