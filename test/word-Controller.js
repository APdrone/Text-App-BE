const expect = require("chai").expect;
const sinon = require("sinon");
const Word = require("../models/wordModel");
const WordController = require("../controllers/wordController");
const mongoose = require("mongoose");

describe("Word Controller", () => {
  beforeEach(function (done) {
    const Test_DB = process.env.DATABASE_TEST.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    mongoose
      .connect(Test_DB, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        const word = new Word({
          word: "rise",
          _id: "5c0f66b979af55031b34728a",
        });
        return word.save();
      })
      .then(() => done());
  });

  it("should throw an error with code 500 if accessing the database fails", function (done) {
    sinon.stub(Word, "find");

    const res = {
      status: 404,
      word: null,
      status: function (code) {
        this.status = code;
        return this;
      },
      json: function (data) {
        this.status = data.status;
      },
    };
    Word.find.throws();

    WordController.getAllWords({}, res, () => {})
      .then((result) => {
        expect(result).to.have.property("status", "fail");
        done();
      })
      .catch(done);
    Word.find.restore();
  });

  it.skip("should send a response with a valid word  ", function (done) {
    const req = { word: "program" };
    const res = {
      status: 500,
      word: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.word = data.word;
      },
    };
    WordController.getAllWords(req, res, () => {}).then(() => {
      expect(res.status).to.be.equal(200);
      expect(res.word).to.be.equal("program");
      done();
    });
  });

  it("should create word with valid word", () => {});

  it("should throw error with invalid word", () => {});
  it("should update word with valid word and param id", () => {});

  it("should throw error with invalid param id ", () => {});

  it("should delete word with valid param id", () => {});

  it("should throw error with invalid param id ", () => {});

  afterEach(function (done) {
    Word.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
