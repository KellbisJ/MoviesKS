const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search/tv/:query', async (req, res) => {
	const { query } = req.params;
	const { page = 1 } = req.query;
	const api_key = process.env.API_KEY;
	const api_url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
		query
	)}&api_key=${api_key}&language=es&include_adult=false&page=${page}`;

	try {
		console.log('api url', api_url);

		const { data } = await axios.get(api_url);

		console.log('data api response', data);

		res.json(data);
	} catch (error) {
		if (error.response) {
			res.status(error.response.status).json({ message: `Error searching tv series: ${error.response.data.status_message}` });
		} else if (error.request) {
			res.status(500).json({ message: 'No response received' });
		} else {
			res.status(500).json({ message: 'Error 500: Internal Server Error' });
		}
	}
});

module.exports = router;
