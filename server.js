// Import modules
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import "dotenv/config";

// Start app
const app = express();

// Connect to database
try {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD
	});
} catch (error) {
	console.log(error);
}

// Start server
app.listen(process.env.PORT, () => {
	console.log("Server live on port", process.env.PORT);
});
