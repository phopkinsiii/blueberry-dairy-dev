import path from 'path';
import { fileURLToPath } from 'url';

export const uploadImage = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded' });
	}

	const filename = req.file.filename;

	// Construct the public URL path to the image
	const imageUrl = `/uploads/${filename}`;

	res.status(200).json({ message: 'Upload successful', imageUrl });
};

// This is used for resolving __dirname in ES modules
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
