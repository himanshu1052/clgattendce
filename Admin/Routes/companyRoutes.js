import express from 'express';
import { addCompany, getCompanies, deleteCompany } from '../Controller/companyController.js';

const router = express.Router();

router.post('/', addCompany); // Register a company
router.get('/', getCompanies); // Fetch all companies
router.delete('/:id', deleteCompany); // Remove a company

export default router;
