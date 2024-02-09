const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const { auth } = require("express-openid-connect");

const usersRouter = require("./api/users");
const profileRouter = require("./api/profile");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(auth(config));
router.use("/profile", requiresAuth(), profileRouter);
router.use("/users", requiresAuth(), usersRouter);

app.use("/api/", router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = server;
