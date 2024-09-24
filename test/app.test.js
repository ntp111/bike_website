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

        it('should fail login with incorrect credentials', function (done) {
            request(app)
                .post('/login')
                .send({ login_cd: 'wronguser', password: 'wrongpass' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.text).to.include('Your login or password is wrong, please try again.');
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

        it('should submit the contact form', function (done) {
            request(app)
                .post('/contact')
                .send({
                    title: 'Inquiry',
                    message: 'I have a question about a motorcycle.',
                    name: 'Test User',
                    email: 'test@example.com',
                    mobile: '1234567890'
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.text).to.include('your message is sent');
                    done();
                });
        });

    });

})();
