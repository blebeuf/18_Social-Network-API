const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/date");

// notes on mongoose's Schema types and ObjextId info:
// https://mongoosejs.com/docs/schematypes.html
const ReactionSchema = new Schema(
    {
        reactionId: {
            // Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            // Set default value to the timestamp
            default: Date.now,
            // Use a 'get' method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a 'get' method to format the timestamp on query
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
// Define a virtual property 'reactionCount' for ThoughtSchema.
ThoughtSchema.virtual("reactionCount").get(function () {
    // This function gets called when 'reactionCount' is accessed.
    return this.reactions.length;
});

// Create a model named 'Thought' based on the 'ThoughtSchema'.
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;