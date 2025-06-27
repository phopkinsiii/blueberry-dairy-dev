// @ts-nocheck
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
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
	onSubmit,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const oldIndex = goat.images.findIndex((url) => url === active.id);
			const newIndex = goat.images.findIndex((url) => url === over.id);
			const reordered = arrayMove(goat.images, oldIndex, newIndex);
			handleChange({ target: { name: 'images', value: reordered } });
		}
	};

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			{/* ... other fields ... */}

			{goat.images?.length > 0 && (
				<div className='mt-4'>
					<label className='block font-medium mb-1'>Current Images</label>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={goat.images}
							strategy={verticalListSortingStrategy}
						>
							<div className='grid grid-cols-3 gap-3'>
								{goat.images.map((url) => (
									<SortableImage
										key={url}
										id={url}
										url={url}
										onRemove={() =>
											removeImage(goat.images.findIndex((img) => img === url))
										}
										listeners={{}} // Required so props match useSortable
										attributes={{}} // Required so props match useSortable
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>
				</div>
			)}

			{/* ... rest of form ... */}
		</form>
	);
};

export default GoatForm;
