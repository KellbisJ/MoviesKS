const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const getCategoryList = async (req, res, type) => {
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=es`;

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: `An error occurred while fetching ${type} categories` });
	}
};

router.get('/genre/movie/list', (req, res) => {
	getCategoryList(req, res, 'movie');
});

router.get('/genre/tv/list', (req, res) => {
	getCategoryList(req, res, 'tv');
});

module.exports = router;
