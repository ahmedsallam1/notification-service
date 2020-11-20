import { Seeder } from 'mongoose-data-seed';
import User from '../models/User';

const data = [
  {
    name: "Test1",
    email: "Test1@test.com",
    phone: "+201000000",
    group: "Group_A",
    locale: 'en',

  },
  {
    name: "Test2",
    email: "Test2@test.com",
    phone: "+201000023",
    group: "Group_A",
    locale: "ar",
  },
  {
    name: "Test3",
    email: "Test3@test.com",
    phone: "+201000041",
    group: "Group_B",
    locale: "ar",
  },
  {
    name: "Test4",
    email: "Test4@test.com",
    phone: "+201000087",
    group: "Group_A",
  },
  {
    name: "Test5",
    email: "Test5@test.com",
    phone: "+201000099",
    group: "Group_B",
    locale: "en",
  },
  {
    name: "Test6",
    email: "Test6@test.com",
    phone: "+201050001",
    group: "Group_A",
    locale: "en",
  },
  {
    name: "Test6",
    phone: "+201040000",
    email: "Test6@test.com",
  },
];

class UserSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UserSeeder;
