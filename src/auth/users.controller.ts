import { Controller, Get, Post, Body } from '@nestjs/common';
import { getAllUsers, registerUser } from '../repositories/user.repository';
import { User } from '../models/user';
import { ValidationPipe } from '../validation/validate.pipe';

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
}
