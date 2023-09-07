// merge gadm41_CAN_1.json and gadm41_USA_1.json into gadm41_MERGED_1.json

const fs = require("fs");

const merge = () => {
  const canada = JSON.parse(fs.readFileSync("./gadm41_CAN_1.json"));
  const usa = JSON.parse(fs.readFileSync("./gadm41_USA_1.json"));
  const mexico = JSON.parse(fs.readFileSync("./gadm41_MEX_0_output1.geojson"));
  const merged = canada.features.concat(usa.features).concat(mexico.features);

  canada.features = merged.map((feature, index) => {
    return {
      ...feature,
      id: index + 1,
      // id: feature.properties.GID_1,
    };
  });

  // let tolerance = 0.005; // Adjust this value as per your needs
  // let highQuality = false; // Set to true for a slower, but more accurate simplification

  // let simplifiedData = turf.simplify(canada, {
  //   tolerance: tolerance,
  //   highQuality: highQuality,
  // });

  fs.writeFileSync("./gadm41_MERGED_1.json", JSON.stringify(canada));
};

merge();

// 10084  npm install -g mapshaper\n
// 10085  mapshaper -i gadm41_MERGED_1.json -simplify dp 10% -o output.geojson\n
// 10086  du -msh output.geojson\n
// 10087  ls
// 10088  mapshaper -i gadm41_MERGED_1.json -simplify dp 1% -o output.geojson\n


// mapshaper -i gadm41_MEX_0.json -simplify dp 1% -o gadm41_MEX_0_output.geojson
// mapshaper -i gadm41_MEX_0_output.geojson -simplify dp 10% -o gadm41_MEX_0_output1.geojson