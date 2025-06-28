// server/scripts/batchUploadToCloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve('scripts/.env.cloudinary') });
console.log('🔑 Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Loaded' : '❌ MISSING',
});


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const baseFolder = '../client/public/images';

const uploadedImages = [];

const walkAndUpload = async (dirPath) => {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);

		if (entry.isDirectory()) {
			await walkAndUpload(fullPath);
		} else if (entry.isFile()) {
			const ext = path.extname(entry.name).toLowerCase();
			if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue; // skip unsupported types

			const relativePath = path.relative(baseFolder, fullPath);
			const cloudFolder =
				'blueberrydairy/' + path.dirname(relativePath).replace(/\\/g, '/');

			try {
				const result = await cloudinary.uploader.upload(fullPath, {
					folder: cloudFolder,
				});

				console.log(`✅ Uploaded: ${relativePath}`);
				console.log(`   → ${result.secure_url}`);
				uploadedImages.push({ file: relativePath, url: result.secure_url });
			} catch (err) {
				console.error(`❌ Error uploading ${relativePath}:`, err.message);
			}
		}
	}
};

await walkAndUpload(baseFolder);

console.log('\n🎉 Upload complete!');
console.log(uploadedImages);
