const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/movie/:id', async (req, res) => {
	const { id } = req.params;
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es`;

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ message: 'Movie not found' });
		} else {
			res.status(500).json({ message: 'An error occurred while fetching movie details' });
		}
	}
});

module.exports = router;
