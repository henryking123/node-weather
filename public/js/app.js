document.querySelector("form").addEventListener("submit", e => {
	e.preventDefault();

	const address = document.querySelector("input").value;

	document.querySelector("#message-1").textContent = "";
	document.querySelector("#message-2").textContent = "";

	fetch(`http://localhost:3000/weather?address=${address}`)
		.then(res => res.json())
		.then(data => {
			if (data.error) return (document.querySelector("#message-1").textContent = data.error);

			document.querySelector("#message-1").textContent = data.location;
			document.querySelector("#message-2").textContent = data.forecast;
		});
});
