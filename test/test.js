const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Your Express app file
const expect = chai.expect;

chai.use(chaiHttp);

describe('Motorcycle Website Tests', function () {
    it('should return status 200 for homepage', function (done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
