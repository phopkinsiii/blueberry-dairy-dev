// @ts-nocheck
import { useRef } from 'react';
import { useTooltipTrigger } from '@react-aria/tooltip';
import { useTooltip } from '@react-aria/tooltip';
import { useOverlayTriggerState } from '@react-stately/overlays';

export default function TooltipIconButton({
	onClick,
	icon: Icon,
	tooltipText,
	buttonClass = '',
}) {
	const buttonRef = useRef();
	const tooltipRef = useRef();
	const state = useOverlayTriggerState({});
	const { triggerProps, tooltipProps } = useTooltipTrigger(
		{},
		state,
		buttonRef
	);
	const { tooltipProps: tooltipContentProps } = useTooltip({}, tooltipRef);

	return (
		<div className='relative inline-flex'>
			<button
				{...triggerProps}
				ref={buttonRef}
				onClick={onClick}
				className={`flex items-center border border-black text-black bg-white text-sm p-2 rounded hover:bg-black hover:text-white transition ${buttonClass}`}
			>
				<Icon className='w-5 h-5' />
			</button>

			{state.isOpen && (
				<div
					{...tooltipProps}
					{...tooltipContentProps}
					ref={tooltipRef}
					className='absolute left-full ml-2 bg-black text-white text-xs rounded px-2 py-1 shadow transition-all duration-200 ease-out opacity-100 translate-y-0'
					style={{
						transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
						opacity: 1,
						transform: 'translateY(0)',
					}}
				>
					{tooltipText}
				</div>
			)}
		</div>
	);
}
