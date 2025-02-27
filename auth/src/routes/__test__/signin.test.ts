import request from "supertest";
import { app } from "../../app";

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "1235",
    })
    .expect(400);
});

it("responds with cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "a@a.com",
      password: "1234",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
