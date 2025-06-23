import { useState } from 'react';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 0.7;

const compressImage = (file) =>
	new Promise((resolve) => {
		const img = new Image();
		const reader = new FileReader();

		reader.onload = (e) => {
			img.src = e.target.result;
		};

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const scale = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height, 1);
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			canvas.toBlob(
				(blob) => {
					const compressed = new File([blob], file.name, {
						type: 'image/jpeg',
					});
					resolve(compressed);
				},
				'image/jpeg',
				QUALITY
			);
		};

		reader.readAsDataURL(file);
	});

const ImageUploadWithPreview = ({ onCompressedImage }) => {
	const [preview, setPreview] = useState(null);

	const handleChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const compressed = await compressImage(file);
		setPreview(URL.createObjectURL(compressed));
		onCompressedImage(compressed);
	};

	return (
		<div className='mb-4'>
			<label
				htmlFor='imageUpload'
				className='inline-block px-4 py-2 rounded cursor-pointer'
				style={{
					backgroundColor: 'var(--input-bg)',
					color: 'var(--text-color)',
					border: '1px solid var(--border-color)',
				}}
			>
				Choose Image
			</label>
			<input
				id='imageUpload'
				type='file'
				accept='image/*'
				onChange={handleChange}
				className='hidden'
			/>
			{preview && (
				<div className='mt-4'>
					<img
						src={preview}
						alt='Preview'
						className='max-w-xs rounded shadow border'
					/>
					<p className='text-sm text-gray-600 mt-2'>
						Image preview (compressed)
					</p>
				</div>
			)}
		</div>
	);
};

export default ImageUploadWithPreview;
