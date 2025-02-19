import Submission from "../Models/Submission.js";

// 📌 Submit a form 
export const submitForm = async (req, res) => {
  try {
    const { name, email, phone, course, company } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !course || !company) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
    // Check if the user has already registered with the same email, course, and company
    const existingSubmission = await Submission.findOne({ email, course, company });
    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this course with this company."
      });
    }
    
    // Save submission to database
    const newSubmission = new Submission({ name, email, phone, course, company });
    await newSubmission.save();
    
    res.status(201).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Form Submission Error:", error);
    
    // Handle the specific case of duplicate key error more gracefully
    if (error.code === 11000 && error.keyPattern) {
      // Check which fields caused the duplicate
      const duplicateFields = Object.keys(error.keyPattern).join(", ");
      return res.status(400).json({ 
        success: false, 
        message: `Duplicate entry for ${duplicateFields}. You have already registered with these details.` 
      });
    }
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📌 Get all submissions (For Admin) 
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📌 Approve or Reject a Submission 
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    
    const submission = await Submission.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }
    
    res.status(200).json({ success: true, message: `Submission ${status.toLowerCase()} successfully`, data: submission });
  } catch (error) {
    console.error("Error updating submission status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};