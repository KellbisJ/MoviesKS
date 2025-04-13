import { Popcorn } from 'lucide-react';

const PopcornParticlesLoader = () => (
	<div className="flex justify-center items-center min-h-screen">
		<div className="relative mb-48">
			<Popcorn className="w-16 h-16 text-cyan-500 animate-pulse-slow drop-shadow-glow z-10" />

			<div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping-slow" />

			{[...Array(8)].map((_, i) => {
				const angle = i * 45 + Math.random() * 20;
				const distance = 40 + Math.random() * 20;
				return (
					<div
						key={i}
						className="absolute w-2 h-2 rounded-full animate-particle-float"
						style={
							{
								'--tx': `${Math.sin((angle * Math.PI) / 180) * distance}px`,
								'--ty': `${Math.cos((angle * Math.PI) / 180) * distance}px`,
								animationDelay: `${i * 0.2}s`,
								top: '50%',
								left: '50%',
								backgroundColor: i % 3 === 0 ? '#22d3ee' : i % 2 === 0 ? '#f472b6' : '#a78bfa',
								transform: 'translate(-50%, -50%)',
							} as React.CSSProperties
						}
					/>
				);
			})}
		</div>
	</div>
);

export { PopcornParticlesLoader };
