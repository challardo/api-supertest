const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
