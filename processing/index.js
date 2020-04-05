//const csvFilePath='./opendata/it-bergamo-deaths-03.csv';
const csvFilePath='./test/test.csv';
const csv=require('csvtojson');
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
      const ratio = loc.deaths / loc.population;
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
            color: (ratio > 0.01) ? "Red" : "Green",
            iconClass: "Drop", //possible values: "Circle", "Default", "Drop", "Ball"
            //iconUrl: "/uploads/pictogram/airport-24.png"
          },
          name: loc.name,
          population: loc.population,
          deaths: loc.deaths,
          ratio: ratio,
          "marker-color": "#ff0000",  //geojson.io
          "marker-size": "medium",    //geojson.io
          "marker-symbol": "triangle" //geojson.io
        } /*,
        loc: loc */
      };
      ret.features.push(f);
    }
    console.log(JSON.stringify(ret));
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})