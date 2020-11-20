import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);

var UserGroupSchema = new mongoose.Schema({
    ref: {
        type: String,
    },
});
UserGroupSchema.plugin(AutoIncrement, {inc_field: '__id'});

var UserGroup =  mongoose.model('UserGroup', UserGroupSchema);

export default UserGroup;