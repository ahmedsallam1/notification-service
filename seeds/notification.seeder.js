import { Seeder } from 'mongoose-data-seed';
import Notification from '../models/Notification';
import User from '../models/User';
import { TYPES as NotificationTypes } from '../Constants/Notification';
import { TYPES as NotifiableTypes } from '../Constants/NotifiableType';
import { GROUPS as UserGroups } from '../Constants/UserGroup';

class NotificationSeeder extends Seeder {
  async getUsers() {
    return await User.find().select('id');
  }

  async shouldRun() {
    return Notification.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    let data = await this.data();

    return Notification.create(data);
  }

  async data() {
    let users = await this.getUsers();
    let usersIds = users.map(({ id }) => id);

    return [
      {
        type: NotificationTypes.PROMOTION,
        notifiableType: NotifiableTypes.GROUP,
        notifiableId: UserGroups.GROUP_A,
        data: "awesome_app",
      },
      {
        type: NotificationTypes.DROP_OFF,
        notifiableType: NotifiableTypes.INDIVIDUAL,
        notifiableId: usersIds.pop(),
      },
      {
        type: NotificationTypes.DROP_OFF,
        notifiableType: NotifiableTypes.INDIVIDUAL,
        notifiableId: usersIds.pop(),
      },
    ];
  }
}

export default NotificationSeeder;
