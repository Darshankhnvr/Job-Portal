import Admin from "../src/models/admin.model.js"
import request from "supertest";
import app from '../src/app.js'
import bcrypt from "bcryptjs"

let adminToken;

beforeAll(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.deleteMany()
  await Admin.create({
    email: "admin@test.com",
    password: hashed
  })

  const res = await request(app)
    .post('/api/auth/admin/login')
    .set('User-Agent', 'jest-test')
    .send({
      email: "admin@test.com",
      password: "admin123"
    })
  adminToken = res.body.token;
})

describe("Job API", () => {
  it("should create a job as admin", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${adminToken}`)
      .set('User-Agent', 'jest-test')
      .send({
        title: "Backend Dev",
        description: "Node.js",
        company: "TestCorp",
        location: "Remote"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Backend Dev");
  });
});