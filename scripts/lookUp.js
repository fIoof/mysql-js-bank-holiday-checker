const { query, end } = require('../connect');
const Box = require("cli-box");

function lookUp(date1, date2) {
    return new Promise(async (resolve, reject) => {
        if (date1 instanceof Date && date2 instanceof Date) {
            function processDates(date1, date2) {
                let formattedDate1 = date1;
                let formattedDate2 = date2;
                formattedDate1 = formattedDate1.toISOString().split('T')[0];
                formattedDate2 = formattedDate2.toISOString().split('T')[0];
                return [formattedDate1, formattedDate2];
            }
            let [formattedDate1, formattedDate2] = processDates(date1, date2);


            async function run() {
                const search = `
                    SELECT * FROM holidays WHERE date BETWEEN '${formattedDate1}' AND '${formattedDate2}' ORDER BY date DESC`;
                try {
                    const results = await query(search);
                    if ((results.length === 0)) {
                        console.log(`No bank holidays found between ${formattedDate1} and ${formattedDate2}`);
                        resolve([]);
                        return;
                    }
                    results.forEach(event => {
                        const processedDate = new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); 
                        
                        const eventDetails = `Date: ${processedDate} - Title: ${event.title} - Notes: ${event.notes} - Bunting: ${event.bunting ? 'Yes' : 'No'}`;
                        const eventBox = Box("120x5", eventDetails);
                        console.log(eventBox.toString());
                        return results;
                    })
                    resolve(results);
                } catch (err) {
                    reject(err);
                } finally {
                    await end();
                }
            }
            async function main() {
                await run().catch(console.dir);
            }
            main();
        }
    });
}
module.exports = lookUp;