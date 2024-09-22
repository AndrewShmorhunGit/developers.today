import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  private readonly flagsUrl = process.env.FLAGS_URL;
  private readonly populationUrl = process.env.POPULATION_URL;
  private readonly nagerCountryInfoUrl = process.env.COUNTRY_INFO_URL;
  private readonly availableCountriesUrl = process.env.AVAILABLE_COUNTIES_URL;

  // Fetch country flag and iso3 by iso2
  private async getFlagDataByIso2(iso2Code: string) {
    const flagResponse = await axios.get(this.flagsUrl);
    const flagData = flagResponse.data.data.find(
      (country: any) => country.iso2 === iso2Code,
    );
    if (!flagData) {
      throw new Error(`Country with ISO2 code ${iso2Code} not found.`);
    }
    return { flagUrl: flagData.flag, iso3Code: flagData.iso3 };
  }

  // Fetch country info from Nager API by iso2
  private async getCountryInfoByIso2(iso2Code: string) {
    const response = await axios.get(`${this.nagerCountryInfoUrl}${iso2Code}`);
    return {
      name: response.data.commonName,
      borders: response.data.borders,
    };
  }

  // Fetch population data by iso3
  private async getPopulationByIso3(iso3Code: string, year: number = 2018) {
    const populationResponse = await axios.get(this.populationUrl);
    const countryData = populationResponse.data.data.find(
      (country: any) => country.iso3 === iso3Code,
    );

    if (!countryData) {
      throw new Error(
        `Population data for country with ISO3 code ${iso3Code} not found.`,
      );
    }

    const population = countryData.populationCounts;

    if (!population) {
      throw new Error(
        `Population data for year ${year} not found for ${iso3Code}.`,
      );
    }

    return population;
  }

  // Main method to get complete country info
  async getCountryInfo(iso2Code: string) {
    try {
      // Get flag and iso3 code using iso2
      const { flagUrl, iso3Code } = await this.getFlagDataByIso2(iso2Code);

      // Get country name and borders
      const { name, borders } = await this.getCountryInfoByIso2(iso2Code);

      // Get population for the year 2018 using iso3
      const population = await this.getPopulationByIso3(iso3Code);

      // Return all combined data
      return {
        countryName: name,
        borders: borders,
        population: population,
        flag: flagUrl,
      };
    } catch (error) {
      console.error(
        'Error in getCountryInfo:',
        error.response?.data || error.message,
      );
      throw new Error('Error fetching country info');
    }
  }

  // Method to get available countries
  async getAvailableCountries() {
    try {
      const response = await axios.get(this.availableCountriesUrl);
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching available countries:',
        error.response?.data || error.message,
      );
      throw new Error('Error fetching available countries');
    }
  }
}
