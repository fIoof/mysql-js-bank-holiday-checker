#!/usr/bin/env node
const createTable = require('../scripts/table');
const lookUp = require('../scripts/lookUp');
const Box = require("cli-box");
const title = 'Bank Holiday Checker';
const usageMessage = 'Usage: --start [Start date] --end [End date] Format: YYYY-MM-DD';
const instruct = 'Two dates returns true if falls within a bank holiday';
const titleBox = Box("30x5", title);
const usageBox = Box("80x5", usageMessage);
const instructBox = Box("60x5", instruct);
let date1, date2;

if (require.main === module) {
    const argv = require('yargs')
        .scriptName('date-assist-jsmysql')
        .usage(titleBox.toString() + '\n' + usageBox.toString() + '\n' + instructBox.toString())
        .option('start', {
            alias: 'date1',
            describe: 'First date',
            type: 'string',
            demandOption: true
        })
        .option('end', {
            alias: 'date2',
            describe: 'Second date',
            type: 'string',
            demandOption: true
        })
        .help('h')
        .alias('h', 'help')
        .argv;
    date1 = new Date(argv.start)
    date2 = new Date(argv.end)
    if (date1 >= date2) {
        console.log("Please enter a start date less than your end date");
        return;
    }
    main();
}

async function main() {
    try {
        await createTable();
        await lookUp(date1, date2);
    } catch (error) {
        console.error(error);
    }
}