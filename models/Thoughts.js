const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
            trim: true,
            //trin is a mongoose method that removes 
            //whitespace from the beginning and end of a string
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//const Thought = model('Thought', thoughtSchema);
module.exports= thoughtSchema;
// it is thoughts not thought because it is a collection of thoughts