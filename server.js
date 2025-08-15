// Import modules
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";
import "dotenv/config";

// Start app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
let connection;
try {
	connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD
	});
} catch (error) {
	console.log(error);
}

// Routing
// Get work experience
app.get("/resume", async (req, res) => {
	try {
		const sql = "SELECT * FROM workexperience ORDER BY year";
		const [rows, fields] = await connection.query(sql);
		res.status(200).json(rows);
	} catch (error) {
		res.status(500).json({error: 'Internal error: ' + error});
	}
});
// Delete an entry
app.delete("/resume", async (req, res) => {
	try {
		const sql = "DELETE FROM workexperience WHERE id = ?";
		const values = [req.body.id];
		const [result, fields] = await connection.execute(sql, values);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({error: 'Internal error: ' + error});
	}
});

// Start server
app.listen(process.env.PORT, () => {
	console.log("Server live on port", process.env.PORT);
});
