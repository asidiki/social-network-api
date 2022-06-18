const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
        username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
        email: {
        type: String,
        unique: true, 
        required: true,
        // match a valid email address
        match: [/.+\@.+\..+/]
    },
        // subdocument for thoughts 
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            // ref to the thought document model 
            ref: 'Thought'
        }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            // ref to the user document model 
            ref: 'User'
        }
        ]
    },
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;