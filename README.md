# URL Shortener

A simple URL shortener built with Node.js, Express, and MongoDB.

## Features

- Create a short URL from a long URL
- Redirect a short URL back to the original URL
- Track redirect clicks in MongoDB

## Project Structure

- `index.js` - Express server entry point
- `dataBase/db.js` - MongoDB connection
- `controllers/controller.js` - API logic
- `routes/urlRoute.js` - API routes
- `models/url.js` - Mongoose model
- `utils/shortId.js` - Short ID generator

## Prerequisites

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```

If you are using MongoDB Atlas, replace the `MONGO_URI` value with your Atlas connection string.

## Run the Backend

Start the API server:

```bash
node index.js
```

If everything is configured correctly, the server will run on `http://localhost:5000`.

## Open the Frontend

Open `frontend/index.html` in your browser. You can also use VS Code Live Server if you want a local dev server.

The frontend sends requests to `http://localhost:5000`, so make sure the backend is running before you try to shorten a URL.

1. Start MongoDB
2. Run the backend from the project root
3. Open `frontend/index.html`
4. Paste a URL and click the shorten button
## API Endpoints

### POST `/shorten`

Creates a short URL.

Request body:

```json
{
  "originalUrl": "https://example.com"
}
```

Response:

```json
{
  "shortUrl": "abc123XYZ9"
}
```

### GET `/:shortUrl`

Redirects the short URL to the original URL.

Example:

```text
http://localhost:5000/abc123XYZ9
```

## Postman Test

1. Set method to `POST`
2. Use URL `http://localhost:5000/shorten`
3. Add header `Content-Type: application/json`
4. Send this JSON body:

```json
{
  "originalUrl": "https://google.com"
}
```

You should get back a `shortUrl` value.

## Notes

- Make sure MongoDB is running before starting the server.
