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

describe("GET /api/articles/:article_id", () => {
  test("200: Should return specified data", () => {
    const expectedBody = {
      article: {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
      },
    };
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.article).toBe("object");
        expect(Array.isArray(body.article)).toBe(false);
        expect(Object.keys(body.article)).toHaveLength(7);

        expect(body.article).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });

        expect(body).toEqual(expectedBody);
      });
  });
  test("400: Should return error message from psql", () => {
    const expectedBody = { msg: "400: Invalid id" };
    return request(app)
      .get("/api/articles/lol")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid endpoint inputted", () => {
    const expectedBody = { msg: "Not Found" };
    return request(app)
      .get("/api/articless/1")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid ID", () => {
    const expectedBody = { msg: "Not Found" };
    return request(app)
      .get("/api/articles/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
});

describe("GET /api/users", () => {
  test("200: Should return all users in test db", () => {
    const expectedBody = {
      users: [
        {
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        },
        {
          username: "icellusedkars",
          name: "sam",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        },
        {
          username: "rogersop",
          name: "paul",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        },
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ],
    };

    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.users).toBe("object");
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users).toHaveLength(4);

        body.users.forEach((user) => {
          expect(user).toEqual({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });

        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid endpoint inputted AND if no users in db", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("404: Invalid endpoint inputted AND if no users in db", () => {
    return request(app)
      .get("/api/userss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Should update votes on specific article", () => {
    const expectedBody = {
      updatedArticles: {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 105,
      },
    };

    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(201)
      .then(({ body }) => {
        expect(body.updatedArticles.votes).toBe(105);
        expect(body).toEqual(expectedBody);
      });
  });
  test("404: Invalid endpoint inputted", () => {
    return request(app)
      .patch("/api/articless/1")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("404: Invalid ID", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 5 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("400: Invalid parametric endpoint type", () => {
    const expectedBody = { msg: "400: Invalid id" };
    return request(app)
      .patch("/api/articles/lol")
      .send({ inc_votes: 5 })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual(expectedBody);
      });
  });
});
