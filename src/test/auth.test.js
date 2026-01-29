const request = require("supertest")
const app = require("../server")
const User = require("../models/user.model")

describe("Auth flow", () => {
   it("logs in a user and sets a cookie", async () => {
      await User.create({
         username: "testuser",
         password: "password123",
      })

      const res = await request(app).post("/api/auth/login").send({
         username: "testuser",
         password: "password123",
      })

      expect(res.statusCode).toBe(302) // redirect
      expect(res.headers["set-cookie"]).toBeDefined()
   })
})
