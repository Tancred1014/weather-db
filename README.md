# Taiwan Weather API

This project is a RESTful API that provides weather information for cities in Taiwan. It fetches data from the Central Weather Administration (CWA) of Taiwan and implements a caching mechanism using MySQL database.

## Features

- Fetch real-time weather data for Taiwan cities
- Cache weather data to reduce API calls and improve response time
- Built with Node.js, Express, and Sequelize ORM
- Uses MySQL for data storage

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MySQL
- npm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/taiwan-weather-api.git
   cd taiwan-weather-api
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=weather_db
   CWA_API_KEY=your_cwa_api_key
   PORT=3000
   ```

4. Set up the database:
   - Create a MySQL database named `weather_db`
   - Run the migrations:
     ```
     npx sequelize-cli db:migrate
     ```

## Usage

To start the server, run:

```
npm start
```

For development with auto-restart on file changes:

```
npm run dev
```

## API Documentation

### Get Weather for a City

- **URL:** `/weather/:city`
- **Method:** GET
- **URL Params:** 
  - `city`: The name of the city in Taiwan (e.g., 臺北市, 高雄市)
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "city": "臺北市",
      "weather": {
        "Wx": [
          {
            "startTime": "2024-08-05 12:00:00",
            "endTime": "2024-08-05 18:00:00",
            "value": "晴時多雲",
            "unit": null
          },
          // ... more time periods
        ],
        "PoP": [
          // ... precipitation probability data
        ],
        "MinT": [
          // ... minimum temperature data
        ],
        "CI": [
          // ... comfort index data
        ],
        "MaxT": [
          // ... maximum temperature data
        ]
      }
    }
    ```
- **Error Response:**
  - **Code:** 404 NOT FOUND
  - **Content:** `{ "error": "City not found" }`
  
  OR
  
  - **Code:** 500 INTERNAL SERVER ERROR
  - **Content:** `{ "error": "An error occurred while fetching weather data" }`

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the original branch: `git push origin feature-branch-name`
5. Create the pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [Central Weather Administration of Taiwan](https://www.cwb.gov.tw/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
