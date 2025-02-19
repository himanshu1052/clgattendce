import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    toast.dismiss();

    const errorStyle = {
      duration: 3000,
      style: {
        padding: '16px',
        borderRadius: '10px',
        background: '#FEE2E2',
        color: '#DC2626',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '16px'
      },
      icon: '🚫'
    };

    if (!formData.name.trim()) {
      toast.error('Please enter your name', errorStyle);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      toast.error('Please enter your email address', errorStyle);
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', errorStyle);
      return false;
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number', errorStyle);
      return false;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message', errorStyle);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("https://backendclgattendence.onrender.com/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success('Message sent successfully! We will get back to you soon.', {
        duration: 3000,
        style: {
          padding: '16px',
          borderRadius: '10px',
          background: '#ECFDF5',
          color: '#065F46',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '16px'
        },
        icon: '✅'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 3000,
        style: {
          padding: '16px',
          borderRadius: '10px',
          background: '#FEE2E2',
          color: '#DC2626',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontSize: '16px'
        },
        icon: '❌'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <Toaster />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-style" placeholder="Your name" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-style" placeholder="Your email" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-style" placeholder="Your phone number" maxLength="10" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="input-style" placeholder="Message subject" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message <span className="text-red-500">*</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="input-style" placeholder="Your message here..."></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Location */}
      <div className="container mx-auto px-4 mt-12">
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5375319199316!2d77.3911!3d28.6753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bb11111111%3A0x111111111111!2sITS%20Engineering%20College!5e0!3m2!1sen!2sin!4v1111111111111"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
