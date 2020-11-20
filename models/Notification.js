import mongoose from 'mongoose';

var notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    notifiableType: {
        type: String,
        required: true,
    },
    notifiableId: {
        type: String,
        required: true,
    },
    locale: {
        type: String,
    },
    data: {
        type: Object
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    notifiedAt: {
        type: Date
    },
});

var Notification =  mongoose.model('Notification', notificationSchema);

export default Notification;