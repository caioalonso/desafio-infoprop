const request = require("supertest");
const app = require("./");

it("should return 404 for root url", async () =>
  request(app)
    .get("/")
    .expect(404));
