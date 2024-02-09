const request = require("supertest");
const app = require("../../index");

describe("GET /api/users", () => {
  it("should respond with an array of users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = { id: 3, name: "Test User" };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });
});

describe("GET /api/users/:id", () => {
  it("should respond with the specified user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("should respond with 404 if user is not found", async () => {
    const response = await request(app).get("/api/users/999");

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/users/:id", () => {
  it("should update the specified user", async () => {
    const updatedUser = { id: 1, name: "Updated Name" };

    const response = await request(app).put("/api/users/1").send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete the specified user", async () => {
    const response = await request(app).delete("/api/users/1");

    expect(response.status).toBe(204);
  });
});
