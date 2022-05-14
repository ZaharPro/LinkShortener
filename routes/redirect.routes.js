const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, resp) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (!link) {
      return resp.status(404).json("Link not found");
    }

    link.clicks++;
    await link.save();

    return resp.redirect(link.from);
  } catch (e) {
    return resp.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
