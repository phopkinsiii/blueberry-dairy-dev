// @ts-nocheck
// server/scripts/updateProductImageSrcs.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Product from '../models/productModel.js';

dotenv.config(); // make sure MONGO_URI is in server/.env

const imageMapPath = path.join('../server/scripts/cloudinaryImageMap.json');
const imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf-8'));

const filenameToUrl = {};
for (const entry of imageMap) {
	const filename = path.basename(entry.file).toLowerCase(); // "milk1.jpg"
	filenameToUrl[filename] = entry.url;
}

const runUpdate = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('✅ Connected to MongoDB');

		const products = await Product.find();
		console.log(`🔍 Found ${products.length} products`);

		for (const product of products) {
			const currentFilename = path
				.basename(product.imageSrc || '')
				.toLowerCase();

			if (!currentFilename) continue;

			const cloudinaryUrl = filenameToUrl[currentFilename];

			if (cloudinaryUrl && product.imageSrc !== cloudinaryUrl) {
				console.log(`↪ Updating ${product.name}: ${currentFilename}`);
				product.imageSrc = cloudinaryUrl;
				await product.save();
			} else if (!cloudinaryUrl) {
				console.warn(`⚠️ No match found for ${currentFilename}`);
			}
		}

		console.log('🎉 All updates complete!');
		process.exit(0);
	} catch (err) {
		console.error('❌ Update failed:', err);
		process.exit(1);
	}
};

runUpdate();
