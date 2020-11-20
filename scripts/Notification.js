import Agenda from 'agenda';
import Work from '../workers/Work';
import DropOffType from '../workers/types/DropOffType';


const agenda = new Agenda({db: {address: process.env.MONGO_URL}});

agenda.define('listen_to_notification_queue', {priority: 'high', concurrency: 1}, async () => {
  await new Work(new DropOffType()).do();
});

(async function() {
  await agenda.start();
  await agenda.every('1 seconds', 'listen_to_notification_queue');
})();