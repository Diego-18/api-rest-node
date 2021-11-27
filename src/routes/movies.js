const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('../sample.json');

router.get('/', (req, res) => {
    res.json(movies);
});

/**
 * POST
 */
router.post('/', (req, res) => {
    const { title, director, year, rating, genre } = req.body;
    if(title && director && year && rating && genre) {
        const id = movies.length + 1;
        const newMovie = {...req.body, id};
        movies.push(newMovie);
        res.status(200).json(movies);
    }else{
        res.status(500).json({error:'Wrong Request'});
    }    
});

/**
 *  DELETE
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, index) => {
        if (movie.id == id) {
            movies.splice(index, 1);
        }
    });
    res.send(movies);
});

/**
 *  PUT
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating, genre } = req.body;
    if (title && director && year && rating && genre) {
        _.each(movies, (movie, index) => {
            if (movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
                movie.genre = genre;
            }
        });
        res.json(movies);
    }
    else{
        res.status(500).json({error:'Wrong Request'});
    }
})

module.exports = router;