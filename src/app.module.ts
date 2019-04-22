import { Module } from '@nestjs/common';
import { VocabularyController } from './vocabulary/vocabulary.controller';
import { UsersController } from './auth/users.controller';

@Module({
  imports: [],
  controllers: [VocabularyController, UsersController]
})
export class AppModule {}
