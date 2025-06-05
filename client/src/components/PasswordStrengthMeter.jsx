// @ts-nocheck
import { getPasswordStrength } from '../utils/validators';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const PasswordStrengthMeter = ({ password }) => {
	if (!password) return null;

	const { checks, strength } = getPasswordStrength(password);

	const rules = [
		{ label: 'At least 8 characters', passed: checks.length },
		{ label: 'One uppercase letter', passed: checks.uppercase },
		{ label: 'One lowercase letter', passed: checks.lowercase },
		{ label: 'One number', passed: checks.number },
		{ label: 'One symbol (e.g. !@#)', passed: checks.symbol },
	];

	return (
		<div className='mt-2 bg-white/10 p-4 rounded-lg shadow text-sm text-gray-200 space-y-3'>
			<p className='text-base font-semibold text-white mb-1'>
				Password must include:
			</p>
			<ul className='space-y-1'>
				{rules.map((rule, idx) => (
					<li key={idx} className='flex items-center gap-2'>
						{rule.passed ? (
							<CheckCircleIcon className='w-5 h-5 text-green-400' />
						) : (
							<XCircleIcon className='w-5 h-5 text-red-400' />
						)}
						<span>{rule.label}</span>
					</li>
				))}
			</ul>

			{/* Strength Meter */}
			<div className='mt-3'>
				<p className='text-xs text-gray-300 mb-1'>
					Password Strength: <span className='font-semibold'>{strength}</span>
				</p>
				<div className='w-full h-2 bg-gray-700 rounded'>
					<div
						className={`h-full rounded ${
							strength === 'Weak'
								? 'bg-red-500 w-1/3'
								: strength === 'Moderate'
								? 'bg-yellow-400 w-2/3'
								: 'bg-green-500 w-full'
						}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default PasswordStrengthMeter;
