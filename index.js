const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the form page
app.get('/', (req, res) => {
    const { name } = req.query;
    res.render('home', { title: 'Home', name:name});
});

//login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
app.post('/login', (req, res) => {
    const { login_cd, password } = req.body;
    const db = new sqlite3.Database('bike_shop.db');
    
    db.get('SELECT * FROM user WHERE login_cd = ? AND password = ?', [login_cd, password], (err, row) => {
        if (err) {
            res.status(500).send("Database query error");
        } else if (row) {
            res.redirect(`/?name=${encodeURIComponent(row.name)}`);
        } else {
            res.render('login', { title: 'Login', error:"Your login or password is wrong, please try again." });
        }
    });
    db.close();
});


app.get('/motorcycles', (req, res) => {
    res.render('motorcycles', { title: 'Motorcycles' });
});
app.get('/products', (req, res, next) => {    
    const db = new sqlite3.Database('bike_shop.db');

    db.all('SELECT * FROM product ', (err, rows) => {
        if (err) {
            return next(err);
        }
        res.render('products', { title: 'Search Results', products: rows });
    });

    db.close();
});
app.post('/products', (req, res, next) => {
        const { keyword } = req.body;
        const db = new sqlite3.Database('bike_shop.db');
        db.all('SELECT * FROM product WHERE keyword LIKE ?', [`%${keyword}%`], (err, rows) => {
            if (err) {
                return next(err);
            }
            res.render('products', { title: 'Search Results', products: rows, keyword:keyword });
        });

    db.close();
});
app.get('/menCollections', (req, res) => {
    res.render('MenCollections', { title: 'Men Fashion' });
});
app.get('/womenCollections', (req, res) => {
    res.render('womenCollections', { title: 'Women Fashion' });
});
app.get('/kidsCollections', (req, res) => {
    res.render('kidsCollections', { title: 'Kids Fashion' });
});
app.get('/insurance', (req, res) => {
    res.render('insurance', { title: 'Warranty & Insurance' });
});
app.get('/service', (req, res) => {
    res.render('service', { title: 'Services' });
});
app.get('/news', (req, res) => {

    const db = new sqlite3.Database('bike_shop.db');

    db.all('SELECT * FROM news ', (err, rows) => {
        if (err) {
            return next(err);
        }
        res.render('news', { title: 'Search Results', news: rows });
    });

    db.close();
});
app.get('/dealers', (req, res) => {
    res.render('dealers', { title: 'Dealers' });
});
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });

});
app.post('/contact', (req, res) => {

    const { title, message, name, email, mobile  } = req.body;
    const db = new sqlite3.Database('bike_shop.db');

    db.run('INSERT INTO contact (title, content, name, email, phone) VALUES (?, ?, ?, ?, ?)', [title, message, name, email, mobile], function(err) {
        if (err) {
            res.render('contact', { title: 'Contact Us', error:"error sending your message. please try again" });
        } else {
            res.render('contact', { title: 'Contact Us', success_msg:"your message is sent, we will get back to you as soon as possible." });
        }
    });

    db.close();

});
app.get('/registration', (req, res) => {
    res.render('registration', { title: 'Registration' });
});
app.post('/registration', async (req, res) => {
    const { login_cd, password, email, name, phone } = req.body;
    const db = new sqlite3.Database('bike_shop.db');

    db.run('INSERT INTO user (login_cd, password, email, name, phone) VALUES (?, ?, ?, ?, ?)', [login_cd, password, email, name, phone], function(err) {
        if (err) {
            res.render('error', { message: 'Error registering new member', error:{"status":500, "stack":null} });
        } else {
            res.render('home', { title: 'Home', name:name });
        }
    });

    db.close();
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

