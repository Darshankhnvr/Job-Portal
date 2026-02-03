import app from '../src/app.js'
import Application from '../src/models/application.model.js'

import request from "supertest";

describe("Application API", () => {
    it("should block unauthenticated apply", async () => {
        const res = await request(app)
            .post("/api/apply/123");

        expect(res.statusCode).toBe(401);
    });
});
