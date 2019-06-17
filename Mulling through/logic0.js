var url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

d3.json(url,function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature,layer) {
    layer.bindPopup('<h2>'+feature.properties.place+'</h2><hr><p>'
    +new Date(feature.properties.time)+'</p><hr><p>'
    +feature.properties.alert+feature.properties.mag+'</p>');
  }

  var earthquakes=L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
  var satellite = L.tileLayer (
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution:
    'May data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: api
  });
  var outdoors = L.tileLayer (
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 
    'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: api
  });
  var baseMaps = {
    'Satellite Imagery': satellite,
    'Topographic Imagery': outdoors
  };
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  var myMap = L.map('map', {
    center: [
      69.40, 30.61
    ],
    zoom: 5,
    layers: [satellite, outdoors]
  });
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

// var satellite = L.tileLayer (
//   'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   attribution:
//   'May data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox.satellite',
//   accessToken: api
//   });

// var outdoors = L.tileLayer (
//   'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//   attribution: 
//   'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox.outdoors',
//   accessToken: api
// });

// var bases= {
//   'Satellite Imagery':satellite,
//   'Topographic Imagery':outdoors
// };

// var quakes=L.geoJSON(eqd, {
//   onEachFeature: onEachFeature
// });

// var overlays= {
//   Earthquakes: quakes
// };

// var mymap=L.map('map', {
//   center: [
//     69.40,30.61
//   ],
//   zoom: 5,
//   layers: [satellite,outdoors]
// });

// L.control.layers(bases,overlays, {
//   collapsed: false
// }).addTo(mymap);
// });