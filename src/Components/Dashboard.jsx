// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUserCircle, FaDownload, FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [contactUsers, setContactUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [userCompanyCounts, setUserCompanyCounts] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const navigate = useNavigate();

  // Fetch registered users, contact users, and companies on page load
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/submissions");
        if (!response.ok) throw new Error("Failed to fetch submissions");
    
        const result = await response.json();
        console.log("API Response:", result);
    
        if (result.success && Array.isArray(result.data)) {
          setRegisteredUsers(result.data);
    
          const userCompanyMap = {};
          result.data.forEach((user) => {
            if (!userCompanyMap[user.name]) {
              userCompanyMap[user.name] = new Set();
            }
            userCompanyMap[user.name].add(user.company);
          });
    
          const userCompanyData = Object.keys(userCompanyMap).map((name) => ({
            name,
            companyCount: userCompanyMap[name].size,
          }));
          setUserCompanyCounts(userCompanyData);
        } else {
          console.error("Invalid data format:", result);
          toast.error("Invalid data format for registered users.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error.message);
      }
    };

    const fetchContactUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/messages");
        if (!response.ok) throw new Error("Failed to fetch contact form submissions");
        const data = await response.json();
        setContactUsers(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/company");
        if (!response.ok) throw new Error("Failed to fetch company data");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchAllSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/submissions");
        if (!response.ok) throw new Error("Failed to fetch all submissions");
        const data = await response.json();
        setAllSubmissions(data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRegisteredUsers();
    fetchContactUsers();
    fetchCompanies();
    fetchAllSubmissions();
  }, []);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!newCompany) {
      toast.error("Please enter a company name.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCompany }),
      });
      if (!response.ok) throw new Error("Failed to add company.");
      const data = await response.json();
      setCompanies([...companies, data]);
      toast.success("Company added successfully!");
      setNewCompany("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveCompany = async (companyId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/company/${companyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove company.");
      setCompanies(companies.filter((company) => company._id !== companyId));
      toast.success("Company removed successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/admin");
  };

  const downloadCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  // Updated filter functions to search by both name and company
  const filteredUserCompanyCounts = userCompanyCounts.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAllSubmissions = allSubmissions.filter((submission) =>
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContactUsers = contactUsers.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaUserCircle className="text-4xl text-gray-600 mr-4" />
          <div>
            <h2 className="text-2xl font-bold">Admin Profile</h2>
            <p>Role: Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Log Out
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mb-6 bg-red-600 text-white p-4 rounded-lg">
        <h3 className="text-xl font-semibold">Add New Company</h3>
        <form onSubmit={handleAddCompany} className="mt-4">
          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            placeholder="Enter company name"
            className="mb-2 w-full p-2 rounded-md"
            style={{ borderColor: "white" }}
          />
          <button type="submit" className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100">
            Add Company
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Users & Their Applied Companies Count</h3>
        <button
          onClick={() => downloadCSV(filteredUserCompanyCounts, "user_company_counts")}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaDownload className="inline-block mr-2" />
          Download Data
        </button>
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Total Companies Applied</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserCompanyCounts.length > 0 ? (
              filteredUserCompanyCounts.map((user) => (
                <tr key={user.name} className="border">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2 text-center">{user.companyCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-2">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">All Student Submissions</h3>
        <button
          onClick={() => downloadCSV(filteredAllSubmissions, "all_submissions")}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaDownload className="inline-block mr-2" />
          Download Data
        </button>
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllSubmissions.length > 0 ? (
              filteredAllSubmissions.map((submission) => (
                <tr key={submission._id} className="border">
                  <td className="border px-4 py-2">{submission.name}</td>
                  <td className="border px-4 py-2">{submission.email}</td>
                  <td className="border px-4 py-2">{submission.phone}</td>
                  <td className="border px-4 py-2">{submission.course}</td>
                  <td className="border px-4 py-2">{submission.company}</td>
                  <td className="border px-4 py-2">{submission.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(submission.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Companies</h3>
        <ul>
          {companies.map((company) => (
            <li key={company._id} className="flex justify-between items-center border p-2 mt-2">
              <span>{company.name}</span>
              <button
                onClick={() => handleRemoveCompany(company._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Contact Form Submissions</h3>
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredContactUsers.length > 0 ? (
              filteredContactUsers.map((contact) => (
                <tr key={contact._id} className="border">
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2">No contact submissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;