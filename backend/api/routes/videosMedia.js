const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const getMediaVideos = async (req, res, type) => {
	const { id } = req.params;
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}&language=es`;

	try {
		const { data } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ message: `Videos about ${type}, data not found` });
		} else {
			res.status(500).json({ message: `An error occurred while fetching ${type} videos` });
		}
	}
};

router.get('/movie/:id/videos', (req, res) => {
	getMediaVideos(req, res, 'movie');
});

router.get('/tv/:id/videos', (req, res) => {
	getMediaVideos(req, res, 'tv');
});

module.exports = router;
