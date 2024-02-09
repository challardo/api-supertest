const express = require("express");

const usersRouter = require("./api/users");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

const router = express.Router();

router.use("/users", usersRouter);

app.use("/api/", router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/`);
});

module.exports = server;
