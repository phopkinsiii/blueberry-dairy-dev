import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const uri = process.env.MONGO_URI;
		await mongoose.connect(uri);
		console.log('Connected to Database');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export default connectDB;
