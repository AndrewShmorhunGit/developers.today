import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Existing default route
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Additional route example
  @Get('/status')
  getStatus(): string {
    return 'The server is running!';
  }
}
