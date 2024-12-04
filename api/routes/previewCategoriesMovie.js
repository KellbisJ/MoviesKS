const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/genre/movie/list', async (req, res) => {
	const api_key = process.env.API_KEY;
	const api_Url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es`;

	try {
		const { data } = await axios.get(api_Url);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: 'An error occurred while fetching trending movies' });
	}
});

module.exports = router;
