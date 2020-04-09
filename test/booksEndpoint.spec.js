const app = require("../app");
const supertest = require("supertest");
const expect = require("chai").expect;
const jsonResponse = require("./jsonResponse");
const { factory, Models } = require("../test_helpers");

let server, request, response;

before(done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after(done => {
  server.close(done);
});

beforeEach(async () => {
  await factory.createMany("Book", 2, [
    { id: 100, title: "Learn NodeJS with Thomas" },
    { id: 900, title: "Learn NodeJS with Thomas - The Sequel" }
  ]);
});

afterEach(() => {
  factory.cleanUp();
});

describe("GET /api/v1/books", () => {
  before(async () => {
    response = await request.get("/api/v1/books");
  });

  it("responds with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("responds with list of books as an array", () => {
    console.table(response.body.books);
    expect(response.body.books).to.be.an("array");
  });

  it("responds title for books", () => {
    expect(response.body.books[0].title).to.equal("Learn NodeJS with Thomas");
  });

  describe("GET /api/v1/books/:id", () => {
    it("response with a single books id", async () => {
      response = await request.get("/api/v1/books/900");
      expect(response.body.book.id).to.equal(900);
    });

    it("responds with a single books title", async () => {
      response = await request.get("/api/v1/books/900");
      expect(response.body.book.title).to.equal(
        "Learn NodeJS with Thomas - The Sequel"
      );
    });

    it("responds with a single books including author", async () => {
      response = await request.get("/api/v1/books/900");
      expect(response.body.book.author.fullname).to.equal("Thomas Ochman");
    });
  });
});
