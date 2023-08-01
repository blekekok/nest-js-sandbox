import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/stars')
  async findStars(@Res() res: Response) {
    const star = await this.appService.findStars();
    res.status(HttpStatus.OK).json(star);
  }
}
