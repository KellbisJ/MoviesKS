function createCategoriesPreview(categories) {
	containerPreviewLinks.innerHTML = '';
	categories.forEach((category) => {
		const categoryLink = document.createElement('a');
		const categoryTitle = document.createTextNode(category.name);

		containerPreviewText.textContent = 'BUSCAR PELICULA POR GÉNERO';

		categoryLink.classList.add('movieLink');
		categoryLink.setAttribute('id', category.id);
		categoryLink.append(categoryTitle);

		containerPreviewLinks.append(categoryLink);

		categoryLink.addEventListener('click', () => {
			location.hash = `#category=${category.id}-${category.name}`;
		});
	});
}
