// scripts/importMilkRecords.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.resolve(__dirname, '../server/.env') });

// Import and run DB connection logic
const { default: connectDB } = await import('../server/config/db.js');
await connectDB(); // uses your retry-capable version

// Import models AFTER connecting to DB
const { default: Goat } = await import('../server/models/goatModel.js');
const { default: MilkRecord } = await import('../server/models/milkModel.js');

const csvFilePath = path.resolve(__dirname, 'Milk 2025.csv');

const importMilkRecords = async () => {
	const records = [];

	fs.createReadStream(csvFilePath)
		.pipe(csv())
		.on('data', (row) => records.push(row))
		.on('end', async () => {
			console.log(`📄 Parsed ${records.length} rows`);

			for (const row of records) {
				const nickname = row['Choose Goat Name']?.trim();
				const amount = parseFloat(row['Milk Weight']);
				const dateStr = row['Date'];
				const timeStr = row['Time']?.replace(/\s+/g, '');

				if (!nickname || isNaN(amount) || !dateStr || !timeStr) {
					console.warn('⚠️ Skipping invalid row:', row);
					continue;
				}

				const recordedAt = new Date(`${dateStr} ${timeStr}`);
				if (isNaN(recordedAt)) {
					console.warn(`⚠️ Invalid datetime: ${dateStr} ${timeStr}`);
					continue;
				}

				let goat;
				try {
					goat = await Goat.findOne({ nickname });
				} catch (err) {
					console.error(`❌ Error finding goat ${nickname}:`, err.message);
					continue;
				}

				if (!goat) {
					console.warn(`⚠️ Goat not found: ${nickname}`);
					continue;
				}

				const record = new MilkRecord({
					goat: goat._id,
					recordedAt,
					amount,
					notes: row['Comments'] || '',
				});

				try {
					await record.save();
					console.log(`✅ Saved: ${nickname} | ${recordedAt.toISOString()}`);
				} catch (err) {
					console.error(`❌ Error saving record for ${nickname}:`, err.message);
				}
			}

			console.log('🎉 All records processed.');
			process.exit(0);
		});
};

importMilkRecords();
