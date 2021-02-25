import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  })

  it("Shoult be able to create a new survey", async () => {
    const response = await request(app).post("/surveys/create")
      .send({
        title: "Title example test 1",
        description: "description example"
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Shoult be able to get all surveys", async () => {
    await request(app).post("/surveys/create")
      .send({
        title: "Title example test 2",
        description: "description example 2"
      });

    const response = await request(app).get("/surveys/show");
    
    expect(response.body.count).toBe(2);
  });
})