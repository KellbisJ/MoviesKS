const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const searchMedia = async (req, res, type) => {
	const { query } = req.params;
	const { page = 1 } = req.query;
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
		query
	)}&api_key=${api_key}&language=es&include_adult=false&page=${page}`;

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (error.response) {
			res.status(error.response.status).json({ message: `Error searching ${type}: ${error.response.data.status_message}`, error: error.message });
		} else if (error.request) {
			res.status(500).json({ message: 'No response received', error: error.message });
		} else {
			res.status(500).json({ message: 'Error 500: Internal Server Error', error: error.message });
		}
	}
};

router.get('/search/movie/:query', (req, res) => {
	searchMedia(req, res, 'movie');
});

router.get('/search/tv/:query', (req, res) => {
	searchMedia(req, res, 'tv');
});

module.exports = router;
