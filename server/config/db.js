// @ts-nocheck
import mongoose from 'mongoose';

const connectDB = async (retries = 5, delay = 3000) => {
	const uri = process.env.MONGO_URI;

	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const conn = await mongoose.connect(uri);
			console.log(`✅ MongoDB connected: ${conn.connection.host}`);
			return;
		} catch (error) {
			console.error(`❌ Attempt ${attempt} to connect to MongoDB failed: ${error.message}`);

			if (attempt === retries) {
				console.error('💥 All retries failed. Exiting...');
				process.exit(1);
			}

			console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}
};

export default connectDB;
