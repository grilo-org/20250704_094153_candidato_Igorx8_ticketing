import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new Types.ObjectId().toHexString();
  const [cookie] = global.signin();
  await request(app)
    .put("/api/tickets" + id)
    .send({ title: "valid", price: 15 })
    .set("Cookie", cookie)
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new Types.ObjectId().toHexString();

  await request(app)
    .put("/api/tickets" + id)
    .send({ title: "valid", price: 15 })
    .expect(404);
});

it("returns a 401 does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "valid", price: 21 })
    .set("Cookie", global.signin()[0])
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({ title: "updated", price: 30 })
    .set("Cookie", global.signin()[0])
    .expect(401);
});

it("returns a 400 if the provides an invalid title or price", async () => {
  const [cookie] = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "valid", price: 20 })
    .set("Cookie", cookie)
    .expect(201);

  await request(app)
    .put("/api/tickets/" + response.body.id)
    .send({ title: 25, price: 20 })
    .set("Cookie", cookie)
    .expect(400);

  await request(app)
    .put("/api/tickets/" + response.body.id)
    .send({ title: "invalid", price: -15 })
    .set("Cookie", cookie)
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const [cookie] = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "valid", price: 20 })
    .set("Cookie", cookie)
    .expect(201);

  await request(app)
    .put("/api/tickets/" + response.body.id)
    .send({ title: "updated", price: 25 })
    .set("Cookie", cookie)
    .expect(200);

  const updatedTicket = await request(app).get(
    "/api/tickets/" + response.body.id
  );

  expect(updatedTicket.body.title).toEqual("updated");
  expect(updatedTicket.body.price).toEqual(25);
});
