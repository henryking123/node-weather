const request = require("request");

module.exports = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/e5375488f1fcb71f915a319ba24d3a1e/${latitude},${longitude}`;

	request({ url, json: true }, (error, response, body) => {
		// Error connecting to API
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			// Invalid input.
			callback(body.error, undefined);
		} else {
			// Nothing went wrong
			const { temperature, precipProbability } = body.currently;

			const response = `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`;

			callback(undefined, response);
		}
	});
};
