const router = require('express').Router()
const topicCtrl= require("../controllers/topicCtrl")
const auth = require("../middleware/auth")
router.route("/all").get(topicCtrl.getAllTopic)
router.route("/")
    .get(auth,topicCtrl.getTopics)
    .post(auth,topicCtrl.createTopic)
router.route("/:id")
    .get(auth,topicCtrl.getTopic)
    .delete(auth,topicCtrl.deleteTopic)
    .put(auth,topicCtrl.updateTopic)
      

module.exports  = router