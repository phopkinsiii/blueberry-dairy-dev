import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ExampleButton from '../../src/components/ExampleButton';

describe('ExampleButton Component', () => {
	it('renders the button with correct label', () => {
		render(<ExampleButton label='Click Me' onClick={() => {}} />);

		expect(screen.getByText('Click Me')).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(<ExampleButton label='Click' onClick={handleClick} />);
		fireEvent.click(screen.getByText(/Click/i));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
