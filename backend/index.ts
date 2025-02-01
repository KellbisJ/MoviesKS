import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());

import previewMedia from './api/routes/preview-media';
import previewCategoriesMedia from './api/routes/preview-categories-media';
// import categoryMediaPreview from './api/routes/categoryMediaPreview';

// import detailMedia from './api/routes/detailMedia';
// import detailMediaSimilar from './api/routes/detailMediaSimilar';
// import videosMedia from './api/routes/videosMedia';
// import searchMedia from './api/routes/searchMedia';

app.get('/', (req: Request, res: Response) => {
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

app.use('/api', previewMedia);
app.use('/api', previewCategoriesMedia);
// app.use('/api', categoryMediaPreview);
// app.use('/api', detailMedia);
// app.use('/api', detailMediaSimilar);
// app.use('/api', videosMedia);
// app.use('/api', searchMedia);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
