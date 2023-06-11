const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const router = Router();
const { each } = require('underscore');
const movies = require('../sample.json');

router.get('/', (req, res) => {
	res.json(movies);
});

router.post(
	'/',
	[
		body('title').notEmpty(),
		body('director').notEmpty(),
		body('year').notEmpty(),
		body('rating').notEmpty(),
		body('genre').notEmpty(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, director, year, rating, genre } = req.body;
		const id = movies.length + 1;
		const newMovie = { id, title, director, year, rating, genre };
		movies.push(newMovie);
		res.status(200).json(movies);
	}
);

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const index = movies.findIndex((movie) => movie.id == id);
	if (index !== -1) {
		movies.splice(index, 1);
	}
	res.send(movies);
});

router.put(
	'/:id',
	[
		body('title').notEmpty(),
		body('director').notEmpty(),
		body('year').notEmpty(),
		body('rating').notEmpty(),
		body('genre').notEmpty(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { id } = req.params;
		const { title, director, year, rating, genre } = req.body;
		const movie = movies.find((movie) => movie.id == id);
		if (movie) {
			movie.title = title;
			movie.director = director;
			movie.year = year;
			movie.rating = rating;
			movie.genre = genre;
		}
		res.json(movies);
	}
);

module.exports = router;
