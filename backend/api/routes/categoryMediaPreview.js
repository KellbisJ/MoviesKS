const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const getCategoryMedia = async (req, res, type) => {
	const { with_genres, page } = req.query;
	const api_key = process.env.API_KEY;
	const api_Url = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=es&with_genres=${with_genres}&page=${page}`;

	try {
		const { data } = await axios.get(api_Url);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: `An error occurred while fetching ${type} by category` });
	}
};

router.get('/discover/movie', (req, res) => {
	getCategoryMedia(req, res, 'movie');
});

router.get('/discover/tv', (req, res) => {
	getCategoryMedia(req, res, 'tv');
});

module.exports = router;
