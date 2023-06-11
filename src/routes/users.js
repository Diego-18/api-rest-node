const { Router } = require('express');
const fetch = require('node-fetch');
const router = Router();

router.get('/', (req, res, next) => {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error en la solicitud a la API.');
			}
			return response.json();
		})
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = router;
