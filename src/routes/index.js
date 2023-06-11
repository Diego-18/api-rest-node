const router = require('express').Router();

router.get('/test', (req, res) => {
	const data = {
		message: 'Hello World',
		name: 'Diego Chavez',
		website: 'https://diegochavez-dc.com',
	};

	res.json(data);
});

module.exports = router;
