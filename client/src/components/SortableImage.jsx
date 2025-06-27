// src/components/goats/SortableImage.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableImage = ({ id, url, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className='relative group cursor-move'
		>
			<img
				src={url}
				alt='Goat'
				className='h-24 w-24 object-cover rounded shadow'
			/>
			<button
				type='button'
				onClick={onRemove}
				className='absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl opacity-80 group-hover:opacity-100'
			>
				✕
			</button>
		</div>
	);
};

export default SortableImage;
