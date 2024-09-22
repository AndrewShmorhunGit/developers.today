import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  // Existing route for fetching country info
  @Get('/country-info/:countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countriesService.getCountryInfo(countryCode);
  }

  // New route for fetching available countries
  @Get('/available-countries')
  async getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }
}
