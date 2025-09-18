import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { BaseController } from '@common/base/base.controller';

@Controller('api/users')
export class UsersController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
