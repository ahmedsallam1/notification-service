import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);

var UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true,
    },
    name: {
        type: String,
    },
    email: { 
        type: String, 
        lowercase: true, 
        trim: true
    },
    phone: {
        type: String,
    },
    group: {
        type: String,
        index: true,
    },
});
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});


var User =  mongoose.model('User', UserSchema);

export default User;