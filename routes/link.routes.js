const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, resp) => {
  try {
    const { from } = req.body;

    const existing = await Link.findOne({ from });
    if (existing) {
      return resp.json({ link: existing });
    }

    const code = shortid.generate();
    const baseUrl = config.get("baseUrl");

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    return resp.status(201).json({ link });
  } catch (e) {
    return resp.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", auth, async (req, resp) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    return resp.json(links);
  } catch (e) {
    return resp.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", auth, async (req, resp) => {
  try {
    const link = await Link.findById(req.params.id);
    return resp.json(link);
  } catch (e) {
    return resp.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
