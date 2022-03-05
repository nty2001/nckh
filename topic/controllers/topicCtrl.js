const Topics = require("../models/topicModel");
const topicCtrl = {
  getTopics: async (req, res) => {
    try {
      const topics = await Topics.find({ user_id: req.user.id });
      res.json(topics);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllTopic: async (req, res) => {
    try {
      const topics = await Topics.find();
      res.json(topics);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createTopic: async (req, res) => {
    try {
      const { name, post } = req.body;
      const newNote = new Topics({
        name,
        post,
        user_id: req.user.id,
      });
      //   res.json({newNote})
      await newNote.save();
      res.json("create topic");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTopic: async (req, res) => {
    try {
      const note = await Topics.findById(req.params.id);
      res.json(note);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteTopic: async (req, res) => {
    try {
      await Topics.findByIdAndDelete(req.params.id);
      res.json("delete topic");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateTopic: async (req, res) => {
    try {
      const { name, post } = req.body;
      await Topics.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          post,
        }
      );
      res.json("update topic");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = topicCtrl;
