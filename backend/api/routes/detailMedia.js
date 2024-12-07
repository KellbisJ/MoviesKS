const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const getMediaDetail = async (req, res, type) => {
	const { id } = req.params;
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=es`;

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`, error: error.message });
		} else {
			res.status(500).json({ message: `An error occurred while fetching ${type} details`, error: error.message });
		}
	}
};

router.get('/movie/:id', (req, res) => {
	getMediaDetail(req, res, 'movie');
});

router.get('/tv/:id', (req, res) => {
	getMediaDetail(req, res, 'tv');
});

module.exports = router;
