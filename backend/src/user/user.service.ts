import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = Array.from({ length: 1000000 }, (_, id) => ({
    id,
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
    email: faker.internet.email(),
  }));

  public getUsers(offset: number, limit: number) {
    return this.users.slice(offset, offset + limit);
  }

  public updateUser(id: string, dto: UserDto) {
    const userId = Number(id);
    const user = this.users.find((user) => user.id === userId);

    if (!user) throw new NotFoundException();

    Object.seal(user);
    Object.assign(user, dto);

    return user;
  }
}
