import { FilesService } from '@modules/files/files.service';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from '@utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  async login(user: any) {
    const payload = { ...user, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async register(
    payload: CreateUserDto,
    avatar?: Express.Multer.File,
  ): Promise<User> {
    const passwordHashed = await hash(payload.password);

    let avatarUrl: string | undefined;

    // Upload avatar to Cloudinary if file is provided
    if (avatar) {
      try {
        const uploadResult = await this.filesService.uploadImage(avatar);
        avatarUrl = uploadResult.secure_url;
      } catch {
        throw new BadRequestException('Failed to upload avatar image');
      }
    }

    return await this.userService.create({
      ...payload,
      password: passwordHashed,
      avatar: avatarUrl,
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
