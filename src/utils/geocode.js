const request = require("request");

module.exports = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiaGVucnlraW5nIiwiYSI6ImNqdXh0ODVlYjBhNWY0ZHFsMzg3dzRmanYifQ.GV7wIyTzV-gCSHPJG-DTqg&limit=1`;

	request({ url, json: true }, (error, response, body) => {
		if (error) {
			// Problem reaching API.
			callback("There was a problem reaching the API.", undefined);
		} else if (body.message) {
			// Wrong parameters.
			callback(body.message, undefined);
		} else if (body.features.length === 0) {
			// Wrong location
			callback("Location not found.", undefined);
		} else {
			// Everything went fine
			const { coordinates } = body.features[0].geometry;
			const longitude = coordinates[0];
			const latitude = coordinates[1];

			callback(undefined, {
				latitude,
				longitude,
				location: body.features[0].place_name
			});
		}
	});
};
