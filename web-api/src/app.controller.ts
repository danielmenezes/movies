import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  apiStarted(): string {
    return 'api-base is running!';
  }
}
