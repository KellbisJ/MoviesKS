const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const getTrendingMedia = async (req, res, type) => {
	const { page } = req.query;
	const api_key = process.env.API_KEY;
	let api_url = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${api_key}&language=es`;

	if (page) {
		api_url += `&page=${page}`;
	}

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ message: `No trending ${type} found` });
		} else {
			res.status(500).json({ message: `An error occurred while fetching trending ${type}` });
		}
	}
};

router.get('/trending/movie/day', (req, res) => {
	getTrendingMedia(req, res, 'movie');
});

router.get('/trending/tv/day', (req, res) => {
	getTrendingMedia(req, res, 'tv');
});

module.exports = router;
