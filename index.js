#!/usr/bin/env node

const countryList = require('country-list');
const axios = require('axios').default;
const chalk = require('chalk');
var figlet = require('figlet');

//header

figlet("World's HoliDate", function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(chalk`{blue${data}}`);
});

//app
let today = new Date();
let year = today.getFullYear();
let countryName = process.argv[2] + ' ' + process.argv[3];

//set country name & date
if (process.argv[4]) {
  year = process.argv[4];
}

if (process.argv[3] && !process.argv[4]) {
  let isNumber = Number.isInteger(parseInt(process.argv[3]));

  if (isNumber) {
    year = Number(process.argv[3]);
    countryName = process.argv[2];
  }
}

if (!process.argv[3]) {
  countryName = process.argv[2];
}

const countryCode = countryList.getCode(countryName);

const getHoliday = async (year, countryCode) => {
  try {
    const res = await axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}
  `);

    res.data.forEach((holiday) => {
      console.log(
        chalk`{bold ${holiday.name}}, {green ${holiday.date}}, {rgb(255, 136, 0).dim ${holiday.localName}}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

getHoliday(year, countryCode);
