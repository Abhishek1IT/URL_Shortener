import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dataBase/db.js';

import urlRoute from './routes/urlRoute.js';

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
// Simple CORS middleware - allow browser clients to call this API
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		return res.status(200).end();
	}
	next();
});
app.use(urlRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Server is running at ' + PORT);
});