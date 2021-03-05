const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "localhost:8080";
chai.use(chaiHttp);

describe("Register User API Unit Test", function () {
  let username = "user100";
  let password = "password";
  it('registers a user', function (done) {
    chai.request(baseUrl)
      .post('/register')
      .send(username, password)
      .end(function(err, res) {
        console.log(err);
        expect(res.send).to.equal(`3`);
        done();
      });
  });
});