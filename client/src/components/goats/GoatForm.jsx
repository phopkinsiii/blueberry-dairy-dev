// ✅ src/components/goats/GoatForm.jsx
// @ts-nocheck
import React from 'react';

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
	<div>
		<label htmlFor={name} className='block font-medium mb-1'>
			{label}
		</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className='w-full border px-3 py-2 rounded'
			required={type !== 'checkbox'}
		/>
	</div>
);

const GoatForm = ({
	goat,
	handleChange,
	handleAwardsChange,
	addAward,
	handleImageUpload,
	removeImage,
	onSubmit,
	isEdit = false,
}) => {
	if (!goat) return null;

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<InputField
				label='Nickname'
				name='nickname'
				value={goat.nickname}
				onChange={handleChange}
			/>
			<InputField
				label='Full Registered Name'
				name='registeredName'
				value={goat.registeredName}
				onChange={handleChange}
			/>
			<InputField
				label='Date of Birth'
				name='dob'
				type='date'
				value={goat.dob}
				onChange={handleChange}
			/>
			<InputField
				label='ADGA Registration Number'
				name='adgaId'
				value={goat.adgaId}
				onChange={handleChange}
			/>

			<div>
				<label className='block font-medium mb-1'>Gender</label>
				<select
					name='gender'
					value={goat.gender}
					onChange={handleChange}
					className='w-full border px-3 py-2 rounded'
				>
					<option value=''>Select</option>
					<option value='Doe'>Doe</option>
					<option value='Buck'>Buck</option>
					<option value='Wether'>Wether</option>
				</select>
			</div>

			<div>
				<label className='block font-medium mb-1'>Awards</label>
				{goat.awards.map((award, i) => (
					<input
						key={i}
						type='text'
						value={award}
						onChange={(e) => handleAwardsChange(i, e.target.value)}
						className='w-full mb-2 border px-3 py-2 rounded'
						placeholder='e.g., Best Udder 2024'
					/>
				))}
				<button
					type='button'
					onClick={addAward}
					className='text-blue-600 text-sm hover:underline'
				>
					+ Add Award
				</button>
			</div>

			<fieldset className='border p-4 rounded'>
				<legend className='text-sm font-semibold mb-2'>Pedigree</legend>
				{Object.entries(goat.pedigree).map(([key, value]) => (
					<InputField
						key={key}
						label={key.replace(/([A-Z])/g, ' $1')}
						name={key}
						value={value}
						onChange={handleChange}
					/>
				))}
			</fieldset>

			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					name='dnaConfirmed'
					checked={goat.dnaConfirmed}
					onChange={handleChange}
				/>
				<label>DNA Confirmed</label>
			</div>
			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					name='disbudded'
					checked={goat.disbudded}
					onChange={handleChange}
				/>
				<label>Disbudded</label>
			</div>

			<div className='flex items-center gap-2'>
				<input
					type='checkbox'
					name='forSale'
					checked={goat.forSale}
					onChange={handleChange}
				/>
				<label>For Sale</label>
			</div>

			{goat.forSale && (
				<>
					<InputField
						label='Price'
						name='price'
						type='number'
						value={goat.price}
						onChange={handleChange}
					/>
					<label className='block font-medium mb-1'>Additional Info</label>
					<textarea
						name='additionalInfo'
						value={goat.additionalInfo}
						onChange={handleChange}
						rows={4}
						className='w-full border px-3 py-2 rounded'
					/>
				</>
			)}

			{isEdit && goat.images && (
				<div>
					<label className='block font-medium mb-1'>Current Images</label>
					<div className='flex flex-wrap gap-4'>
						{goat.images.map((img, i) => (
							<div key={i} className='relative'>
								<img
									src={img}
									alt={`Goat ${i}`}
									className='h-32 w-32 object-cover rounded shadow'
								/>
								<button
									type='button'
									onClick={() => removeImage(i)}
									className='absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-600'
								>
									&times;
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			<div>
				<label className='block font-medium mb-1'>Upload Images</label>
				<input
					type='file'
					accept='image/*'
					multiple
					onChange={handleImageUpload}
				/>
			</div>

			<button
				type='submit'
				className='w-full bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800'
			>
				{isEdit ? 'Update Goat' : 'Add Goat'}
			</button>
		</form>
	);
};

export default GoatForm;
