const fs = require('fs');
const csv=require('csvtojson');

const csvFilePath    = './sources/comune_giorno.csv';
//const csvFilePath    = './test/comune_giorno.csv';
//const csvFilePath    = './opendata/it_municipalities_deaths_march_2020.csv';
const jsonOutputFile = './opendata/it-total-deaths.json';

function init() {}

function read(output) {
  // csv()
  // .fromFile(csvFilePath)
  // .then((locations)=>{
  //   console.log(locations.length);
  //   for (let i=0; i<locations.length; i++) {
  //     let a = i;
  //   }
  // });
  csv()
  .fromFile(csvFilePath)
  .subscribe(async (csvLine)=>{ 
    try {
      await output.write({
        entity: 'it-municipalities-daily-deaths',
        data: csvLine
      });
      let a = 23;
    } catch (e) {
      console.log(e);
    }
  }, (err) => {
      
  }, (done) => {
    console.log('DONE');
    output.stop();
  });
}

module.exports = {
  init,
  read
}