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
			className='sortable-image'
		>
			<img src={url} alt='Goat' className='sortable-img' />
			<button type='button' onClick={onRemove} className='delete-btn'>
				✕
			</button>
		</div>
	);
};

export default SortableImage;
