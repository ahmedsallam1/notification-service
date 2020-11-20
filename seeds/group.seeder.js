import { Seeder } from 'mongoose-data-seed';
import UserGroup from '../models/UserGroup';
import { GROUPS as UserGroups } from '../Constants/UserGroup';

const data = [
  {
    ref: UserGroups.GROUP_A
  },
  {
    ref: UserGroups.GROUP_B
  },
];

class GroupSeeder extends Seeder {

  async shouldRun() {
    return UserGroup.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return UserGroup.create(data);
  }
}

export default GroupSeeder;
