const getHolidays = require('./getholidays');
const { connect, query } = require('../connect');

async function createTable() {
    try {
        await connect();
        console.log("Connected!");

        const tables = await query('SHOW TABLES LIKE "holidays"');
        if (tables.length === 0) {
            const create = `
                    CREATE TABLE holidays (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        date DATE NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        notes TEXT,
                        bunting BOOLEAN
                    );
                `;
            await query(create);
            console.log(`Table 'holidays' Created`);
            await getHolidays();
        } else {
            console.log(`Table 'holidays' already exists`);
            await getHolidays();
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = createTable;