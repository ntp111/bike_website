const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite3 database
const db = new sqlite3.Database('bike_shop.db');

// Serialize to ensure queries run sequentially
db.serialize(() => {
    // // Add a new column 'image_src' to the 'news' table
    // db.run(`ALTER TABLE contact ADD COLUMN phone INTEGER`, (err) => {
    //     if (err) {
    //         console.error('Error adding new column:', err.message);
    //     } else {
    //         console.log('Column image_src added successfully.');
    //     }
    // });

    const updates = [
        { id: 1, phone: 1234567898 },
        { id: 2, phone: 1234567828 },
        { id: 3, phone: 1234567891 },
    ];

    // Update each row with the new image source
    updates.forEach(update => {
        db.run(`UPDATE contact SET phone = ? WHERE id = ?`, [update.phone, update.id], function (err) {
            if (err) {
                console.error('Error updating record:', err.message);
            } else {
                console.log(`Record updated successfully: ID = ${update.id}, image_src = ${update.phone}`);
            }
        });
    });

    
});

// Close the database connection
db.close();