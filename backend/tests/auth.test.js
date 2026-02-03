import User from "../src/models/user.model.js";
import request from "supertest"
import app from '../src/app.js'

describe('Auth API', () => {
    beforeEach(async () => {
        await User.deleteMany()
    })
})

it('should register a new user', async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: "Test User",
            email: "test@test.com",
            password: "123456"
        })
    expect(res.statusCode).toBe(201)
})

it('should login a user', async () => {
    await request(app)
        .post('/api/auth/register')
        .send({
            name: "Test User",
            email: "tests@test.com",
            password: "123456"
        })

    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: "tests@test.com",
            password: "123456"
        })

    expect(res.body.token).toBeDefined();
})
