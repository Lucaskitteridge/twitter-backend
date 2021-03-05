const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "localhost:8080";
chai.use(chaiHttp);
describe("Register User API Unit Test", function() {
  let newUser = {
    "username": "user100",
    "password": "password"
  };
  it('registers a user', function(done) {
    chai.request(baseUrl)
      .post('/register')
      .send(newUser)
      .end(function(err, res) {
        console.log(err);
        expect(res).to.have.status(200);
        expect(res.text).to.equal(`${newUser.username} created successfully!`);
        done();
      });
  });
});