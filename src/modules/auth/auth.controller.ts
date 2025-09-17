import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('req.user', req.user);
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() user: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.authService.register(user, avatar);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('verify-token')
  async verifyToken(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    delete user.password;
    return user;
  }
}
