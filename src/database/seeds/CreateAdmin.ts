import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

export class CreateAdmin implements Seed {
    public async seed(factory: Factory, connection: Connection): Promise<User> {
        const userRepository = connection.getRepository(User);
        const admin = await userRepository.findOne({ username: 'admin'});
        if (admin === undefined) {
          const user = new User();
          user.id = uuid.v1();
          user.username = 'admin';
          user.password = 'test';
          return await userRepository.save(user);
        }

        return admin;
    }
}
