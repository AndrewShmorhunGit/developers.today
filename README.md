# Countries app

## How to start

### .env.client

Create `.env` file inside the client and server folder

```
VITE_API_URL=http://localhost:5000/countries
```

### .env.server

```
FLAGS_URL=https://countriesnow.space/api/v0.1/countries/flag/images
POPULATION_URL=https://countriesnow.space/api/v0.1/countries/population
COUNTRY_INFO_URL=https://date.nager.at/api/v3/CountryInfo/
AVAILABLE_COUNTIES_URL=https://date.nager.at/api/v3/AvailableCountries
SERVER_PORT=5000
```

### Run commands

1. Install packages with `npm install` in the `app>` folder level will instal packages for server and client
2. After `npm run server` in the `app>`, will init server in the watch mode at the `localhost:5000`
3. In the new terminal run `npm run client` in the same `app>` level, at the `localhost:3000`
