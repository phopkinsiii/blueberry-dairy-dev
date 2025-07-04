// server/controllers/testimonialController.js
import Testimonial from '../models/testimonialModel.js';

// Create testimonial (Public)
export const createTestimonial = async (req, res) => {
	try {
		const { name, location, message } = req.body;
		const testimonial = await Testimonial.create({ name, location, message });
		res.status(201).json(testimonial);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Failed to create testimonial', error: err.message });
	}
};

// Get all testimonials (Public)
export const getTestimonials = async (req, res) => {
	try {
		const testimonials = await Testimonial.find().sort({ createdAt: -1 });
		res.json(testimonials);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Failed to fetch testimonials', error: err.message });
	}
};

// Update testimonial (Admin Only)
export const updateTestimonial = async (req, res) => {
	console.log('Received UPDATE request');
	console.log('Authenticated User:', req.user); // Check the decoded token payload
	console.log('Testimonial ID Param:', req.params.id);
	console.log('Request Body:', req.body);
	try {
		const testimonial = await Testimonial.findById(req.params.id);
		if (!testimonial) {
			console.log('Testimonial not found');
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		testimonial.name = req.body.name || testimonial.name;
		testimonial.location = req.body.location || testimonial.location;
		testimonial.message = req.body.message || testimonial.message;

		const updatedTestimonial = await testimonial.save();
		console.log('Testimonial updated successfully');
		res.json(updatedTestimonial);
	} catch (err) {
		console.error('Error updating testimonial:', err.message);
		res
			.status(500)
			.json({ message: 'Failed to update testimonial', error: err.message });
	}
};

// Delete testimonial (Admin Only)
export const deleteTestimonial = async (req, res) => {
	try {
		const testimonial = await Testimonial.findById(req.params.id);
		if (!testimonial)
			return res.status(404).json({ message: 'Testimonial not found' });

		await testimonial.deleteOne();
		res.json({ message: 'Testimonial deleted' });
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Failed to delete testimonial', error: err.message });
	}
};
