# DT207G Moment 2-1
## About
REST API with CRUD functionality powered by [Express](https://www.npmjs.com/package/express).<br>
The API is made to manage information about your previous job positions.<br>
A [frontend](https://github.com/AstronomyOverdrive/dt207g_moment2-2) for it is also available.
## Installation
### Install server
```sh
git clone https://github.com/AstronomyOverdrive/dt207g_moment2-1.git &&
cd dt207g_moment2-1 &&
npm install
```
This will also pull in the following packages:
- [CORS](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [MySQL2](https://www.npmjs.com/package/mysql2)

### Setup database
```sh
node install.js
```
*NOTE: You will also need to install and start either a MySQL or MariaDB server.*

## Usage
### Start the server
```sh
node server.js
```
After starting the server you can access the API at: [http://0.0.0.0:8000/resume](http://0.0.0.0:8000/resume)
### Endpoints
|Action       |Method |Endpoint |Body Example |
|-------------|-------|---------|-|
|Read entries |GET    |/resume  | |
|Create entry |POST   |/resume  |{"company": "Company Name", "title": "Work Title", "location": "City", "year": 2025} |
|Update entry |PUT    |/resume  |{"id": 1, "company": "Company Name", "title": "Work Title", "location": "City", "year": 2025} |
|Delete entry |DELETE |/resume  |{"id": 1} |
### GET response format
```json
[
	{
		id: 1,
		companyname: 'Company Name',
		jobtitle: 'Work Title',
		location: 'City',
		year: 2025
	},
	...
]
```
