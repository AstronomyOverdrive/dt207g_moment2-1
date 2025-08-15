// Import modules
const mysql = require("mysql2");
require("dotenv").config();

// Database to use
const dbName = process.env.DB_DATABASE;
// Connect to database
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD
});

// Listen for errors
connection.addListener("error", (error) => {
	console.log(error);
});

// SQL commands to run
const sqlCommands = [
	// Create database
	`DROP DATABASE IF EXISTS ${dbName}`,
	`CREATE DATABASE ${dbName} CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_uca1400_ai_ci'`,
	`USE ${dbName}`,
	// Create table
	`CREATE TABLE workexperience (
		id INT NOT NULL AUTO_INCREMENT,
		companyname VARCHAR(25),
		jobtitle VARCHAR(25),
		location VARCHAR(25),
		year YEAR,
		PRIMARY KEY (id)
	)`,
	// Insert data
	`INSERT INTO workexperience (companyname, jobtitle, location, year)
	VALUES (
		'GKN Driveline',
		'Underhållselektriker',
		'Köping',
		2020
	)`,
	`INSERT INTO workexperience (companyname, jobtitle, location, year)
	VALUES (
		'Seco Tools',
		'Underhållsmekaniker',
		'Arboga',
		2021
	)`,
	`INSERT INTO workexperience (companyname, jobtitle, location, year)
	VALUES (
		'GKN Driveline',
		'Montör',
		'Köping',
		2021
	)`,
	`INSERT INTO workexperience (companyname, jobtitle, location, year)
	VALUES (
		'Yara',
		'Underhållselektriker',
		'Köping',
		2022
	)`,
	`INSERT INTO workexperience (companyname, jobtitle, location, year)
	VALUES (
		'Volvo Powertrain AB',
		'CNC-Operatör',
		'Köping',
		2023
	)`
];

// Run SQL commands
sqlCommands.forEach(command => {
	connection.execute(command, (error, result, fields) => {
		if (error instanceof Error) {
			console.log(error);
			return;
		}
		console.log(result);
		console.log(fields);
	});
});

connection.end();
