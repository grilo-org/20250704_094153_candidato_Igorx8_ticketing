import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections!) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // build a jwt payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // create the jwt!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object
  const session = { jwt: token };
  // turn that session into json
  const sessionJSON = JSON.stringify(session);
  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
