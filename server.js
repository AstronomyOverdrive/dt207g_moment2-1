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
		res.status(204).json(result);
	} catch (error) {
		res.status(500).json({error: 'Internal error: ' + error});
	}
});
// Add an entry
app.post("/resume", async (req, res) => {
	const newEntry = {
		company: req.body.company,
		title: req.body.title,
		location: req.body.location,
		year: req.body.year
	}
	const errorMsg = isRequestValid(newEntry);
	if (errorMsg === "") {
		try {
			const sql = "INSERT INTO workexperience (companyname, jobtitle, location, year) VALUES (?, ?, ?, ?)";
			const values = [newEntry.company, newEntry.title, newEntry.location, newEntry.year];
			const [result, fields] = await connection.execute(sql, values);
			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({error: 'Internal error: ' + error});
		}
	} else {
		res.status(400).json({error: 'Invalid request: ' + errorMsg});
	}
});
// Update an entry
app.put("/resume", async (req, res) => {
	const updateEntry = {
		id: req.body.id,
		company: req.body.company,
		title: req.body.title,
		location: req.body.location,
		year: req.body.year
	}
	const errorMsg = isRequestValid(updateEntry);
	if (errorMsg === "") {
		try {
			const sql = "UPDATE workexperience SET companyname = ?, jobtitle = ?, location = ?, year = ? WHERE id = ?";
			const values = [updateEntry.company, updateEntry.title, updateEntry.location, updateEntry.year, updateEntry.id];
			const [result, fields] = await connection.execute(sql, values);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({error: 'Internal error: ' + error});
		}
	} else {
		res.status(400).json({error: 'Invalid request: ' + errorMsg});
	}
});

// Validate
function isRequestValid(userInput) {
	let problems = "";
	// Check if object keys are valid
	for (let i = 0; i < Object.keys(userInput).length; i++) {
		const currentKey = Object.keys(userInput)[i];
		if (userInput[currentKey] === undefined) {
			problems += `\nObject key "${currentKey}" is missing!`;
		}
	}
	// Check specific keys
	if (problems === "") {
		// Check if strings are valid
		const expectedStrings = [
			{value: userInput.company, maxLength: 25},
			{value: userInput.title, maxLength: 25},
			{value: userInput.location, maxLength: 25}
		];
		expectedStrings.forEach(expectedString => {
			if (typeof expectedString.value === "string" && expectedString.value.replaceAll(" ", "") !== "") {
				if (expectedString.value.length > expectedString.maxLength) {
					problems += `\nValue "${expectedString.value}" exceeds ${expectedString.maxLength} characters!`;
				}
			} else {
				problems += `\nValue "${expectedString.value}" is not a valid string!`;
			}
		});
		// Check if year is valid
		if (typeof userInput.year === "number") {
			if (userInput.year < 1901 || userInput.year > 2155) {
				problems += `\nObject key "year" must in range 1901-2155`;
			}
		} else {
			problems += `\nObject key "year" is not a valid number!`;
		}
	}
	return problems;
}

// Start server
app.listen(process.env.PORT, () => {
	console.log("Server live on port", process.env.PORT);
});
