const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for express config
const publicDir = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates/views");
const partialsPath = path.join(__dirname, "..", "templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
	res.render("index", { title: "Weather" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About Me" });
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		helpMessage: "Help me help me help me"
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", { title: "404", error: "Help article not found" });
});

app.get("/weather", (req, res) => {
	const { address } = req.query;
	// Check if address is given
	if (!address) return res.send({ error: "You must provide an address." });

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) return res.send({ error });

		forecast(latitude, longitude, (error, forecast) => {
			if (error) return res.send({ error });

			res.send({ location, forecast, address });
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({ error: "You must provide a search term." });
	}

	res.send({ products: [] });
});

app.get("*", (req, res) => {
	res.render("404", { title: "404", error: "Page not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
