// src/components/layouts/DarkPageLayout.jsx
const DarkPageLayout = ({ children }) => {
	return (
		<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
			{children}
		</div>
	);
};

export default DarkPageLayout;
