import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dataBase/db.js';

import urlRoute from './routes/urlRoute.js';

const app = express();

dotenv.config();
connectDB();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");

	if (req.method === "OPTIONS") {
		return res.sendStatus(204);
	}

	next();
});

app.use(express.json());
app.use(urlRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Server is running at ' + PORT);
});