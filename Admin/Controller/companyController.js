import Company from '../Models/Company.js';

// Add a new company
export const addCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Company name is required" });

    const newCompany = new Company({ name });
    await newCompany.save();
    res.status(201).json({ success: true, message: "Company added successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all active companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Company removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
