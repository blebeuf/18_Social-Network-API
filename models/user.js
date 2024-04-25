const {Schema, model} = require("mongoose");

const userSchema = new Schema({
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
        // regex email validation: https://regexr.com/3e48o
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid entry: please enter a valid email address",]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Define a virtual property 'friendCount' for userSchema.
userSchema.virtual("friendCount").get(function () {
    // the function is called when 'friendCount' is accessed.
    return this.friends.length;
  });
// Create a model named 'User' based on the 'userSchema'.
const User = model("User", userSchema);
module.exports = User;