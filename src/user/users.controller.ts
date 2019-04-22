import { Controller, Get, Post, Body } from '@nestjs/common';
import { getAllUsers, registerUser } from './user.repository';
import { User } from './user';
import { ValidationPipe } from '../inftastructure/validate.pipe';
import { getJwtToken } from './user.service';

@Controller('users')
export class UsersController {
    @Get()
    async users(): Promise<string> {
      const a = await getAllUsers();
      return a.toString();
    }
    @Post()
    async register(@Body(new ValidationPipe()) user: User): Promise<void> {
      await registerUser(user);
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) user: User): Promise<any> {
      return await getJwtToken(user);
    }
}
