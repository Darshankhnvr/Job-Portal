import User from "../src/models/user.model.js";
import request from "supertest"
import app from '../src/app.js'

describe('Auth API', () => {
    beforeEach(async () => {
        await User.deleteMany()
    })

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .set('User-Agent', 'jest-test')
            .send({
                name: "Test User",
                email: "*******",
                password: "******"
            })
        expect(res.statusCode).toBe(201)
    })

    it('should login a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .set('User-Agent', 'jest-test')
            .send({
                name: "Test User",
                email: "*******",
                password: "******"
            })

        const res = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'jest-test')
            .send({
                email: "*******",
                password: "******"
            })

        expect(res.body.token).toBeDefined();
    })
})