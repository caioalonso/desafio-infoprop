const request = require("supertest");
const app = require("../../");
const Property = require('../../models/property')

it("should return 404 for root url", () =>
  request(app)
    .get("/v1")
    .expect(404));

it("should return 200 for GET /properties", () =>
  request(app)
    .get("/v1/properties")
    .expect(200));

it("should return 400 for POST /properties/csvUpload with no data", () =>
  request(app)
    .post("/v1/properties/csvUpload")
    .expect(400));

it("should create records for POST /properties/csvUpload with normal data", async () => {
  let oldCount = await Property.countDocuments();
  await request(app)
    .post("/v1/properties/csvUpload")
    .attach("csvFile", "test/normal.csv")
    .expect(200);
  let newCount = await Property.countDocuments();
  return expect(oldCount + 4 === newCount)
})

it("should not create records with broken data", async () => {
  let oldCount = await Property.countDocuments();
  await request(app)
    .post("/v1/properties/csvUpload")
    .attach("csvFile", "test/broken.csv")
    .expect(400);
  let newCount = await Property.countDocuments();
  return expect(oldCount === newCount)
})