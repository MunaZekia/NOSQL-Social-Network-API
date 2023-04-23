const {User, Thought, Reaction} = require('../models');

module.exports = {
    getReactionById({params}, res) {
        Reaction.findOne({_id: params.id})
            .then(Reaction => {
                if (!Reaction) {
                    res.status(404).json({message: 'No reaction found with this id'});
                    return;
                }
                res.json(Reaction);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(Thought);
            })
            .catch(err => res.json(err));
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
            .then(Thought => res.json(Thought))
            .catch(err => res.json(err));
    },
    
    
};

