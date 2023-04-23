const { Thought, User, Reaction } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get a single thought by id
  getSingleThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(Thought)
      );
  },
  // Create a new thought
  createThought(req, res) {
    Course.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Thought.deleteMany({ _id: { $in: Thought.reactions } })
      )
      .then(() => res.json({ message: "Thought and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // this is the data that will be updated
      //req.params is the data that is being passed in
      { $set: req.body },
      // this is the options object
      // &set is a mongo operator that will update the data
      { runValidators: true, new: true }
      // runValidators will make sure that the data is valid
    )
      .then((Thought) =>
        !Thought //!thought is the same as thought === null
          ? // if no thought is found, send a 404 error
            res.status(404).json({ message: "No thought with that ID" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add a reaction to a thought
  // addReaction(req, res) {
  //   Thought.findOneAndDelete(
  //     { _id: req.params.thoughtId },
  //     { $addToSet: { reactions: req.body } },
  //     //addToSet is a mongo operator that will add the data to the array
  //     //$push will add the data to the array
  //     //{ $push: { reactions: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((Thought) =>
  //       !Thought //!thought is the same as thought === null
  //         ? res.status(404).json({ message: "No thought with that ID" })
  //         : res.json(Thought)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // delete a reaction from a thought

  // deleteReaction(req, res) {
  //   Thought.findOneAndDelete(
  //     { _id: req.params.thoughtId },
  //     { $pull: { reactions: { reactionId: req.params.reactionId } } },
  //     //pull is a mongo operator that will remove the data from the array
  //     { runValidators: true, new: true }
  //   );
  // },
};
