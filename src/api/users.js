const { Router } = require("express");

const router = Router();

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updateUser = req.body;
  users = users.map((user) => (user.id === userId ? updateUser : user));
  res.json(updateUser);
});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

module.exports = router;
