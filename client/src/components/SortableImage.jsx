// src/components/SortableImage.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';

const SortableImage = ({ id, url, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} className='relative border shadow'>
			{/* Image */}
			<img src={url} alt='Goat' className='h-24 w-24 object-cover' />

			{/* Drag Handle */}
			<div
				{...attributes}
				{...listeners}
				className='absolute bottom-0 left-0 bg-white rounded-full p-1 shadow cursor-grab hover:bg-gray-100'
				aria-label='Drag to reorder'
			>
				<GripVertical size={16} className='text-gray-600' />
			</div>

			{/* Delete Button */}
			<button
				type='button'
				onClick={(e) => {
					e.stopPropagation();
					onRemove();
				}}
				className='absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-red-100'
				aria-label='Remove image'
			>
				<X size={16} className='text-red-600' />
			</button>
		</div>
	);
};

export default SortableImage;
