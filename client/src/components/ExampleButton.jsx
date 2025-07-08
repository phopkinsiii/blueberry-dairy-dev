// src/components/ExampleButton.jsx
// src/components/ExampleButton.jsx
export default function ExampleButton({ label, onClick }) {
	return (
		<button
			onClick={onClick}
			className='px-4 py-2 bg-blue-500 text-white rounded'
		>
			{label}
		</button>
	);
}
