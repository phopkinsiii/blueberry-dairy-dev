// @ts-nocheck
import {
	TbBold,
	TbItalic,
	TbUnderline,
	TbStrikethrough,
	TbH1,
	TbH2,
	TbH3,
	TbListNumbers,
	TbList,
	TbAlignLeft,
	TbAlignCenter,
	TbAlignRight,
	TbLink,
	TbPhotoPlus,
	TbFloatLeft,
	TbFloatRight,
	TbTrash,
} from 'react-icons/tb';
import { useRef } from 'react';

const MenuBar = ({ editor }) => {
	const fileInputRef = useRef();

	if (!editor) return null;

	const handleImageUpload = () => fileInputRef.current?.click();

	const insertImage = (url) => {
		editor
			.chain()
			.focus()
			.setImage({ src: url, class: 'blog-image resizable' })
			.run();
	};

	const uploadImageToCloudinary = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append(
			'upload_preset',
			import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
		);

		try {
			const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			if (data.secure_url) insertImage(data.secure_url);
		} catch (error) {
			console.error('Cloudinary upload failed:', error);
		}
	};

	const onFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) uploadImageToCloudinary(file);
	};

	const iconButton = (Icon, onClick, isActive, label, disabled = false) => (
		<button
			type='button'
			onClick={onClick}
			title={label}
			disabled={disabled}
			className={`p-2 rounded hover:bg-[var(--border-color)] ${
				isActive ? 'bg-[var(--input-bg)]' : 'bg-transparent'
			} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
		>
			<Icon className='w-5 h-5 text-[var(--text-color)]' />
		</button>
	);

	return (
		<div
			className='flex flex-wrap gap-1 mb-4 rounded p-2'
			style={{
				backgroundColor: 'var(--input-bg)',
				border: '1px solid var(--border-color)',
			}}
		>
			{iconButton(
				TbBold,
				() => editor.chain().focus().toggleBold().run(),
				editor.isActive('bold'),
				'Bold'
			)}
			{iconButton(
				TbItalic,
				() => editor.chain().focus().toggleItalic().run(),
				editor.isActive('italic'),
				'Italic'
			)}
			{iconButton(
				TbUnderline,
				() => editor.chain().focus().toggleUnderline().run(),
				editor.isActive('underline'),
				'Underline'
			)}
			{iconButton(
				TbStrikethrough,
				() => editor.chain().focus().toggleStrike().run(),
				editor.isActive('strike'),
				'Strikethrough'
			)}
			{iconButton(
				TbH1,
				() => editor.chain().focus().toggleHeading({ level: 1 }).run(),
				editor.isActive('heading', { level: 1 }),
				'Heading 1'
			)}
			{iconButton(
				TbH2,
				() => editor.chain().focus().toggleHeading({ level: 2 }).run(),
				editor.isActive('heading', { level: 2 }),
				'Heading 2'
			)}
			{iconButton(
				TbH3,
				() => editor.chain().focus().toggleHeading({ level: 3 }).run(),
				editor.isActive('heading', { level: 3 }),
				'Heading 3'
			)}
			{iconButton(
				TbListNumbers,
				() => editor.chain().focus().toggleOrderedList().run(),
				editor.isActive('orderedList'),
				'Ordered List'
			)}
			{iconButton(
				TbList,
				() => editor.chain().focus().toggleBulletList().run(),
				editor.isActive('bulletList'),
				'Bullet List'
			)}
			{iconButton(
				TbAlignLeft,
				() => editor.chain().focus().setTextAlign('left').run(),
				editor.isActive({ textAlign: 'left' }),
				'Align Left'
			)}
			{iconButton(
				TbAlignCenter,
				() => editor.chain().focus().setTextAlign('center').run(),
				editor.isActive({ textAlign: 'center' }),
				'Align Center'
			)}
			{iconButton(
				TbAlignRight,
				() => editor.chain().focus().setTextAlign('right').run(),
				editor.isActive({ textAlign: 'right' }),
				'Align Right'
			)}
			{iconButton(
				TbLink,
				() => {
					const url = window.prompt('Enter URL');
					if (url) {
						editor.chain().focus().setLink({ href: url }).run();
					}
				},
				editor.isActive('link'),
				'Add Link'
			)}
			{iconButton(TbPhotoPlus, handleImageUpload, false, 'Upload Image')}

			<input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={onFileChange}
			/>
			{iconButton(
				TbFloatLeft,
				() =>
					editor
						.chain()
						.focus()
						.updateAttributes('image', {
							class: 'blog-image blog-image-left',
						})
						.run(),
				editor.isActive('image', { class: 'blog-image blog-image-left' }),
				'Float Left'
			)}
			{iconButton(
				TbFloatRight,
				() =>
					editor
						.chain()
						.focus()
						.updateAttributes('image', {
							class: 'blog-image blog-image-right',
						})
						.run(),
				editor.isActive('image', { class: 'blog-image blog-image-right' }),
				'Float Right'
			)}

			{iconButton(
				TbTrash,
				() => editor.commands.deleteSelection(),
				editor.isActive('image'),
				'Delete Image',
				!editor.isActive('image')
			)}
		</div>
	);
};

export default MenuBar;
