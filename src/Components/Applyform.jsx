import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    company: "",
  });
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const courses = ["BCA", "MCA", "BBA"];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/company");
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("❌ Failed to fetch companies. Please try again later.");
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateForm = () => {
    toast.dismiss();

    if (!formData.name.trim()) {
      toast.error("🚫 Please enter your name.");
      return false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      toast.error("🚫 Please enter a valid email address.");
      return false;
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      toast.error("🚫 Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!formData.course) {
      toast.error("🚫 Please select a course.");
      return false;
    }

    if (!formData.company) {
      toast.error("🚫 Please select a company.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, status: "pending" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      toast.success("✅ Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", course: "", company: "" });
    } catch (error) {
      toast.error("❌ Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 mt-18">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Apply Now
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-lg font-medium text-gray-600">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course */}
        <div>
          <label className="block text-lg font-medium text-gray-600">Select Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-lg font-medium text-gray-600">Select Company</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-red-400 text-white rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;