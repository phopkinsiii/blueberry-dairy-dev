stripe listen --forward-to localhost:5050/api/webhook

<SortableContext items={goat.images} strategy={verticalListSortingStrategy}>
	{goat.images.map((url, index) => (
		<SortableImage
			key={url}
			id={url}
			url={url}
			index={index}
			onRemove={() => removeImage(index)}
		/>
	))}
</SortableContext>
