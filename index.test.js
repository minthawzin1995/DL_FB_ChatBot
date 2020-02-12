const add = require('./index');

test('adds 1 + 1 to equal 2', done => {
  expect(add(1)).toBe(2);
  done();
});

afterAll((done) => {
  done();
});
