const fs = require('fs');
const csv=require('csvtojson');

//const csvFilePath='./opendata/it-bergamo-deaths-03.csv';
//const csvFilePath='./test/test-final.csv';
//const csvFilePath    = './test/it_municipalities_deaths_by_month.csv';
const csvFilePath    = './opendata/it_municipalities_deaths_march_2020.csv';
const jsonOutputFile = './opendata/it-total-deaths.json';

csv()
.fromFile(csvFilePath)
.then((locations)=>{
    //console.log(locations);
    let ret = {
      type: "FeatureCollection",
      features: []
    };
    for (let i=0; i<locations.length; i++) {
      const loc = locations[i];
      //console.log(loc);
      let avgDeaths, deaths, description, deltaDeaths, ratio;
      let officialCovid = null;
      const population = parseInt(loc.population);

      if (loc.ecoBG) {
        avgDeaths = parseInt(loc.mar19);
        deaths = parseInt(loc.mar20);
        deltaDeaths = deaths - avgDeaths;
        ratio = deltaDeaths / avgDeaths;
        officialCovid = parseInt(loc.officialCovid);
        mortality = (deaths/population * 100).toString().substr(0,3) + "%";
        description = `Decessi Marzo 2020: ${deaths}
        Decessi Marzo 2019: ${avgDeaths}
        Differenza: ${deltaDeaths}
        Ufficiali Covid19: ${officialCovid}
        Popolazione: ${population}
        Pecentuale decessi su popolazione: ${mortality}

        Dati rilevati da Eco di Bergamo`;
      } else if (loc.bsToday) {
        avgDeaths = parseInt(loc.mar19);
        deaths = parseInt(loc.mar20);
        deltaDeaths = deaths - avgDeaths;
        ratio = deltaDeaths / avgDeaths;
        officialCovid = parseInt(loc.officialCovid);
        mortality = (deaths/population * 100).toString().substr(0,3) + "%";
        description = `Decessi Marzo 2020: ${deaths}
        Decessi Marzo 2019: ${avgDeaths}
        Differenza: ${deltaDeaths}
        Ufficiali Covid19: ${officialCovid}
        Popolazione: ${population}
        Pecentuale decessi su popolazione: ${mortality}
         
        Dati rilevati da Eco di Brescia Today`;
      } else {
        description = "Dati Istat rilevati nel periodo 1-21 marzo 2020, comparati con la media dei cinque anni precedenti";
        avgDeaths = (parseInt(loc.d15) + parseInt(loc.d16) + parseInt(loc.d17) + parseInt(loc.d18) + parseInt(loc.d19)) / 5;
        deaths = parseInt(loc.d20);
        deltaDeaths = deaths - avgDeaths;
        ratio = deltaDeaths / avgDeaths;
        mortality = (deaths/population * 100).toString().substr(0,3) + "%";
        description = `Decessi 1-21 Marzo 2020: ${deaths}
        Decessi 1-21 Marzo anni precedenti: ${avgDeaths}
        Differenza: ${deltaDeaths}
        Popolazione: ${population}
        Pecentuale decessi su popolazione: ${mortality}
         
        Dati Istat. I decessi degli anni precedenti si riferiscono alla media misurata dal 2015 al 2019`;
      }

      let color = "Green";
      if (ratio > 0.25) color = "Yellow";
      if (ratio > 1) color = "Red";
      if (deaths/population > 0.01) {
        console.log(loc.name, population, deaths);
        color = "Purple"
      }
      // if (loc.istatId == '16144') {
      //   console.log(loc);
      // }
      let f = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(loc.lng),
            parseFloat(loc.lat)
          ]
        },
        properties: {
          _umap_options: {
            color: color,
            iconClass: "Circle", //possible values: "Circle", "Default", "Drop", "Ball"
            //iconUrl: "/uploads/pictogram/airport-24.png"
          },
          //deaths: [loc.d15,loc.d16,loc.d17,loc.d18,loc.d19,loc.d20],
          name: loc.nameItSt,
          description: description,
          population: population,
          deaths: deaths,
          delta: deltaDeaths,
          ratio: ratio,
          avgDeaths: avgDeaths
        /*  "marker-color": "#ff0000",  //geojson.io
          "marker-size": "medium",    //geojson.io
          "marker-symbol": "triangle" //geojson.io */
        } /*,
        loc: loc */
      };
      if (officialCovid) {
        f['Covid19'] = officialCovid;
      }
      ret.features.push(f);
    }
    //console.log(JSON.stringify(ret));
    fs.writeFile(jsonOutputFile, JSON.stringify(ret), 'utf8', (err) => {
      if (err) return console.log(err);
      console.log(`File successfully created in  > ${jsonOutputFile}`);
    });
})