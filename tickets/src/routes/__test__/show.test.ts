import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const [cookie] = global.signin();
  const ticketPayload = { price: 20, title: "concert" };

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send(ticketPayload)
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .expect(200);

  expect(ticketResponse.body.title).toEqual(ticketPayload.title);
  expect(ticketResponse.body.price).toEqual(ticketPayload.price);
});
