const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "Welcome to our Gadget Galaxy" });
});

module.exports = router;
