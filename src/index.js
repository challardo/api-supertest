const express = require("express");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

const usersRouter = require("./api/users");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

const router = express.Router();

//oauth
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.use("/users", requiresAuth(), usersRouter);

app.use("/api/", router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = server;
