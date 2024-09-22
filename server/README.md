# Countries API

This API provides information about available countries and detailed data for a specific country. It fetches data from external APIs (Date Nager API and countriesnow.space API) and returns information such as border countries, population data, and flag URLs.

---

## Tech Stack

- **Node.js** (Nest.js)
- **Axios** (for external API requests)

---

## Endpoints

### 1. Get Available Countries

**Endpoint**: `GET /countries/available-countries`

**Description**: Fetches a list of available countries from the **Date Nager API**.

**External API Used**:

- `https://date.nager.at/api/v3/AvailableCountries`

**Sample Request**:

```bash
GET /countries/available-countries
```

**Sample Response**:

```json
[
  { "countryCode": "AD", "name": "Andorra" },
  { "countryCode": "AL", "name": "Albania" },
  { "countryCode": "AM", "name": "Armenia" }
  ...
]
```

### 2. Get Country Info

**Endpoint**: `GET /countries/country-info/:countryCode`

**Description**: Retrieves detailed information about a specific country including border countries, population data, and flag URL.

**Parameters**:

- `countryCode` (required): The **alpha2Code** of the country you want to get information about.

**External APIs Used**:

- **List of Border Countries**:  
  `https://date.nager.at/api/v3/CountryInfo/{countryCode}`
- **Population Data**:  
  `https://countriesnow.space/api/v0.1/countries/population`
- **Flag URL**:  
  `https://countriesnow.space/api/v0.1/countries/flag/images`

**Sample Request**:

```bash
GET /countries/country-info/UA
```

**Sample Response**:

```json
{
  "countryName": "Ukraine",
  "borders": [
    {
      "commonName": "Belarus",
      "officialName": "Republic of Belarus",
      "countryCode": "BY",
      "region": "Europe",
      "borders": null
    },
    ...
    {
      "commonName": "Slovakia",
      "officialName": "Slovak Republic",
      "countryCode": "SK",
      "region": "Europe",
      "borders": null
    }
  ],
  "population": [
    { "year": 1960, "value": 42664652 },
    { "year": 1961, "value": 43206345 },
    { "year": 1962, "value": 43752230 },
    { "year": 1963, "value": 44288608 },
    { "year": 1964, "value": 44796964 },
    { "year": 1965, "value": 45264548 },
    { "year": 1966, "value": 45684979 },
    { "year": 1967, "value": 46063228 },
    ...
    { "year": 2018, "value": 44622516 }
  ],
  "flag": "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
}
```

---

## How It Works

### 1. **Get Available Countries**

- The `/available-countries` endpoint sends a **GET** request to the Date Nager API to retrieve a list of countries with their **name** and **alpha2Code**.
- The response is sent back to the client as JSON.

### 2. **Get Country Info**

- The `/country-info/:countryCode` endpoint:
  - Fetches country details such as **border countries** from the **Date Nager API**.
  - Fetches **population data** from the **countriesnow.space API**.
  - Fetches the **flag URL** from the **countriesnow.space API**.
- The API then combines the data and returns a single JSON response containing:
  - Country name
  - List of border countries
  - Population data (historical values suitable for charting)
  - Flag URL

---

## Project Structure

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── countries/
    ├── countries.controller.ts
    ├── countries.service.ts
    └── dto/
```

### Controllers

- **CountriesController**: Contains the route handlers for the `/available-countries` and `/country-info/:countryCode` endpoints.

### Services

- **CountriesService**: Handles the logic for fetching data from the external APIs and combining the results.

---

## Setup and Running the Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

```bash
npm run start
```

This will start the server on `http://localhost:5000`.

### 3. Testing the Endpoints

Use Postman, cURL, or a browser to test the API.

Example requests:

- Fetch available countries:
  ```bash
  GET http://localhost:5000/countries/available-countries
  ```
- Fetch detailed information for a country (e.g., Ukraine):
  ```bash
  GET http://localhost:5000/countries/country-info/UA
  ```

---

## Error Handling

If an error occurs while fetching data from external APIs, the server responds with an error message indicating the failure. This helps identify issues with the external services.

---
