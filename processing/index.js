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
      ret.features.push(loc);
    }
    console.log(JSON.stringify(ret));
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})