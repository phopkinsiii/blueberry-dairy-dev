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
			className='relative w-24 h-24 group overflow-hidden rounded shadow bg-gray-100 dark:bg-zinc-800'
		>
			<img src={url} alt='Goat' className='w-full h-full object-cover' />
			<button
				type='button'
				onClick={onRemove}
				className='absolute top-0 right-0 m-0.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl opacity-90 group-hover:opacity-100 transition'
			>
				✕
			</button>
		</div>
	);
};

export default SortableImage;
