import React, { useState, useEffect } from 'react';

const imageUrls = [
	'https://res.cloudinary.com/demo/image/upload/w_400/cld-sample',
	'https://res.cloudinary.com/demo/image/upload/w_400/cld-sample-2',
	'https://res.cloudinary.com/demo/image/upload/w_400/cld-sample-3',
];

function ImageGallery() {
	const [cachedImages, setCachedImages] = useState({}); // I suppose I've to send to ImageGallery functin the images I'm fetching, idk.

	useEffect(() => {
		const loadImages = async () => {
			const cache = { ...cachedImages };

			for (const url of imageUrls) {
				const cachedImage = localStorage.getItem(url);
				if (cachedImage) {
					cache[url] = cachedImage;
				} else { 
					try {
						const response = await fetch(url);
						const blob = await response.blob();
						const reader = new FileReader();
						reader.onloadend = () => {
							const base64data = reader.result;
							localStorage.setItem(url, base64data);
							cache[url] = base64data;
							setCachedImages({ ...cache });
						};
						reader.readAsDataURL(blob);
					} catch (error) {
						console.error('Error caching image:', error);
					}
				}
			}
			setCachedImages(cache);
		};

		loadImages();
	}, []);

	return (
		<div>
			{imageUrls.map((url, index) => (
				<img
					key={index}
					src={cachedImages[url] || url}
					alt={`Image ${index + 1}`}
					style={{ margin: '10px' }}
				/>
			))}
		</div>
	);
}

export default ImageGallery;
