/*jshint esversion: 6*/

const expect = require('chai').expect,
      app = require('../app'),
      request = require('supertest');

const userCredentials ={
  username: 'admin',
  password: 'admin'
};

var authenticatedUser = request.agent(app);

before((done) => {
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end((err, res) => {
      expect(res.statusCode).to.equal(200);
      expect('Location', '/dashboard');
      done();
    });
});

describe('GET /profile', function(done){
  it('should return a 200 response if the user is logged in', function(done){
    authenticatedUser.get('/dashboard')
    .expect(200, done);
  });
  it('should return a 302 response and redirect to /login', function(done){
    request(app).get('/profile')
    .expect('Location', '/login')
    .expect(302, done);
  });
});
