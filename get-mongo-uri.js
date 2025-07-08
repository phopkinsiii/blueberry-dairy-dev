import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' }); // Adjust if needed
console.log(process.env.MONGO_URI);
