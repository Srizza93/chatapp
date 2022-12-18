const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/api/users");
const userRoutes = require("./routes/api/user");
const chatRoutes = require("./routes/api/chat");
const path = require("path");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
	.connect(mongoUri)
	.then(() => console.log("MongoDB database Connected..."))
	.catch((err) => console.log(err));

app.use("/api/users", usersRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/dist"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT}`)
);
