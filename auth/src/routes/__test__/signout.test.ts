import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signin out", async () => {
  const credentials = {
    email: "a@a.com",
    password: "1234",
  };

  await request(app).post("/api/users/signup").send(credentials).expect(201);

  const response = await request(app).post("/api/users/signout").expect(200);

  const [cookie] = response.get("Set-Cookie") ?? [];
  expect(cookie).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
