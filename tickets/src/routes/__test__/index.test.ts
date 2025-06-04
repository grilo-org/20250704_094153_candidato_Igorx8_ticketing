import request from "supertest";
import { app } from "../../app";
async function createTicket(cookie: string) {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "concert",
      price: 20,
    })
    .expect(201);
}

it("can fetch a list of tickets", async () => {
  const [cookie] = global.signin();

  await createTicket(cookie);
  await createTicket(cookie);
  await createTicket(cookie);

  const response = await request(app).get("/api/tickets").expect(200);

  expect(response.body.length).toEqual(3);
});
