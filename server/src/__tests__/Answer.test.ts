import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Answer", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Must be able to identify when there is no research", async () => {
    const response = await request(app).get("/surveys/users/answers/10?su_id=6f1eaf6c-fe1c-4d61-82b1-d8711fffba53")

    expect(response.status).toBe(400);
  });
})