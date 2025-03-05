import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const [cookie] = await signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("cookie", cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual("a@a.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.get("Set-Cookie")).toBeUndefined();
});
