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

export const getSaleGoats = async (req, res) => {
	console.log('🐐 getSaleGoats triggered'); // CONFIRM controller is hit

	try {
		const goatsForSale = await Goat.find({ forSale: true });
		console.log('✅ Query success:', goatsForSale.length, 'goats');
		res.json(goatsForSale);
	} catch (error) {
		console.error('❌ Error in getSaleGoats:', error.message);
		res.status(500).json({ message: error.message });
	}
};

export const getDoes = async (req, res) => {
	try {
		const does = await Goat.find({ gender: 'Doe' });
		res.json(does);
	} catch (error) {
		console.error('❌ Error fetching does:', error.message);
		res.status(500).json({ message: 'Failed to fetch does' });
	}
};

// @desc    Get all bucks
// @route   GET /api/goats/bucks
// @access  Public
export const getBucks = async (req, res) => {
	try {
		const bucks = await Goat.find({ gender: 'Buck' });
		res.json(bucks);
	} catch (error) {
		console.error('❌ Error fetching bucks:', error.message);
		res.status(500).json({ message: 'Failed to fetch bucks' });
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
		console.error('❌ Validation errors:', errors);
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

export const removeGoatImage = async (req, res) => {
	const { id } = req.params;
	const { imageUrl } = req.body;

	if (!imageUrl) {
		return res.status(400).json({ message: 'Image URL is required' });
	}

	try {
		const goat = await Goat.findById(id);
		if (!goat) return res.status(404).json({ message: 'Goat not found' });

		goat.images = goat.images.filter((url) => url !== imageUrl);
		await goat.save();

		res.json({ message: 'Image removed', images: goat.images });
	} catch (error) {
		console.error('❌ Error removing goat image:', error.message);
		res.status(500).json({ message: 'Failed to remove image' });
	}
};
