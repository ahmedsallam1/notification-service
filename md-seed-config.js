import mongoose from 'mongoose';
import UserSeeder from './seeds/user.seeder';
import GroupSeeder from './seeds/group.seeder';
import NotificationSeeder from './seeds/notification.seeder';

require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  GroupSeeder,
  UserSeeder,
  NotificationSeeder,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
