// src/components/goats/GoatForm.jsx
import {
	inputClass,
	selectClass,
	checkboxClass,
	sectionClass,
	labelClass,
	formContainerClass,
	textareaClass,
} from '../../utils/formStyles';

import {
	DndContext,
	closestCenter,
	PointerSensor,
	KeyboardSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
	arrayMove,
} from '@dnd-kit/sortable';
import SortableImage from '../SortableImage';

const GoatForm = ({
	goat,
	handleChange,
	handleAwardsChange,
	addAward,
	handleImageUpload,
	imageFiles = [],
	imageUrls,
	handleImageUrlChange,
	addImageUrlField,
	removeImage,
	updateImageOrder,
	onSubmit,
	isEdit = false,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		const oldIndex = goat.images.findIndex((img) => img === active.id);
		const newIndex = goat.images.findIndex((img) => img === over.id);

		if (oldIndex === -1 || newIndex === -1) return;

		const reordered = arrayMove(goat.images, oldIndex, newIndex);

		updateImageOrder(reordered); // ✅ This is where it goes
	};

	return (
		<>
			<div className={formContainerClass}>
				<form onSubmit={onSubmit} className={sectionClass}>
					{/* Nickname, Registered Name, DOB, ADGA ID */}
					<InputField
						label='Nickname'
						name='nickname'
						value={goat.nickname}
						onChange={handleChange}
					/>
					<InputField
						label='Registered Name'
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
						label='ADGA ID'
						name='adgaId'
						value={goat.adgaId}
						onChange={handleChange}
					/>

					{/* Gender */}
					<div>
						<label className={labelClass}>Gender</label>
						<select
							name='gender'
							value={goat.gender}
							onChange={handleChange}
							className={selectClass}
						>
							<option value=''>Select</option>
							<option value='Doe'>Doe</option>
							<option value='Buck'>Buck</option>
							<option value='Wether'>Wether</option>
						</select>
					</div>

					{/* Awards */}
					<div>
						<label className='block mb-2 font-medium'>Awards</label>
						{goat.awards.map((award, index) => (
							<input
								key={index}
								type='text'
								value={award}
								onChange={(e) => handleAwardsChange(index, e.target.value)}
								className='w-full border px-3 py-2 mb-2 rounded'
								placeholder={`Award ${index + 1}`}
							/>
						))}
						<button
							type='button'
							onClick={addAward}
							className='text-sm text-blue-600 hover:underline'
						>
							+ Add another award
						</button>
					</div>

					{/* Pedigree */}
					<h3 className='text-lg font-semibold mt-4'>Pedigree</h3>
					{['sire', 'dam', 'siresSire', 'siresDam', 'damsSire', 'damsDam'].map(
						(field) => (
							<InputField
								key={field}
								label={field.replace(/([A-Z])/g, ' $1')}
								name={field}
								value={goat.pedigree[field]}
								onChange={handleChange}
							/>
						)
					)}

					{/* Flags */}
					<CheckboxField
						label='DNA Confirmed'
						name='dnaConfirmed'
						checked={goat.dnaConfirmed}
						onChange={handleChange}
					/>
					<CheckboxField
						label='Disbudded'
						name='disbudded'
						checked={goat.disbudded}
						onChange={handleChange}
					/>
					<CheckboxField
						label='For Sale'
						name='forSale'
						checked={goat.forSale}
						onChange={handleChange}
					/>

					{/* Price */}
					{goat.forSale && (
						<InputField
							label='Price ($)'
							name='price'
							type='number'
							value={goat.price}
							onChange={handleChange}
						/>
					)}

					{/* Additional Info */}
					<div>
						<label className={labelClass}>Additional Info</label>
						<textarea
							name='additionalInfo'
							value={goat.additionalInfo}
							onChange={handleChange}
							className={textareaClass}
							rows={4}
						/>
					</div>

					{/* Current Images (Sortable) */}
					{console.log('🧩 rendering SortableContext block', goat.images)}
					{isEdit && goat.images?.length > 0 && (
						<div>
							<label className='block font-medium mb-2'>Current Images</label>
							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={goat.images}
									strategy={rectSortingStrategy}
								>
									<div className='grid grid-cols-3 gap-2'>
										{goat.images.map((url) => (
											<SortableImage
												key={url}
												id={url}
												url={url}
												onRemove={() => removeImage(url)}
											/>
										))}
									</div>
								</SortableContext>
							</DndContext>
						</div>
					)}

					{/* File Upload */}
					<div>
						<label className='block font-medium mb-1'>Upload Images</label>
						<label className='inline-block bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700'>
							Choose Images
							<input
								type='file'
								accept='image/*'
								multiple
								onChange={handleImageUpload}
								className='hidden'
							/>
						</label>

						{imageFiles.length > 0 && (
							<div className='grid grid-cols-3 gap-2 mt-3'>
								{imageFiles.map((file, index) => (
									<img
										key={index}
										src={URL.createObjectURL(file)}
										alt={`Preview ${index + 1}`}
										className='h-24 w-24 object-cover rounded shadow'
									/>
								))}
							</div>
						)}
					</div>

					{/* Manual Image URLs */}
					<div>
						<label className={labelClass}>Or Enter Image URLs</label>
						{imageUrls.map((url, index) => (
							<div key={index} className='mb-2'>
								<input
									type='text'
									value={url}
									onChange={(e) => handleImageUrlChange(index, e.target.value)}
									className='w-full border px-3 py-2 mb-1 rounded'
									placeholder={`Image URL ${index + 1}`}
								/>
								{url.trim().startsWith('http') && (
									<img
										src={url}
										alt={`URL Preview ${index + 1}`}
										className='h-24 w-24 object-cover rounded shadow'
									/>
								)}
							</div>
						))}
						<button
							type='button'
							onClick={addImageUrlField}
							className='text-sm text-blue-600 hover:underline'
						>
							+ Add another image URL
						</button>
					</div>

					{/* Submit */}
					<button
						type='submit'
						className='w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
					>
						{isEdit ? 'Update Goat' : 'Add Goat'}
					</button>
				</form>
			</div>
		</>
	);
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
	<div>
		<label htmlFor={name} className={labelClass}>
			{label}
		</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={inputClass}
			required={type !== 'checkbox'}
		/>
	</div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
	<div className='flex items-center space-x-2'>
		<input
			type='checkbox'
			name={name}
			checked={checked}
			onChange={onChange}
			className={checkboxClass}
		/>
		<label htmlFor={name} className={labelClass}>
			{label}
		</label>
	</div>
);

export default GoatForm;
