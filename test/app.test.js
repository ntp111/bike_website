(async () => {
    const { expect } = await import('chai');
    const chaiHttp = (await import('chai-http')).default;
    const request = (await import('supertest')).default;
    const app = require('../index'); // Assuming your Express app is in index.js

    chai.use(chaiHttp);

    describe('Bike Website Routes', function () {

        it('should return the home page with a 200 status', function (done) {
            request(app)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.text).to.include('Home');
                    done();
                });
        });

        it('should return the login page with a 200 status', function (done) {
            request(app)
                .get('/login')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.text).to.include('Login');
                    done();
                });
        });

        it('should return the products page with a 200 status', function (done) {
            request(app)
                .get('/products')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });

 

    });

})();
