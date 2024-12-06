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
const searchMovies = require('./api/routes/searchMovies');
const searchTv = require('./api/routes/searchTv');

app.get('/', (req, res) => {
	res.json({
		TrendingPreviewMovies: 'http://localhost:8000/api/trending/movie/day',
		TrendingPreviewTv: 'http://localhost:8000/api/trending/tv/day',
		PreviewMovieCategories: 'http://localhost:8000/api/genre/movie/list',
		PreviewTvCategories: 'http://localhost:8000/api/genre/tv/list',
		CategoryMoviePreview: 'http://localhost:8000/api/discover/movie?with_genres=28&page=1',
		CategoryTvPreview: 'http://localhost:8000/api/discover/tv?with_genres=10759&page=1',
		DetailMovie: 'http://localhost:8000/api/movie/550?language=en-US',
		DetailTv: 'http://localhost:8000/api/tv/1399?language=en-US',
		DetailMovieSimilar: 'http://localhost:8000/api/movie/550/similar?language=en-US&page=1',
		DetailTvSimilar: 'http://localhost:8000/api/tv/1399/similar?language=en-US&page=1',
		VideosMovies: 'http://localhost:8000/api/movie/550/videos?language=en-US',
		VideosTv: 'http://localhost:8000/api/tv/1399/videos?language=en-US',
		SearchMovies: 'http://localhost:8000/api/search/movie/hola',
		SearchTvSeries: 'http://localhost:8000/api/search/tv/game',
	});
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

app.use('/api', searchMovies);

app.use('/api', searchTv);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
