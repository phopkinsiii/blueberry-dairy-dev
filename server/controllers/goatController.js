import Goat from '../models/goatModel.js';
import { validateGoatData } from '../utils/validators.js';

// Public
export const getAllGoats = async (req, res) => {
	try {
		const goats = await Goat.find().sort({ createdAt: -1 });
		res.json(goats);
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch goats' });
	}
};

export const getGoatById = async (req, res) => {
	try {
		const goat = await Goat.findById(req.params.id);
		if (!goat) return res.status(404).json({ message: 'Goat not found' });
		res.json(goat);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching goat' });
	}
};

// Admin only
export const createGoat = async (req, res) => {
	const { isValid, errors } = validateGoatData(req.body);
	if (!isValid) {
		return res.status(400).json({ message: 'Invalid goat data', errors });
	}
	try {
		const newGoat = new Goat(req.body);
		const savedGoat = await newGoat.save();
		res.status(201).json({ newGoat: savedGoat });
	} catch (error) {
		console.error('Error saving goat:', error);
		res
			.status(500)
			.json({ message: 'An unexpected error occurred while saving the goat.' });
	}
};

export const updateGoat = async (req, res) => {
	try {
		const updatedGoat = await Goat.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedGoat)
			return res.status(404).json({ message: 'Goat not found' });
		res.json(updatedGoat);
	} catch (error) {
		res.status(500).json({ message: 'Failed to update goat' });
	}
};

export const deleteGoat = async (req, res) => {
	try {
		const deleted = await Goat.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ message: 'Goat not found' });
		res.json({ message: 'Goat deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete goat' });
	}
};
