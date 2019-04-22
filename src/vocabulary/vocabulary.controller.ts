import { Controller, Get } from '@nestjs/common';

@Controller('vocabulary')
export class VocabularyController {
    @Get()
    findAll(): string {
      return 'It works';
    }
}
