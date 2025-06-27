// @ts-nocheck
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';

const SortableImage = ({ id, url, onRemove }) => {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='relative border rounded shadow-sm overflow-hidden group bg-white'
		>
			<img src={url} alt='Goat' className='w-full h-24 object-cover' />

			<button
				type='button'
				onClick={(e) => {
					e.stopPropagation(); // Prevent drag conflict
					console.log('🗑️ Removing image:', id);
					onRemove();
				}}
				className='absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-600 hover:bg-white shadow-md z-10'
				title='Remove image'
			>
				<X size={16} />
			</button>

			<div
				className='absolute bottom-1 left-1 p-1 cursor-grab text-gray-600 hover:text-gray-900'
				title='Drag to reorder'
				{...attributes}
				{...listeners}
			>
				<GripVertical size={16} />
			</div>
		</div>
	);
};

export default SortableImage;
