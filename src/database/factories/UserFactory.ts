import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    const user = new User();
    user.id = uuid.v1();
    user.username = 'admin';
    user.password = '1234';
    return user;
});
