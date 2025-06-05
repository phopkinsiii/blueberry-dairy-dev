// components/ScrollingBanner.jsx
const ScrollingBanner = () => {
	return (
		<div className='relative mt-4 p-6 bg-gray-800 text-white text-2xl overflow-hidden h-12 flex items-center'>
			<div className='whitespace-nowrap animate-[scroll_15s_linear_infinite] hover:[animation-play-state:paused]'>
				<span className='px-8'>
					🌿 Welcome to Blueberry Dairy – Farm-fresh goat milk, hand-picked
					organic fruits, and more!
				</span>
				<span className='px-8'>
					🫐 Our First Market Day in Knoxville is June 21!
				</span>
				<span className='px-8'>🥛 We now sell pet milk!</span>
			</div>
		</div>
	);
};

export default ScrollingBanner;
