import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;

    return this.save(user);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();
  }

  async getOneById(id: number): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
