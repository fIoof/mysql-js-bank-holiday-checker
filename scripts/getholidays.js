const { connect, query, end } = require('../connect');
const fetch = require('node-fetch');


async function getHolidays() {
    try {
        const response = await fetch('https://www.gov.uk/bank-holidays.json');
        const data = await response.json();
        const holidays = data["england-and-wales"].events;

        for (const holiday of holidays) {
            const check = 'SELECT * FROM holidays WHERE date = ?';
            const checkResult = await query(check, [holiday.date]);
            if (checkResult.length === 0) {
                const date = holiday.date;
                const title = holiday.title;
                const notes = holiday.notes;
                const bunting = holiday.bunting;
                const insert = `
                INSERT INTO holidays (date, title, notes, bunting)
                VALUES (?, ?, ?, ?)
                `;
                const insertResult = await query(insert, [date, title, notes, bunting]);
            }
        }
    } catch (error) {
        console.error('Failed to update bank holidays', error);
    }
}

module.exports = getHolidays;