const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("200: Should return all topics in test db", () => {
    const expectedBody = {
      topics: [
        { slug: "mitch", description: "The man, the Mitch, the legend" },
        { slug: "cats", description: "Not dogs" },
        { slug: "paper", description: "what books are made of" },
      ],
    };

    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        //sexpect
        expect(typeof body).toBe("object");
        expect(typeof body.topics).toBe("object");
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics).toHaveLength(3);

        body.topics.forEach((topic) => {
          expect(topic).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });

        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .get("/api/topicss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe.only("GET /api/articles/:article_id", () => {
  test("200: Should return specified data", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
      });
  });
});
