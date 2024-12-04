const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const previewMovie = require('./api/routes/previewMovie');
const previewTV = require('./api/routes/previewTv');
const previewMovieCategories = require('./api/routes/previewCategoriesMovie');
const previewTvCategories = require('./api/routes/previewCategoriesTv');
const categoryMoviePreview = require('./api/routes/categoryMoviePreview');
const categoryTvPreview = require('./api/routes/categoryTvPreview');
const detailMovie = require('./api/routes/detailMovie');
const detailTv = require('./api/routes/detailTv');
const detailMovieSimilar = require('./api/routes/detailMovieSimilar');
const detailTvSimilar = require('./api/routes/detailTvSimilar');
const videosMovies = require('./api/routes/videosMovies');
const videosTv = require('./api/routes/videosTv');

app.get('/', (req, res) => {
	res.json('holas');
});

app.use('/api', previewMovie);

app.use('/api', previewTV);

app.use('/api', previewMovieCategories);

app.use('/api', categoryMoviePreview);

app.use('/api', previewTvCategories);

app.use('/api', categoryTvPreview);

app.use('/api', detailMovie);

app.use('/api', detailTv);

app.use('/api', detailMovieSimilar);

app.use('/api', detailTvSimilar);

app.use('/api', videosMovies);

app.use('/api', videosTv);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
