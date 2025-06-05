	const errors = validateGoatForm(formData);
	if (Object.keys(errors).length > 0) {
		Object.values(errors).forEach((msg) => toast.error(msg));
		return;
	}